import Product from '../models/product.model.js'
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
    try {
        const product = await Product.find({});
        res.status(200).json({ success: true, message: product });
    } catch (error) {
        console.log("Unable to fetch data:", error.message);
        // Send the error response properly
        res.status(500).json({ success: false, message: "Error fetching products" });
    }
};


export const updateProduct = async (req,res)=>{
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:true,message:"Invalid Product Id"});
    }

    try{

        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true,message:updatedProduct});

    }catch(error){
        return res.status(500).json({success:true,message:"Server Error"});
    }
};

export const createProduct =async (req,res)=>{
    console.log("Received it here");
    const product = req.body;

    if(!product.name || !product.image || !product.price){
        return res.status(400).json({success:false,message:"provide all fields"});
    }
    console.log("upto a working point");
    const newProduct = new Product(product);
    try{
        await newProduct.save();
        console.log("working");
        res.status(201).json({success:true,data:newProduct});


    }catch(error){

        console.error("Error in create Product:",error.message);
        res.status(500).json({success:false,message:"Server Error"});

    }
};

export const deleteProduct = async (req,res)=>{
    const {id} = req.params;
    console.log("id:",id);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:true,message:"Invalid Product Id"});
    }
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Product deleted"});

    }catch(error){
        res.status(500).json({success:"false",message:"Server Error"});

        res.send("Unable to find product");

    }
};