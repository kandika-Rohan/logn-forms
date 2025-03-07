import mongoose from 'mongoose';


const productSchema=mongoose.Schema({

    productName:{
        type:String,
        required:true,
    },
    productPrice:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        default:1,
    },
    rating:{
        type:Number,
        default:0,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'User', 
        required: true,
    }
});

const product=mongoose.model('product',productSchema);

export default product;