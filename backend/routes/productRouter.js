import express from 'express';

const router=express.Router();

import {addProducts,allProducts} from '../controllers/productControllers.js';

import {authMiddleware} from '../middlewares/userAuth.js';

router.post('/addproducts',authMiddleware,addProducts);

router.get('/getproducts',authMiddleware,allProducts);

// router.post('/deleteproduct',deleteProducts);

export default router;