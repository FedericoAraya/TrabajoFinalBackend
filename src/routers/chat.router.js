import { Router } from "express";
import  messageModel  from "../dao/models/message.model.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const messages = await messageModel.find({ }).lean().exec();
                res.render("chat", { messages });
    } catch (error) {
        console.log( error);
        res.render("chat", { messages: [{message : "Error al cargar los mensajes"}] });
    }
});

export default router;