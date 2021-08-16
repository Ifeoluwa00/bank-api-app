import express from  'express';
const router = express.Router();
import controller from '../controller/balanceController';

router.get('/', controller.getProducts);

router.get('/:acc', controller.getProduct);

router.post('/', controller.createProduct)

export default router