import fs from "fs"

class CartManager{

    constructor(){
        this.path="./src/data/carts.json"
    }
    generateId= ()=>{
        let list= this.getCarts()
        if(list.length === 0) return 1
        return list[list.length-1].cid +1
    }
    createCart = () =>{
        let list= this.getCarts()
        const cid= parseInt(this.generateId())
        const newCart= {cid, products:[]}
        console.log(list)
        list.push(newCart)
        fs.writeFileSync(this.path, JSON.stringify(list, null))
        console.log(`El carrito  ${parseInt(cid)} fue creado`)
    }
  

    getProductsFromACart=(cid)=>{
        const cartProds = this.getCartById(cid)
        if(cartProds == -1){
            return false
        }
        return(cartProds.products)        
    }

    addProductToCart=(cid, pid)=>{
        let list= this.getCarts()
        const cIndex= list.findIndex(c => c.cid == parseInt(cid))        
        const pIndex= list[cIndex].products.findIndex(x => x.pid == parseInt(pid))
        if(pIndex == -1){
            let objectToAdd={'pid': +pid, 'quantity': 1 }            
            list[cIndex].products.push(objectToAdd)            
        }else{
            
            list[cIndex].products[pIndex].quantity++
        }        
        fs.writeFileSync(this.path, JSON.stringify(list, null))
        console.log(`El producto ${pid} fue agregado al carrito ${cid}`)
    }




}
export default CartManager