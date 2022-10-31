const pool = require('../database/connection');



const registrar = async (data) => {
    try {
        const ciud = await pool.require("select * from f_registro_ciudadano()", [])
        return ciud.rows[0];
    } catch (err) {
        throw new Error("Error en registro ciudadano");
    }
}


const listado_requeridos = async()=>{

}

const antecedente = async(id)=>{
    
}


module.exports = {registrar};