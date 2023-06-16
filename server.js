import express from "express";
import config from "./Db/config.js";
import postRoutes from "./Routes/postRoutes.js";
import jwt from "jsonwebtoken";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Jwt Middleware
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === "JWT") {
        jwt.verify(req.headers.authorization.split(" ")[1], config.jwtSecret, (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

postRoutes(app);

// Routes
app.get("/", (req, res) => {
    res.send("Hello to Memories API");
});


// Starting the server
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});