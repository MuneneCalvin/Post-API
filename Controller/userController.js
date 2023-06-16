import sql from 'mssql';
import config from '../Db/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// Login Required Middleware
export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ Message: "Unauthorized user..!!!" });
    }
}

// Registering a user
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        let pool = await sql.connect(config.sql);
        let result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('email', sql.VarChar, email)
            .query("SELECT * FROM Users WHERE username = @username OR email = @email");
            const user = result.recordset[0];
            if (user) {
                res.status(201).json({ Message: "User registered exists..!!!" });
            } else {
                await pool.request()
                    .input('username', sql.VarChar, username)
                    .input('email', sql.VarChar, email)
                    .input('password', sql.VarChar, hashedPassword)
                    .query("insert into Users (username, email, password) values (@username, @email, @password)");
                res.status(201).json({ Message: "User registered successfully..!!!" });
            }
    } catch (error) {
        res.status(404).json({ Message: `Failed to create the user. ${error.message}` });
    } finally {
        sql.close();
    }
}

// Loging in a user
export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    let pool = await sql.connect(config.sql);
    let result = await pool.request()
        .input('username', sql.VarChar, username)
        .query("select * from Users where username = @username");
    const user = result.recordset[0];
    if (!user) {
        res.status(404).json({ Message: "User not found..!!!" });
    } else {
        if (!bcrypt.compareSync(password, user.password)) {
            res.status(404).json({ Message: "Incorrect password..!!!" });
        } else {
            const token = `JWT ${jwt.sign({ username: user.username, email: user.email }, config.jwt_secret)}`;
            res.status(200).json({ email: user.email, username: user.username, id: user.id, token: token });
        }
    }
}
