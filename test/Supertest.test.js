import "dotenv/config";
import chai from "chai";
import supertest from "supertest";
import mongoose from "mongoose";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");
await mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDb connected"));
let productId
describe("Testing Aplicacion Ecommerce", () => {
  describe("Test de productos", () => {
    it("Test endpoint /api/products, se espera que cree un producto", async function () {
      const newProduct = {
        title: "Placa de sonido",
        description: "Placa de sonido Scarlet 2i4",
        price: 350000,
        stock: 33,
        category: "instrumentos",
        status: true,
        code: "aaa5s54s4",
      };
      const { ok, _body} =  await requester.post("/api/products").send(newProduct);
 
    console.log(ok)
    console.log(_body)
     productId  =  _body.message._id


    });
     it("Test endpoint /api/products, se espera que actualice un producto", async function () {
      console.log(productId)
      const updatedProduct = {
        title: "Placa de sonido",
        description: "Placa de sonido Scarlet 2i6",
        price: 350000,
        stock: 33,
        category: "instrumentos",
        status: true,
        code: "aaa5s54s4",
      }
      const { _body} =  await requester.put(`/api/products/${productId}`).send(updatedProduct)

      console.log(_body)

     });
    it("Test endpoint /api/products, se espera que devuelva un producto", async function () {
     const {_body} = await requester.get(`/api/products/${productId}`)
     console.log(_body)
   });
    it("Test endpoint /api/products, se espera que elimine un producto", async function () {
        const {_body} = await requester.delete(`/api/products/${productId}`)
        console.log(_body)
    });
  });
});
