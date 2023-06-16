create DATABASE Postsocial;
use Postsocial;

-- Create users table
CREATE TABLE Users (
    user_id INT PRIMARY KEY identity(1,1) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create posts table
CREATE TABLE Posts (
    post_id INT primary key identity(1,1) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (User_id) REFERENCES Users(User_id)
);

-- Create comments table
CREATE TABLE Comments (
    comment_id INT primary key identity(1,1) NOT NULL,
    content TEXT NOT NULL,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    FOREIGN KEY (User_id) REFERENCES Users(User_id),
    FOREIGN KEY (Post_id) REFERENCES Posts(Post_id)
);


-- Insert entries into Posts table
INSERT INTO Posts (title, content, user_id)
VALUES
    ('First Post', 'This is my first post.', 1),
    ('Exciting News', 'I have some exciting news to share!', 2),
    ('Thoughts on Technology', 'Here are my thoughts on the latest technology trends.', 3),
    ('Travel Adventures', 'Sharing my travel adventures from around the world.', 4),
    ('Book Recommendation', 'I highly recommend this amazing book!', 5),
    ('New Recipe', 'Check out this delicious recipe I just tried.', 6),
    ('Fitness Journey', 'Sharing my fitness journey and progress.', 12),
    ('Movie Review', 'Here is my review of the latest blockbuster movie.', 8),
    ('Coding Tips', 'Sharing some useful coding tips and tricks.', 9),
    ('Fashion Inspiration', 'Sharing my favorite fashion looks and styles.', 10);

-- Insert entries into Comments table
INSERT INTO Comments (content, user_id, post_id)
VALUES
    ('Great post!', 2, 11),
    ('I completely agree with you.', 3, 4),
    ('Looking forward to your next post.', 2, 5),
    ('What countries did you visit?', 4, 4),
    ('Thanks for the recommendation!', 5, 5),
    ('Can you share the recipe?', 6, 6),
    ('Keep up the good work!', 12, 7),
    ('I enjoyed that movie too.', 8, 8),
    ('Thanks for the coding tips!', 9, 9),
    ('Love your style!', 1, 10);


-- Query all users
select * from Users;

-- Query all posts
select * from Posts;

-- Query all comments
SELECT * FROM  Comments;

-- Getting all posts by user_id
SELECT * FROM Posts WHERE user_id = @id;

-- Creating a post
INSERT INTO Posts (title, content, user_id) VALUES (@title, @content, @user_id);

-- Updating a post
UPDATE Posts SET title = @title, content = @content WHERE post_id = @id;

-- Getting a post by post_id
SELECT * FROM Posts WHERE post_id = @id;

-- Deleting a post
DELETE FROM Posts WHERE post_id = @id;

-- Getting all comments by post_id
SELECT * FROM Comments WHERE post_id = @id;

-- Creating a comment
INSERT INTO Comments (content, user_id, post_id) VALUES (@content, @user_id, @post_id);

-- Updating a comment
UPDATE Comments SET content = @content WHERE comment_id = @id;

-- Deleting a comment
DELETE FROM Comments WHERE comment_id = @id;

-- Getting a user by username
SELECT * FROM Users WHERE username = @username;

