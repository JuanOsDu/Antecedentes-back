const express = require('express');
const app = express();
const {pool} = require('./src/database/connection')
require('dotenv').config()


app.get("/", async(req, res)=>{
    console.log(await pool.query("SELECT NOW()"));
    return res.send("ANTECEDENTES {JUAN-ESMERALDA-2022}" );
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log(process.env.PORT||3000);
})