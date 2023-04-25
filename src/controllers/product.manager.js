import fs from "fs"

class ProductManager {
    
    constructor(){
        this.products = "./src/data/products.json"
        this.index = 0
    }
    getProducts = () => {
        const productsList = JSON.parse(fs.readFileSync(this.products, "utf-8"))
        return(productsList);
    }
    
    addProduct = (title , description , price , thumbnail , code , stock) => {
        this.index++
        const id = this.index
        const product = {title , description , price , thumbnail , code , stock , id}
        if ( !title || !description || !price || !thumbnail || !code || !stock || !id){
            return console.log("faltan datos")
        }
        if (this.products.find(prod => prod.code === product.code)){
            return console.log("El codigo ingresado ya pertenece a un producto cargado");
        }
        this.products.push(product)    
        }
    
    getProductsById = (findId) => {
        if (this.products.find(prod => prod.id === findId)) {
            console.log("El Producto Buscado es:")
            return this.products.find(prod => prod.id === findId)
        }else{
            console.log("Not found");
        }
        
    }
    updateProduct = (id,key,value)=>{
        const productIndex = this.products.findIndex( prod => prod.id === id)
        console.log("Funcion updateProduct");
        if (productIndex != -1){
            this.products[productIndex][key] = value
            
            fs.writeFileSync(this.path, JSON.stringify(list, null))
            return console.log(`Actualizado producto con id ${id}`)
        }else{
            return console.log("Producto no encontrado");
        }
    }
    deleteProduct = (id) =>{
        const productDelete = this.products.findIndex( prod => prod.id === id)
    
        if (productDelete != -1){
            this.products.splice(productDelete , 1)   
            
            fs.writeFileSync(this.path, JSON.stringify(list, null))
        }else{
            console.log("No se encontro el producto que desea eliminar");
        }
    }

    }
    
 export default ProductManager   
