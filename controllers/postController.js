const Post = require('../models/post');
const postSchema = require('../models/post');
const User = require('../models/user');

module.exports = {
    //get all posts
    async getPosts(req, res) {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
    },

    //get single post
    async getSinglePost(req, res) {
    try {
        const post = await Post.findOne({ _id: req.params.postId });

        if (!post) {
        return res.status(404).json({ message: 'No post with that ID' });
        }

        res.json(post);
    } catch (err) {
        res.status(500).json(err);
    }
    },

    // create new post ***Need to link to associated user***
    async createPost(req, res) {
    try {
        const post = await Post.create(
            req.body
        );
        const user = await User.findOneAndUpdate(
        {_id: req.params.userId },
        { $addToSet: { posts: req.body.id }},
        { runValidators: true, new: true }
        );
        if (!user) {
        return res.status(404).json({ message: 'No user found with that ID'});
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err)
    }
    },

    //update post by id
    async updatePost(req,res) {
    try {
        const post = await Post.findOneAndUpdate(
            {_id: req.params.postId });
    } catch(err) {
        res.status(500).json(err)
    }
    },
    
    //delete post by id
    async deletePost(req, res) {
    try {
        const post = await Post.findOneAndRemove(
            {_id: req.params.postId}
        )
        const user = await User.findOneAndUpdate(
            {users: req.params.userId},
            { $pull: { users: req.params.postId }},
            { new: true }
        )
        res.json({ message: "Post successfully deleted"});
    } catch(err) {
        res.status(500).json(err)
    }
    },

    // add a reaction to post
    async addReaction(req,res) {
    try {
        const post = await Post.findOneAndUpdate(
        {_id: req.params.postId },
        { $addToSet: { reactions: req.body }},
        { runValidators: true, new: true }
        );
        if (!post) {
        return res.status(404).json({ message: 'No post found with that ID'});
        }
        res.json(post);
    } catch (err) {
        res.status(500).json(err)
    }
    },


    // delete a reaction from post
    async deleteReaction(req, res) {
    try {
        const post = await Post.findOneAndUpdate(
        { _id: req.params.postId },
        { $pull: { reactions: req.body }},
        { new: true }
        );
        if (!post) {
        return res.status(404).json({ message: 'No post found with that ID'});
        }
        res.json(post);
    } catch (err) {
        res.status(500).json(err)
    }
    }
};