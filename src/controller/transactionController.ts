import Product from "../model/transactionModel"
import { getPostData, UserObj } from "../utilsTransaction"
import balanceModel from "../model/balanceModel";
import { Request, Response } from 'express';
import crypto from "crypto"
import path from "path";
import fs from "fs";



//@desc Get All transaction
//@route Get /transaction
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

//@desc Get single transaction
//@route Get /transaction/reference
async function getProduct(req: Request, res:Response) {
  try {
    const product = await Product.findById(req.params.acc)
    
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
 
//@desc Create a transaction
//@route POST /transaction
async function createProduct(req: Request, res:Response) {
 const db = await balanceModel.findAll()
   const { from, to, amount, transferDescription } = req.body;   
   //validate from, to and amount
   const senderAccnt = db.find( balanceObj=> balanceObj.account_Number == from);
   const recipientAccnt = db.find( balanceObj=> balanceObj.account_Number == to)
   const senderCanSend = (senderAccnt?.balance || 0 ) >= amount;

   if (senderAccnt && recipientAccnt && senderCanSend) {
    //deduct amount from sender
    senderAccnt.balance = +senderAccnt.balance - amount;
    //credit amount to the receiver
    recipientAccnt.balance = +recipientAccnt.balance + amount;

    //create the transaction
    const product: UserObj  = {
     reference: crypto.randomBytes(16).toString("hex"),
    senderAccount_number: from,
    amount,
    receiverAccount_number: to,
    transferDescription,
     createdAt: new Date().toISOString()
    }
    const dbPath = path.resolve(__filename, "../../../database/balance.json");
    const newProduct = await Product.create(product)
    fs.writeFileSync(dbPath, JSON.stringify( db, null, " "))
    res.writeHead(201, { "Content-Type": "application/json" })
    return res.end(JSON.stringify(newProduct))
   } else {
    res.status(404).json({
     status: "fail",
     msg: "Please make sure that the sender account, recipient account  exist and the amount is not greater than sender's balance."
    });

   }

 
 }

 export = {
  getProducts,
  getProduct,
  createProduct
   
}