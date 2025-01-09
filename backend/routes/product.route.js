import express from 'express';


import {getProducts,updateProduct,createProduct,deleteProduct} from '../controllers/product.controller.js';

const router = express.Router();



router.get('/',getProducts);

router.put('/:id',updateProduct);

router.post('/',createProduct);

router.delete("/:id",deleteProduct);

router.get('/test', (req, res) => {
    res.send('POST request received!');
});


router.get('/',(req,res)=>{
    res.send("request to server");
});

export default router;