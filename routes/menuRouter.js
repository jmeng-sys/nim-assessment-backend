const { Router } = require("express");
const menuController = require("../controllers/menuController");

const menuRouter = Router();

menuRouter.get("/", menuController.getAll);
// menuRouter.get("/:id", menuController.getOne);
menuRouter.post("/", menuController.create);
menuRouter.put("/:id", menuController.updateOne);
menuRouter.delete("/:id", menuController.removeOne);
menuRouter.get("/search", menuController.searchItem);

module.exports = menuRouter;
