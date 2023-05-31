import fs from "fs";

class ProductManager {
  constructor() {
    this.products = "./src/data/products.json";
  }
  getProducts = () => {
    const productsList = JSON.parse(fs.readFileSync(this.products, "utf-8"));
    return productsList;
  };

  addProduct = (
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category
  ) => {
    const productsList = this.getProducts();
    let id = 0;
    let mayorId = 0;
    for (let i = 0; i < productsList.length; i++) {
      if (productsList[i].id > mayorId) {
        mayorId = productsList[i].id;
      }
    }
    id = mayorId + 1;

    const product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id,
      category,
    };

    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock ||
      !product.id ||
      !product.category
    ) {
      return console.log("Faltan Datos");
    }
    if (productsList.find((prod) => prod.code === product.code)) {
      return console.log(
        "El codigo ingresado ya pertenece a un producto cargado"
      );
    }
    productsList.push(product);
    fs.writeFileSync(this.products, JSON.stringify(productsList, null));
  };

  getProductsById = (pid) => {
    const productsList = this.getProducts();
    if (productsList.find((prod) => prod.id == pid)) {
      return productsList.find((prod) => prod.id == pid);
    } else {
      return "Error al buscar el producto";
    }
  };

  updateProduct = (id, data) => {
    const productsList = this.getProducts();
    const productIndex = productsList.findIndex((prod) => prod.id == id);  

    if (productIndex != -1) {
        productsList[productIndex] = {...productsList[productIndex], ...data}        
      fs.writeFileSync(this.products, JSON.stringify(productsList, null));
      return console.log(`Actualizado producto con id ${id}`);
    } else {
      return console.log("Producto no encontrado");
    }
  };


  deleteProduct = (id) => {
  
    const productsList = this.getProducts();
    const productDelete = productsList.findIndex((prod) => prod.id == id);
    
    if (productDelete != -1) {
        productsList.splice(productDelete, 1);

      fs.writeFileSync(this.products, JSON.stringify(productsList, null));
    } else {
      console.log("No se encontro el producto que desea eliminar");
    }
  };
}

export default ProductManager;
