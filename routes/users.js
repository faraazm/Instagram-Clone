const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');
const Post = mongoose.model('Post');

const keys = require('../config/keys');

const cloudinary = require('cloudinary');
const multer = require('multer');

const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

const upload = multer();

cloudinary.config({
    cloud_name: keys.cloudinaryName,
    api_key: keys.cloudinaryAPIKey,
    api_secret: keys.cloudinaryAPISecret
})

router.get('/uploads', requireAuth, async (req, res, next) => {
    try {
        const posts = await Post.find({ userId: req.user._id });
        res.json(posts);
    } catch(err){
        console.log(err);
    }
});

router.post('/uploadImage/', requireAuth, upload.single('photo'), (req, res, next) => {
    cloudinary.v2.uploader.upload_stream({ resource_type: 'raw' }, async (error, result) => {
        if(error){
            console.log(err);
        }
        
        const newPost = new Post({
            title: 'Title',
            caption: 'Caption',
            imageUrl: result.url,
            image_id: result.public_id,
            userId: req.user._id
        })

        try {
            const savePost = await newPost.save();
            res.send(savePost);
        } catch(err){
            console.log(err);
        }
    }).end(req.file.buffer);
});

router.post('/uploadAvatar', requireAuth, (req, res) => {
    cloudinary.v2.uploader.upload_stream({ resource_type: 'raw' }, async (error, result) => {
        if(error){
            console.log(err);
        }
        
        try {
            const user = User.findByIdAndUpdate(req.user._id, { $set: { profilePic: result.url }})
            res.send(user);
        } catch(err){
            res.send(500, { error: err });
        }
    }).end(req.file.buffer);
})

router.delete('/deleteImage/:imageId', requireAuth, (req, res) => {
    const { imageId } = req.params;
    console.log(imageId);

    cloudinary.v2.uploader.destroy(imageId, { invalidate: true, resource_type: 'raw' }, async (error, result) => {
        try {
            const deleteImage = await Post.findOneAndRemove({ image_id: imageId, userId: req.user._id });
            res.send(deleteImage);
        } catch(err){
            console.log(err);
        }
    })
})

module.exports = router;