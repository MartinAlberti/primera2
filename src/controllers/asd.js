export class CartManager {
    constructor(path) {
      this.path = path;
      this.carts = [];
      this.products = [];
    }
async addProductCart(cartId,productId){

    this.carts = JSON.parse( await fs.readFile(this.path, "utf-8"))
    
    const cartIndex= this.carts.findIndex((e)=>e.id=cartId)
    
    if(cartIndex !=-1)
    
    {
    
    const cart= this.carts[cartIndex]
    
    const ProductIndex = cart.products.findIndex(product => product.product === productId);
    
    if (ProductIndex != -1) {
    
    cart.products[ProductIndex].quantity +=1
    
    } else {
    
    cart.products.push({ product: productId, quantity: 1 });
    
    }
    
    }
    
    await fs.writeFile(this.path,JSON.stringify(this.carts))
    
    return true
    
    }}