const express = require("express");
const Product = require("../models/Product");
const upload = require("./upload");
const cloudinary = require("../config/cloudinary");

const router = express.Router();


// TEST ROUTE
router.get("/test", (req, res) => {
    res.send("Products route is working!");
});


// UPLOAD PRODUCT IMAGE TO CLOUDINARY
router.post("/upload-image", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No image uploaded"
            });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "kaka-garments"
        });

        res.json({
            message: "Image uploaded successfully",
            imageUrl: result.secure_url
        });

    } catch (error) {
        res.status(500).json({
            message: "Image upload failed",
            error: error.message
        });
    }
});


// ADD NEW PRODUCT
router.post("/", async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json(product);

    } catch (error) {
        res.status(500).json({
            message: "Failed to create product",
            error: error.message
        });
    }
});


// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();

        res.json(products);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch products",
            error: error.message
        });
    }
});


module.exports = router;