import express from "express";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const app = express();
app.listen(process.env.PORT);

app.get("/", (req, res) => {
  res.send("Hi 3000");
});
app.get("/write-date", (req, res) => {
  let date = new Date(); //create date
  let folderName = `${date.getDate()}-${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}.${date.getMilliseconds()}`;
  console.log("time", folderName);
  fs.writeFile(`./TimeFolder/${folderName}.txt`, date.toString(), (err) => {
    if (!err) res.send(`Timestamp added, ${date.toString()}`);
  });
});

app.get("/get-files", (req, res) => {
  fs.readdir("./TimeFolder", (err, files) => {
    if (!err) {
      res.send(files);
    } else {
      res.send(err);
    }
  });
});
