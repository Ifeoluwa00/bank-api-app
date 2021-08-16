import { writeDataToFile, UserObj } from '../utilsTransaction'
import path from "path";
import fs from "fs"
const dbPath = path.resolve(__filename, "../../../database/trasanction.json");
function getDb() {
 if (!fs.existsSync(dbPath)) {
   fs.writeFileSync(dbPath, JSON.stringify([]))
 }
 
 return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}


function findAll(): Promise<UserObj[]> {
 
 return new Promise((resolve, reject) => {
  const products = getDb()
  try {
   resolve(products)
  } catch (err) {
   reject (err)
  }
 })
}

function findById(acc: string):Promise<UserObj | undefined> {
 return new Promise((resolve, reject) => {
  const products = getDb()
  interface obj{
   "reference": string,
   "senderAccount_number": number,
   "amount": number,
   "receiverAccount_number": number,
   "transferDescription": string,
   "createdAt": string
  }
  const product = products.find((p: obj) => p.reference === acc)
  resolve(product)
 })
}

function create(product: UserObj): Promise<UserObj> {
 return new Promise((resolve, reject) => {
  let products = getDb()
  if (!products) {
   products =[]
  }
  const newProduct = {...product}
  products.push(newProduct)
fs.writeFileSync(dbPath, JSON.stringify(products, null, " "))
  resolve(newProduct)

 })
}

export = {
 findAll,
 findById,
 create
}