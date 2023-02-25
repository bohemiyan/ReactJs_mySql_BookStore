
import {config}  from "./config.js";
import express from "express";
import mysql from "mysql";
import cors from "cors";


import { dbb } from "./createdb.js";
//this function is used to create schema and table
// dbb();


const app = express();
app.use(cors());
app.use(express.json());

const host=config.HOST;
const user=config.USER;
const password=config.PASSWORD;
const database=config.DATABASE;
const port=config.PORT;

const db = mysql.createConnection({
  host:host ,
  user:user ,
  password:password ,
  database:database 
});





app.get("/conn", (req, res) => {
  res.json(conn);
});


app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
 
    return res.json(data);
    // return res.data;
  });
 
});
app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "SELECT * FROM books Where id=?";
  db.query(q,[bookId], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    // return res.json(data);
    return res.json(data);
  });
 
});


app.post("/books", (req, res) => {
  const q = "INSERT INTO `bookshop`.`books` ( `title`, `desc`, `price`, `cover`) VALUES (?)";
// console.log(req.body)
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// const errr=Unknown database 'bookshop'
let conn="";
app.listen(port, () => {
  db.connect(function(err) {

    if(err)
    {
      console.log("schema not found");
      const errr=err.errno;
      if(1049==errr)
        {
       if( dbb())
       {
        db.connect(function(err) {
          if (err) throw err
          console.log("reconnected")
        })
      }
    }}
    

    conn=`Backend Connected with mySql bookshop on port:${port}`;
    console.log("Backend Connected with mySql bookshop", "Port no:",port);
  });
 
  
});