import Product from "../model/balanceModel"
// import { IncomingMessage, ServerResponse } from "http";
import { getPostData, UserObj } from "../utilsBalance"
import { Request, Response } from 'express';


//@desc Get All Product
//@route Get /api/products
async function getProducts(req: Request, res:Response) {

  const products = await Product.findAll()
  if (!products) {
    res.writeHead(404, { "Content-Type": "application/json" })
    res.end(JSON.stringify({message: "DataBase Not Found make a post"})) 
  } else {
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify(products)) 
  }
}

//@desc Get single Product
//@route Get /api/product/:id
async function getProduct(req: Request, res:Response) {
  try {
    const product = await Product.findById(+req.params.acc)
    
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" })
     res.end(JSON.stringify({message: "Product Not Found"})) 
    } else {
      res.writeHead(200, { "Content-Type": "application/json" })
     res.end(JSON.stringify(product)) 
    }
   
  } catch (error) {
   console.log(error)
  }
}
 
//@desc Create a Product
//@route POST /api/products
async function createProduct(req: Request, res:Response) {
  try {
    
    const {  account_Number,  balance } = req.body;
    const product: UserObj  = {
     account_Number,
     balance,
     createdAt: new Date().toISOString()
      
      
    }
    const newProduct = await Product.create(product)
    if (newProduct) {
      res.writeHead(201, { "Content-Type": "application/json" })
      return res.end(JSON.stringify(newProduct))
    } else {
      res.status(403).json({
        status: 'fail',
        msg:"Unable to add account, likely reason: account number already exists or length of account number is not equal to 10"
      })
      
    }
    

  } catch (error) {
   console.log(error)
  }
 }

 export = {
  getProducts,
  getProduct,
  createProduct
   
}