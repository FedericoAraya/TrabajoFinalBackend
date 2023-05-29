import { prodModel } from "../models/product.model.js";

class ProductManagerDB {
  getProducts = async (limit = 10, page = 1, query = "{}", sort) => {
    const isValidJSON = (query) => {
      try {
        JSON.parse(query);
        return true;
      } catch (e) {
        return false;
      }
    };
    const vquery = isValidJSON ? JSON.parse(query) : {};
    const vsort = sort === "asc" || sort === "desc" ? { price: sort } : {};
    try {
      const productos = await prodModel.paginate(vquery, {
        page,
        limit,
        lean: true,
        vsort,
      });
      const queryLink = query === "{}" ? "" : "query=" + query + "&";
      const limitLink = limit === 10 ? "" : "limit=" + limit + "&";
      const sortLink = sort === undefined ? "" : "sort=" + sort + "&";
      const result = {
        status: "success",
        payload: productos.docs,
        totalPages: productos.totalPages,
        prevPage: productos.prevPage,
        nextPage: productos.nextPage,
        page: productos.page,
        hasPrevPage: productos.hasPrevPage,
        hasNextPage: productos.hasNextPage,
        firstLink: productos.hasPrevPage
          ? "products?" + queryLink + limitLink + sortLink + "&page=1"
          : null,
        prevLink: productos.hasPrevPage
          ? "products?" +
            queryLink +
            limitLink +
            sortLink +
            "&page=" +
            productos.prevPage
          : null,
        nextLink: productos.hasNextPage
          ? "products?" +
            queryLink +
            limitLink +
            sortLink +
            "page=" +
            productos.nextPage
          : null,
        lastLink: productos.hasNextPage
          ? "products?" +
            queryLink +
            limitLink +
            sortLink +
            "page=" +
            productos.totalPages
          : null,
      };
      return result;
    } catch (error) {
      return { error: 3, servererror: error };
    }
  };
  getProductById = async (id) => {
    try {
      const foundprod = prodModel.findOne({ _id: id }).lean().exec();
      return foundprod;
    } catch (error) {
      return { error: 3, servererror: error };
    }
  };
  addProduct = async ({
    title,
    description,
    price,
    thumbnails = [],
    code,
    stock,
    category,
    status = true,
  }) => {
    let errortxt = [];
    (!title || title.length === 0) && errortxt.push("title es obligatorio.");
    (!description || description.length === 0) &&
      errortxt.push("description es obligatorio.");
    (!code || code.length === 0) && errortxt.push("code es obligatorio.");
    (!price || price.length === 0) && errortxt.push("price es obligatorio.");
    price &&
      (isNaN(price) || price <= 0) &&
      errortxt.push("price tiene que ser un número positivo.");
    (!stock || stock.length === 0) && errortxt.push("stock es obligatorio.");
    stock &&
      (isNaN(stock) || stock <= 0) &&
      errortxt.push("stock tiene que ser un número positivo.");
    (!category || category.length === 0) &&
      errortxt.push("category es obligatorio.");
    !Array.isArray(thumbnails) &&
      errortxt.push("thumbnails tiene que ser un array.");
    try {
      const found = await prodModel.findOne({ code: code }).lean().exec();
      console.log(found);
      if (found !== null) {
        errortxt.push("Ya se encuentra un producto con el mismo code.");
      }
    } catch (error) {
      return { error: 3, servererror: error };
    }
    if (errortxt.length > 0) {
      return { error: 1, errortxt: errortxt };
    } else {
      const product = {
        title,
        description,
        price,
        status,
        category,
        thumbnails,
        code,
        stock,
      };
      const newProduct = new prodModel(product);
      newProduct.save();
      return newProduct;
    }
  };
  updateProduct = async ({
    id,
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    category,
    status,
  }) => {
    try {
      const found = await prodModel.findOne({ _id: id }).lean().exec();
      if (found === null) {
        return { error: 2, errortxt: "el producto no existe" };
      }
      let errortxt = [];
      (!title || title.length === 0) && errortxt.push("title es obligatorio.");
      (!description || description.length === 0) &&
        errortxt.push("description es obligatorio.");
      (!code || code.length === 0) && errortxt.push("code es obligatorio.");
      (!price || price.length === 0) && errortxt.push("price es obligatorio.");
      price &&
        (isNaN(price) || price <= 0) &&
        errortxt.push("price tiene que ser un número positivo.");
      (!stock || stock.length === 0) && errortxt.push("stock es obligatorio.");
      stock &&
        (isNaN(stock) || stock <= 0) &&
        errortxt.push("stock tiene que ser un número positivo.");
      (!category || category.length === 0) &&
        errortxt.push("category es obligatorio.");
      (!status || status.length === 0) &&
        errortxt.push("status es obligatorio.");
      !thumbnails && errortxt.push("status es obligatorio.");
      !Array.isArray(thumbnails) &&
        errortxt.push("thumbnails tiene que ser un array.");
      const codefound = await prodModel
        .findOne({
          $and: [{ _id: { $ne: id } }, { code: code }],
        })
        .lean()
        .exec();

      if (codefound !== null) {
        errortxt.push("Ya se encuentra un producto con el mismo code.");
      }

      if (errortxt.length > 0) {
        return { error: 1, errortxt: errortxt };
      }
      const updatedProduct = await prodModel.findByIdAndUpdate(id, {
        title,
        description,
        price,
        status,
        category,
        thumbnails,
        code,
        stock,
      });
      return {
        id,
        title,
        description,
        price,
        status,
        category,
        thumbnails,
        code,
        stock,
      };
    } catch (error) {
      return { error: 3, servererror: error };
    }
  };
  deleteProduct = async (id) => {
    try {
      const found = await prodModel.findOne({ _id: id }).lean().exec();
      if (found === null) {
        return { error: 2, errortxt: "el producto no existe" };
      } else {
        const deletedProd = await prodModel.deleteOne({ _id: id });
        console.log(deletedProd);
        return deletedProd;
      }
    } catch (error) {
      return { error: 3, servererror: error };
    }
  };
}

export { ProductManagerDB };
