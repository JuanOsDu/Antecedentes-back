const {pool} = require("../database/connection");
const bcrypt = require('bcrypt');

const login = async(email, password)=>{
    try{
        const user = await pool.query("SELECT * FROM ", [email, password]);
        if(!user){
            return null;
        }else{
            const ok = bcrypt.compare(user.rows[0].password, password);
            if(!ok){
                return null
            }else{
                return user.rows[0];
            }
        }

    }catch(err){
        throw new Error("Error en controlador login "+err);
    }
}