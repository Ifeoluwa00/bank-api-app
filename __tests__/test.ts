import app from "../src/app"
import request from "supertest"

describe("All Routes", () => {
 test("it should post an account ", async () => {
  await request(app)
     .post("/balance")
     .send({
      account_Number: 2232423716,
      balance: 2000
      
     })
   .expect(201)
  .expect("Content-Type", "application/json")
 });
 

 test("should return 403 for existing account number", async () => {
  await request(app)
     .post("/balance")
     .send({
      account_Number: 3345267812,
      balance: 2000
      
     })
   .expect(403)
  .expect("Content-Type", "application/json; charset=utf-8")
     });

 
 
     test("should return 403 if account number length is less than 10 digit", async () => {
      await request(app)
         .post("/balance")
         .send({
          account_Number: 334526781,
          balance: 2000
          
         })
       .expect(403)
      .expect("Content-Type", "application/json; charset=utf-8")
     });
 
 
 
     test("should return 403 if account number length is greater than 10 digit", async () => {
      await request(app)
         .post("/balance")
         .send({
          account_Number: 334526781211,
          balance: 2000
          
         })
       .expect(403)
      .expect("Content-Type", "application/json; charset=utf-8")
         });
 
 
 
 
 test("it should get all account", async () => {
   await request(app)
     .get("/balance")
     .expect(200)
     .expect("Content-Type", "application/json")
     });
 
 
 
     test("it should get single account", async () => {
      await request(app)
        .get("/balance/1234567891")
        .expect(200)
        .expect("Content-Type", "application/json")
     });
 
  
 
     test("it should make transaction", async () => {
      await request(app)
         .post("/transaction")
         .send({
          from: 1234567891,
          to: 3345267812,
          amount:10,
          transferDescription:"bulukus"
         })
       .expect(201)
      .expect("Content-Type", "application/json")
     });

 
  test("should return 404 if the money to be transfered is more than the amount in the sender account", async () => {
      await request(app)
       .post("/transaction")
       .send({
        from: 8485856872,
        to: 8485856877,
        amount: 3000,
        transferDescription: "bulukus"
       })
       .expect(404)
       .expect("Content-Type", "application/json; charset=utf-8")
     });
    
     test("should return 404 if the account number of either the sender or the reciever does not exist", async () => {
      await request(app)
       .post("/transaction")
       .send({
        from: 8485856871,
        to: 8485856847,
        amount: 1000,
        transferDescription: "bulukus"
       })
       .expect(404)
       .expect("Content-Type", "application/json; charset=utf-8")
     });
 
 
     test("it should get all transaction made", async () => {
      await request(app)
        .get("/transaction")
        .expect(200)
        .expect("Content-Type", "application/json")
        });
    
        test("it should get a single transaction made", async () => {
         await request(app)
           .get("/transaction/d492a7828c16ffdbe9a4eb6cac3c20cf")
           .expect(200)
           .expect("Content-Type", "application/json")
           });
 
 
 });
