const socketClient = io()


let productList = []

socketClient.emit('list', print.productList)
