import {config}  from "./config.js";
import mysql from "mysql";


const host=config.HOST;
const user=config.USER;
const password=config.PASSWORD;

const db = mysql.createConnection({
    host:host ,
    user:user ,
    password:password  
  });

export const dbb=()=>{
 const schema = "CREATE SCHEMA `bookshop`";
 db.query(schema, (err, data) => {
      if (err) return (err);
     
 });
   
    const table = "CREATE TABLE `bookshop`.`books` ( `id` INT NOT NULL AUTO_INCREMENT,`title` VARCHAR(45) NULL,`desc` VARCHAR(45) NULL,`price` VARCHAR(45) NULL,`cover` VARCHAR(45) NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)";
    db.query(table, (err, data) => {
         if (err) return (err);
         
    });
    console.log("schema created-------table created")
    return true;
};