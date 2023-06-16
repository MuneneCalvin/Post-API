// Initialize express router
import { loginUser, registerUser, loginRequired } from "../Controller/userController.js";
import { getPosts, createPost, getPost, updatePost, deletePost, deleteAllComments, getComments, createComment, deleteComment } from "../Controller/postController.js";

// Import post controller
const postRoutes = (app) => {

    app.route('/posts')
        .get(loginRequired, getPosts)
        .post(loginRequired, createPost);


    app.route('/posts/:id')
        .get(loginRequired, getPost)
        .put(loginRequired, updatePost)
        .delete(loginRequired, deletePost);

    app.route('/posts/comments/:id')
        .get(loginRequired, getComments)
        .post(loginRequired, createComment)
        .delete(loginRequired, deleteAllComments);

    // Authentication
    app.route('/auth/register')
        .post(registerUser);

    app.route('/auth/login')
        .post(loginUser);
}

export default postRoutes;