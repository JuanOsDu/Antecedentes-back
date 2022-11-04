const {pool} = require("../database/connection");
const bcrypt = require('bcrypt');

const login = async(identificacion, password)=>{
    try{
        
        const user = await pool.query(`SELECT * FROM usuario_fun where identificacion = $1 `, [identificacion]);
       
        if(!user.rows[0]){
            return null;
        }else{
         
        const ok = bcrypt.compareSync(password, user.rows[0].password);
       
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

module.exports ={login}