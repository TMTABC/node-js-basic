import express from "express";
import apiController from "../controller/apiController";
let router = express.Router();
const initAPIRoute = (app) => {
  //CRUD:Create/READ/UPDATE/DELETE
  //METHOD:POST/GET/PUT/DELETE
  router.get("/users", apiController.getAllUsers);
  router.post("/create-user", apiController.createNewUser);
  router.put("/update-user", apiController.updateUser);
  router.delete("/delete-user/:id", apiController.deleteUser);
  return app.use("/api/v1/", router);
};
export default initAPIRoute;
