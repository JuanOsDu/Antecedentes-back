const express = require('express');
const app = express();
app.use(express.json())
const {pool} = require('./src/database/connection')
const login = require("./src/routes/login.routes")
const funcionarios = require("./src/routes/funcionarios.routes")
require('dotenv').config()


app.get("/", async(req, res)=>{
    console.log(await pool.query("SELECT NOW()").then(data =>  data.rows));
    return res.send("ANTECEDENTES {JUAN-ESMERALDA-ALBERTO-2022}" );
})
app.use("/api", login)
app.use("/api", funcionarios)


app.listen(process.env.PORT || 3000, ()=>{
    console.log(process.env.PORT||3000);
})