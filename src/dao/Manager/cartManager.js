import fs from "fs"

class CartManager{

    constructor(){
        this.path="./src/data/carts.json"
    }
    generateId= ()=>{
        let cartList = this.getCarts()
        if(cartList.length === 0) return 1
        return cartList[cartList.length-1].cid +1
    }
    createCart = () =>{
        let cartList= this.getCarts()
        const cid= parseInt(this.generateId())
        const newCart= {cid, products:[]}
        console.log(cartList)
        cartList.push(newCart)
        fs.writeFileSync(this.path, JSON.stringify(cartList, null))
        console.log(`El carrito  ${parseInt(cid)} fue creado`)
    }

    getCarts=()=>{
        const cartsList = JSON.parse(fs.readFileSync(this.path, "utf-8"))
        return(cartsList)
    }

    getCartById=(cid)=>{
        const cartList= this.getCarts()
            const exist = cartList.find(cart => cart.cid == parseInt(cid))

            if(exist) return exist
            return -1
    }
  

    getProductsFromACart=(cid)=>{
        const cartProds = this.getCartById(cid)
        if(cartProds == -1){
            return false
        }
        return(cartProds.products)        
    }

    addProductToCart=(cid, pid)=>{
        let cartList= this.getCarts()
        const cIndex= cartList.findIndex(c => c.cid == parseInt(cid))        
        const pIndex= cartList[cIndex].products.findIndex(x => x.pid == parseInt(pid))
        if(pIndex == -1){
            let objectToAdd={'pid': +pid, 'quantity': 1 }            
            cartList[cIndex].products.push(objectToAdd)            
        }else{
            
            cartList[cIndex].products[pIndex].quantity++
        }        
        fs.writeFileSync(this.path, JSON.stringify(cartList, null))
        console.log(`El producto ${pid} fue agregado al carrito ${cid}`)
    }




}
export default CartManager