const socketClient= io()

import ProductManager from "../../dao/Manager/productManager.js"
const manager = new ProductManager()

let createProd = document.getElementById("createProd")
createProd.addEventListener("onClick", reviewList() )

const printList=(data)=>{
    let divList = document.getElementById("divList")
    data.foreach(product => {
        const card=` <div class="card">
        <h5>${product.title}</h5>
        <img src=${product.thumbnail} class="card-img-top" alt="${product.title}">
        <div>
        <p>${product.description}</p>
        <p>${product.stock}</p>
        <p>${product.category}</p>
        <h5>Precio: $ ${product.price}</h5>
        </div>
      </div>`;
        divList.innerHTML= card;
    });
}
const reviewList=()=>{
    let pList= manager.getProducts()
    socketClient.emit("productList", {pList})
}  
socketClient.on('productList', pList =>{ 
    printList(pList)
    })

const firstData= manager.getProducts()
printList(firstData)






 
