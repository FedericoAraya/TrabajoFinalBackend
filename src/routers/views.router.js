import { Router } from "express";
import userModel from "../model/user.model.js";
import CartManagerDB from   "../dao/Manager/cartManagerDB.js"
import ProductManagerDB from   "../dao/Manager/productManagerDB.js"
const router = Router()


router.get('/', async (req, res)=>{
    res.redirect("session/login");
})

router.get("/products", async (req, res) => {
    const limit = req.query.limit;
    const page = req.query.page;
    const query = req.query.query;
    const sort = req.query.sort;

    if( !req.session.email ) return res.render("errors/view.errors", { error: "No tienes los permisos para acceder a esta seccion." });

    const mail = req.session.email;
    const user = await userModel.findOne({ email: mail }).lean().exec();
    const nombre = user.first_name;
    const apellido = user.last_name;
    let rol = "";
  
    if (mail == "adminCoder@coder.com") {
      rol = "admin";
    } else {
      rol = "User";
    }
  
    let limite = "",
      consulta = "",
      orden = "";
    if (limit) limite = `&limit=${limit}`;
    if (query) consulta = `&query=${query}`;
    if (sort) orden = `&sort=${sort}`;
  
    ProductManagerDB.getProductosView(limit, page, query, sort).then((data) => {
      if (data) {
        let prevLink = "";
        let nextLink = "";
        data.hasPrevPage
          ? (prevLink = `/products?page=${data.prevPage}${limite}${consulta}${orden}`)
          : (prevLink = "");
        data.hasNextPage
          ? (nextLink = `/products?page=${data.nextPage}${limite}${consulta}${orden}`)
          : (nextLink = "");
        res.render("products", {
          data,
          prevLink,
          nextLink,
          mail,
          nombre,
          apellido,
          rol
        });
      }
    });
  });

  router.get("/carts/:cid", (req, res) => {
    const cid = req.params.cid;
    CartManagerDB.getCartByIdView(cid).then((data) => {
      if (data) {
        res.render("cart", { cid, data });
      }
    });
  });
  export default router;