import { writeDataToFile, UserObj } from '../utilsBalance';
import fs from "fs";
import path from "path";

const dbPath = path.resolve(__filename, "../../../database/balance.json");
function getDb() {
 if (!fs.existsSync(dbPath)) {
   fs.writeFileSync(dbPath, JSON.stringify([]))
 }
 
 return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}


function findAll ():Promise<UserObj[]> {
 return new Promise((resolve, reject) => {
  const products = getDb()
  try {
   resolve(products)
  } catch (err) {
   reject (err)
  }
 })
}

function findById(acc: number):Promise<UserObj | undefined> {
 return new Promise((resolve, reject) => {
  const products = getDb()
  interface obj {
   "account_Number": number,
   "balance": number,
   "createdAt": string
}
  const product = products.find((p:obj) => p.account_Number === acc)
  resolve(product)
 })
}

function create(product: UserObj): Promise< (UserObj|null)> {
 return new Promise((resolve, reject) => {
  const products = getDb()
  interface obj {
   "account_Number": number,
   "balance": number,
   "createdAt": string
}
  if (products.some((acc: obj) => acc.account_Number === product.account_Number || String(product.account_Number).length !== 10)) {
   resolve(null);
   return;
  }
 
  const newProduct = {...product}
  products.push(newProduct)
  fs.writeFileSync(dbPath, JSON.stringify(products, null, " "));
  resolve(newProduct)
 })
}

export = {
 findAll,
 findById,
 create
}