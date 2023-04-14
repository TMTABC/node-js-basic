import pool from "../configs/connectDB";
import multer from "multer";

let getHomepage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM user");
  return res.render("index.ejs", { dataUsers: rows });
};

let getDetailPage = async (req, res) => {
  let userId = req.params.id;
  let user = await pool.execute(`SELECT * FROM user where id = ?`, [userId]);
  console.log(req.params);
  return res.send(JSON.stringify(user[0]));
};
let createNewUser = async (req, res) => {
  let { firstname, lastname, email, Address } = req.body;
  await pool.execute(
    "insert into user(firstName,lastName,email,address) values(?,?,?,?)",
    [firstname, lastname, email, Address]
  );
  return res.redirect("/");
};
let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute("delete from user where id =?", [userId]);
  return res.redirect(`/`);
};
let getEditPage = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute("Select * from user where id = ?", [id]);
  return res.render(`update.ejs`, { dataUsers: user[0] });
};
let postUpdateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  await pool.execute(
    "update user set firstName= ? , lastName= ? , email= ? , address= ? where id = ?",
    [firstName, lastName, email, address, id]
  );
  console.log(req.body);
  return res.redirect("/");
};
let getUploadFile = async (req, res) => {
  return res.render("uploadfile.ejs");
};

let handleUploadFile = async (req, res) => {
  // req.file contains information of uploaded file
  // req.body contains information of text fields, if there were any
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.file) {
    return res.send("Please select an image to upload");
  }

  // Display uploaded image for user validation
  res.send(
    `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`
  );
};
let handleUploadMultipleFiles = (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.files) {
    return res.send("Please select an image to upload");
  }

  let result = "You have uploaded these images: <hr />";
  const files = req.files;
  let index, len;

  // Loop through all the uploaded images and display them on frontend
  for (index = 0, len = files.length; index < len; ++index) {
    result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
  }
  result += '<hr/><a href="/upload">Upload more images</a>';
  res.send(result);
};
module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getEditPage,
  postUpdateUser,
  getUploadFile,
  handleUploadFile,
  handleUploadMultipleFiles,
};
