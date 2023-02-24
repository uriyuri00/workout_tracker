const User = require("./user");
const Post = require("./post");
const Trainer = require("./trainer")
const Comment = require("./comment")

User.hasMany(Post, {
    foreignKey: "user_id",
});

User.hasOne(Trainer, {
    foreignKey: "user_id",
});

Post.belongsTo(User, {
    foreignKey: "user_id",
});

Post.hasMany(Comment, {
    foreignKey: "post_id",
});

Trainer.belongsTo(User, {
    foreignKey: "user_id",
});

Comment.belongsTo(User, {
    foreignKey: "user_id",
});

Comment.belongsTo(Post, {
    foreignKey: "post_id",
});

module.exports = {
    User,
    Post,
    Trainer,
    Comment,
}