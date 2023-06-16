import sql from 'mssql';
import config from '../Db/config.js';


// Getting all posts
export const getPosts = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM Posts");
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(404).json({ Message: `An error while getting posts..!!! ${error.message}` });
    } finally {
        sql.close();
    }
}

// Getting a post
export const getPost = async (req, res) => {
    try {
        const { post_id } = req.params;
        let pool = await sql.connect(config.sql);
        const query = "select * from Posts where post_id = @post_id";
        const result = await pool.request()
            .input('post_id', sql.Int, post_id)
            .query(query);
        if (!result.recordset[0]) {
            res.status(404).json({ Message: `No post found...Try again..!!!` });
        } else {
            res.status(200).json(result.recordset[0]);
        }
    } catch (error) {
        res.status(404).json({ Message: `An error while getting post..!!! ${error.message}` });
    } finally {
        sql.close();
    }
}

// Creating a post
export const createPost = async (req, res) => {
    try {
        const { user_id, title, content } = req.body;
        let pool = await sql.connect(config.sql);
        const query = "insert into Posts (user_id, title, content) values (@user_id, @title, @content)";
        const request = await pool.request()
            .input('user_id', sql.Int, user_id)
            .input('title', sql.VarChar, title)
            .input('content', sql.Text, content);
            
        await request.query(query);
        res.status(201).json({ Message: "Post created successfully..!!!" });
    } catch (error) {
        res.status(404).json({ Message: `An error while creating post..!!! ${error.message}` });
    } finally {
        sql.close();
    }
}

// Updating a post
export const updatePost = async (req, res) => {
    try {
        const { post_id } = req.params;
        const { title, content } = req.body;
        let pool = await sql.connect(config.sql);
        await pool.request()
            .input('post_id', sql.Int, post_id)
            .input('title', sql.VarChar, title)
            .input('content', sql.Text, content)
            .query("UPDATE Posts SET title = @title, content = @content WHERE post_id = @post_id");
        res.status(200).json({ Message: "Post updated successfully..!!!" });
    } catch (error) {
        res.status(404).json({ Message: `An error while updating post..!!! ${error.message}` });
    } finally {
        sql.close();
    }
}

// Deleting a post
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query("DELETE FROM Postsocial WHERE id = @id");
        if (!result.affectedRows[0] === 0 ) {
            res.status(404).json({ Message: "No post found...Try again..!!!" });
        }
        return res.status(200).json({ Message: "Post deleted successfully..!!!" });
    } catch (error) {
        res.status(404).json({ Message: `An error while deleting post..!!! ${error.message}` });
    } finally {
        sql.close();
    }
}

// Deleting all comments of a post
export const deleteAllComments = async (req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query("DELETE FROM Comments WHERE post_id = @id");
        if (!result.affectedRows[0] === 0 ) {
            res.status(404).json({ Message: "No post found...Try again..!!!" });
        }
        return res.status(200).json({ Message: "All comments deleted successfully..!!!" });
    } catch (error) {
        res.status(404).json({ Message: `An error while deleting comments..!!! ${error.message}` });
    } finally {
        sql.close();
    }
}

// Getting all comments of a post
export const getComments = async (req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query("select * from Comments where post_id = @id");
        if (!result.recordset[0]) {
            res.status(404).json({ Message: "No comments found...Try again..!!!" });
        } else {
            res.status(200).json(result.recordset);
        }
    } catch (error) {
        res.status(404).json({ Message: `An error while getting comments..!!! ${error.message}` });
    } finally {
        sql.close();
    }
}

// Creating a comment
export const createComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        let pool = await sql.connect(config.sql);
        const query = "insert into Comments (content, post_id) values (@content, @id)";
        await pool.request()
            .input('content', sql.Text, content)
            .input('id', sql.Int, id);
        await request.query(query);
        res.status(201).json({ Message: "Comment created successfully..!!!" });
    } catch (error) {
        res.status(404).json({ Message: `An error while creating comment..!!! ${error.message}` });
    } finally {
        sql.close();
    }
}

// Updating a comment
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        let pool = await sql.connect(config.sql);
        await pool.request()
            .input('id', sql.Int, id)
            .input('content', sql.Text, content)
            .query("UPDATE Comments SET content = @content WHERE id = @id");
        res.status(200).json({ Message: "Comment updated successfully..!!!" });
    } catch (error) {
        res.status(404).json({ Message: `An error while updating comment..!!! ${error.message}` });
    } finally {
        sql.close();
    }
}

// Deleting a comment
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query("DELETE FROM Comments WHERE id = @id");
        if (!result.affectedRows[0] === 0 ) {
            res.status(404).json({ Message: "No comment found...Try again..!!!" });
        }
        return res.status(200).json({ Message: "Comment deleted successfully..!!!" });
    } catch (error) {
        res.status(404).json({ Message: `An error while deleting comment..!!! ${error.message}` });
    } finally {
        sql.close();
    }
}
