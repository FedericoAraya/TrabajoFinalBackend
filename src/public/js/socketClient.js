const socketClient = io();


const addform = document.querySelector("#addproduct");
addform.addEventListener("submit", (ev) => {
    ev.preventDefault();
    
    socketClient.emit("addProd", ev.currentTarget.prodjson.value);
});
const deletebutton = document.querySelectorAll(".deleteproduct");
deletebutton.forEach((button) => {
    button.addEventListener("click", (ev) => {
        ev.preventDefault();
        socketClient.emit(
            "deleteProd",
            ev.currentTarget.getAttribute("prodid"),
        );
    });
});
socketClient.on("products", (productos) => {
    let innerHtml = "";
    productos.forEach((producto) => {
        innerHtml += `
        <div id="product${producto.id}">
        <h4>${producto.title}</h4>
        <img
        src="${producto.thumbnails}"
        alt="foto producto"
                width="100"
            />
            <p>${producto.description}</p>
            <p>Precio: $${producto.price}</p>
            <p>Categoría: ${producto.category}</p>
            <p>Imagen: ${producto.thumbnails}</p>
            <p>Status: ${producto.status}</p>
            <p>Código: ${producto.code}</p>
            <p>Stock: ${producto.stock}</p>
            <input
                type="button"
                class="deleteproduct"
                prodid="${producto.id}"
                value="Borrar este producto"
            />
            </div>
            `;
    });
    document.querySelector("#realtimeproducts").innerHTML = innerHtml;
    const deletebutton = document.querySelectorAll(".deleteproduct");
    deletebutton.forEach((button) => {
        button.addEventListener("click", (ev) => {
            ev.preventDefault();
            socketClient.emit(
                "deleteProd",
                ev.currentTarget.getAttribute("prodid"),
            );
        });
    });
});
socketClient.on("error", (errores) => {
    let errorestxt = "ERROR\r";
    errores.errortxt.forEach((error) => {
        errorestxt += error + "\r";
    });
    alert(errorestxt);
});
socketClient.on("result", (reaultado) => {
    alert(reaultado);
});




 
