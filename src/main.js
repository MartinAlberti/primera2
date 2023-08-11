import express from "express";
import path from "path"
import { __dirname } from "./path.js";
import routerProd from "./routes/products.routes.js";
import routerCart from "./routes/carts.routes.js";


const PORT = 4000;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, '/public'))) //path.join() es una concatenacion de una manera mas optima que con el +
app.use('/api/products', routerProd)
app.use('/api/carts', routerCart)



app.get("*", (req, res) => {
  res.send("Error 404");
});

app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});
