import express from "express";
import homeController from "../controller/homeController";
import multer from "multer";
import path from "path";
var appRoot = require("app-root-path");
let route = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/image/");
  },
  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
// 'profile_pic' is the name of our file input field in the HTML form
let upload = multer({
  storage: storage,
  fileFilter: imageFilter,
});
let uploadMUltipleFile = multer({
  storage: storage,
  fileFilter: imageFilter,
}).array("multiple_images", 3);

const initWebRoute = (app) => {
  //CRUD:Create/READ/UPDATE/DELETE
  //METHOD:POST/GET/PUT/DELETE
  route.get("/", homeController.getHomepage);
  route.get("/upload", homeController.getUploadFile);

  route.get("/detail/user/:id", homeController.getDetailPage);
  route.post("/create-new-user", homeController.createNewUser);
  route.post("/delete-user", homeController.deleteUser);
  route.get("/edit-user/:id", homeController.getEditPage);
  route.post("/update-user", homeController.postUpdateUser);
  route.post(
    "/upload-profile-pic",
    upload.single("profile_pic"),
    homeController.handleUploadFile
  );
  route.post(
    "/upload-multiple-images",
    (req, res, next) => {
      uploadMUltipleFile(req, res, (err) => {
        if (
          err instanceof multer.MulterError &&
          err.code === "LIMIT_UNEXPECTED_FILE"
        ) {
          res.send("LIMIT_UNEXPECTED_FILE");
        } else if (err) {
          res.send(err);
        } else {
          next();
        }
      });
    },
    homeController.handleUploadMultipleFiles
  );
  route.get("/about", (req, res) => {
    res.send("I'm hero ");
  });
  return app.use("/", route);
};
export default initWebRoute;
