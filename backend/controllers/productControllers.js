import Product from "../models/Products.js";

export const addProducts = async (req, res) => {
    try {
        const { productName, productPrice, quantity, rating } = req.body;

        const userId = req.user.userId;  

        if (!productName || !productPrice || !quantity || !rating) {
            return res.status(400).json({
                message: "Error adding product. Fill all the details.",
            });
        }

        const newProduct = new Product({ productName, productPrice, quantity, rating, userId });
        await newProduct.save();

        res.status(201).json({
            message: "Product added successfully",
            product: newProduct,
        });

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

export const allProducts = async (req, res) => {
    try {
        console.log("came to all products");
        const products = await Product.find({}); 
        const formattedProducts = products.map((product) => ({
            productName:product.productName,
            productPrice:product.productPrice,
            quantity:product.quantity,
            rating:product.rating
          }));
        res.status(200).json(formattedProducts);
    } catch (err) {
        res.status(500).json({ 
            message: "Error fetching products",
            error: err.message 
        });
    }
};

