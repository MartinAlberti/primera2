import "dotenv/config";
import userModel from "../src/models/users.model";
import mongoose from "mongoose";
import Assert from "assert";

await mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDb connected"));

const assert = Assert.strict;

describe("Testing Users", () => {
  

  beforeEach(function () {
    this.timeout(7000);
  });
  it("Contusltar todos los usuarios de mi aplicacion", async function () {
    const usuarios = await userModel.find();
    assert.strictEqual(Array.isArray(usuarios), true);
  });

  it("Crear nuevo usuario", async function () {
    const newUser = {
      first_name: "Martin",
      last_name: "Alberti",
      email: "martin@mail.com",
      password: "1234",
      age: 30,
    };
    const resultado = await userModel.create(newUser);
    assert.ok(resultado._id);
  });

  it("Consultar un usuario dado su email", async function () {
    const email = "martin@mail.com";

    const user = await userModel.findOne({ email: email });
    assert.strictEqual(typeof user, "object");
  });
});
