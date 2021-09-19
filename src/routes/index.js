const{Router, response}=require('express');
const router= Router();
const Photo=require('../models/photo');
const cloudinary=require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLAUDINARY_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})
const fs=require('fs-extra');
const photo = require('../models/photo');

router.get('/',async (req,res)=>{
    const photos= await Photo.find().lean()
    console.log(photos)
    res.render('images',{ photos })
});

router.get('/images/add',async (req,res)=>{
    const photos= await Photo.find().lean()
    res.render('image_form',{ photos })
});

router.post('/images/add',async (req,res)=>{
    const{title,description}=req.body;
    const result= await cloudinary.v2.uploader.upload(req.file.path);
    const newPhoto= new Photo({
        title,
        description,
        imageURL:result.secure_url,
        public_id:result.public_id
    })
    await newPhoto.save()
    await fs.unlink(req.file.path)
    res.redirect('/')
});

router.get('/view/:photo_id',async (req,res)=>{
    const{photo_id}= req.params
    const photos= await Photo.findById(photo_id).lean()
    res.render('view_photo',{ photos })
});

router.get('/images/delete/:photo_id',async (req,res)=>{
    const{photo_id}= req.params
    const photo= await Photo.findOneAndDelete(photo_id)
    await cloudinary.v2.uploader.destroy(photo.public_id)
    res.redirect('/images/add')
});

module.exports= router