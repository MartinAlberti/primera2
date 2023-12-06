import "dotenv/config";
import chai from "chai";
import userModel from "../src/models/users.model";
import mongoose from "mongoose";

await mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDb connected"));

const expect = chai.expect;

describe("Test chai para users", () => {
  beforeEach(function () {
    mongoose.connection.collections.userModel.drop(); //Eliminacion de usuarios de DB
    this.timeout(6000);
  });
  it("Consultar mediante chai a todos los usuarios de mi aplicacion", async function () {
    const resultado = await userModel.find();
    expect(Array.isArray(resultado).to.be.ok)
  });
});
