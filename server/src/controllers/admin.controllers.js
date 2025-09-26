import WebContent from "../models/web-content.models.js";
import { asyncHandler } from '../utils/asyncHandler.js';
import cloudinary from '../lib/cloudinary.js';
import fs from 'fs';
import { redis } from '../db/redis.js'



export const updateContent = asyncHandler(async (req, res) => {


    let updates = req.body;
    const { id } = req.params;

    console.log("Received update request for content ID:", updates, id);

    if (!id) {
        return res.status(400).json({ message: "Content ID is required" });
    }

    const content = await WebContent.findById(id);

    if (!content) {
        return res.status(404).json({ message: "Content not found" });
    }

    const files = req.files;

    console.log("Files received:", files);

    if (files) {
        if (files.logo) {

            console.log("Updating logo...", files.logo[0].path);
            if (content.logo && content.logo.public_id) {
                await cloudinary.uploader.destroy(content.logo.public_id);
            }
            const upload = await cloudinary.uploader.upload(files.logo[0].path, {
                folder: 'web-content',
            });
            updates.logo = { url: upload.secure_url, public_id: upload.public_id };
            console.log('logo updated:');
        } else {
            updates.logo = content.logo;
        }
        if (files.heroImage) {
            if (content.heroImage && content.heroImage.public_id) {
                await cloudinary.uploader.destroy(content.heroImage.public_id);
            }
            const upload = await cloudinary.uploader.upload(files.heroImage[0].path, {
                folder: 'web-content',
            });
            updates.heroImage = { url: upload.secure_url, public_id: upload.public_id };
        } else {
            console.log("No heroImage file uploaded.");
            updates.heroImage = content.heroImage;
        }
        if (files.aboutImage) {
            if (content.aboutImage && content.aboutImage.public_id) {
                await cloudinary.uploader.destroy(content.aboutImage.public_id);
            }
            const upload = await cloudinary.uploader.upload(files.aboutImage[0].path, {
                folder: 'web-content',
            });
            updates.aboutImage = { url: upload.secure_url, public_id: upload.public_id };
        } else {
            updates.aboutImage = content.aboutImage;
        }
        if (files.logo && files.logo[0] && fs.existsSync(files.logo[0].path)) {
            fs.unlinkSync(files.logo[0].path);
        }
        if (files.heroImage && files.heroImage[0] && fs.existsSync(files.heroImage[0].path)) {
            fs.unlinkSync(files.heroImage[0].path);
        }
        if (files.aboutImage && files.aboutImage[0] && fs.existsSync(files.aboutImage[0].path)) {
            fs.unlinkSync(files.aboutImage[0].path);
        }
    }

    const latestContent = await WebContent.findByIdAndUpdate(id, updates, {
        new: true,
    });

    const Content = {
        logo: latestContent.logo.url,
        heroImage: latestContent.heroImage.url,
        aboutImage: latestContent.aboutImage.url,
        tagline: latestContent.tagline,
        subTagline: latestContent.subTagline,
        supportEmail: latestContent.supportEmail,
        phoneNo: latestContent.phoneNo,
        address: latestContent.address,
        facebook: latestContent.facebook,
        twitter: latestContent.twitter,
        instagram: latestContent.instagram,
        linkedin: latestContent.linkedin,
        _id: latestContent._id,
    }

    if (!Content) {
        return res.status(404).json({ message: "Error while updating the content" });
    }
    const expire = process.env.REDIS_EXPIRY * 60;
    await redis.set('webContent', JSON.stringify(Content), 'EX', expire);

    res.status(200).json({ message: "Content updated successfully", Content });
});

export const getContent = asyncHandler(async (req, res) => {

    let cachedContent = await redis.get('webContent');


    if (cachedContent) {
        return res.status(200).json(JSON.parse(cachedContent));
    }




    const content = await WebContent.find();
    if (!content || content.length === 0) {
        return res.status(404).json({ message: "Content not found" });
    }
    const latestContent = content[0];
    const Content = {
        logo: latestContent.logo.url,
        heroImage: latestContent.heroImage.url,
        aboutImage: latestContent.aboutImage.url,
        tagline: latestContent.tagline,
        subTagline: latestContent.subTagline,
        supportEmail: latestContent.supportEmail,
        phoneNo: latestContent.phoneNo,
        address: latestContent.address,
        facebook: latestContent.facebook,
        twitter: latestContent.twitter,
        instagram: latestContent.instagram,
        linkedin: latestContent.linkedin,
        _id: latestContent._id,
    }

    const expire = process.env.REDIS_EXPIRY * 60;
    await redis.set('webContent', JSON.stringify(Content), 'EX', expire);
    res.status(200).json(Content);
});


export const postContent = asyncHandler(async (req, res) => {
    const { tagline, subTagline, supportEmail, phoneNo, address, facebook, twitter, instagram, linkedin } = req.body;

    let newContent = { tagline, subTagline, supportEmail, phoneNo, address, facebook, twitter, instagram, linkedin };


    const files = req.files;
    console.log(files);
    if (files) {
        if (files.logo) {
            const upload = await cloudinary.uploader.upload(files.logo[0].path, {
                folder: 'web-content',
            });
            newContent.logo = { url: upload.secure_url, public_id: upload.public_id };
        }
        if (files.heroImage) {
            const upload = await cloudinary.uploader.upload(files.heroImage[0].path, {
                folder: 'web-content',
            });
            newContent.heroImage = { url: upload.secure_url, public_id: upload.public_id };
        }
        if (files.aboutImage) {
            const upload = await cloudinary.uploader.upload(files.aboutImage[0].path, {
                folder: 'web-content',
            });
            newContent.aboutImage = { url: upload.secure_url, public_id: upload.public_id };
        }
        fs.unlinkSync(files.logo[0].path);
        fs.unlinkSync(files.heroImage[0].path);
        fs.unlinkSync(files.aboutImage[0].path);
    }
    const expire = process.env.REDIS_EXPIRY * 60;

    const latestContent = new WebContent(newContent);
    await latestContent.save();
    const Content = {
        logo: latestContent.logo.url,
        heroImage: latestContent.heroImage.url,
        aboutImage: latestContent.aboutImage.url,
        tagline: latestContent.tagline,
        subTagline: latestContent.subTagline,
        supportEmail: latestContent.supportEmail,
        phoneNo: latestContent.phoneNo,
        address: latestContent.address,
        facebook: latestContent.facebook,
        twitter: latestContent.twitter,
        instagram: latestContent.instagram,
        linkedin: latestContent.linkedin,
        _id: latestContent._id,
    }
    await redis.set('webContent', JSON.stringify(Content), 'EX', expire);
    console.log("New content created:", Content);
    res.status(201).json({ message: "Content created successfully", Content });
});
