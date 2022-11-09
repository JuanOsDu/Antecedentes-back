const { pool } = require('../database/connection');



const registrar = async (data) => {
    try {
        const {
            p_nombre,
            s_nombre,
            p_apellido,
            s_apellido,
            tipo_doc,
            id,
            fecha_exp,
            lugar_exp,
            fecha_nac,
            lugar_nac,
            rh,
            estatura, sexo,
            grupo_sanguineo
        } = data;

        const ciud = await pool.require("insert into ciudadano( primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,tipo_doc, no_doc,fecha_exp, lugar_exp,fecha_nacimiento, lugar_nacimiento,   rh,  estatura, sexo, grupo_sanguineo) values($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12,$13,$14) returning *", [p_nombre,
            s_nombre,
            p_apellido,
            s_apellido,
            tipo_doc,
            id,
            fecha_exp,
            lugar_exp,
            fecha_nac,
            lugar_nac,
            rh,
            estatura, sexo,
            grupo_sanguineo])
        return ciud.rows[0];
    } catch (err) {
        throw new Error("Error en registro ciudadano");
    }
}


const actualizar = async (data) => {
    try {
        const {
            p_nombre,
            s_nombre,
            p_apellido,
            s_apellido,
            tipo_doc,
            id,
            fecha_exp,
            lugar_exp,
            fecha_nac,
            lugar_nac,
            rh,
            estatura, sexo,
            g_sanguineo
        } = data;

        const ciud = await pool.require("update ciudadano set primer_nombre=$1, segundo_nombre=$2, primer_apellido=$3, segundo_apellido=$4,tipo_doc=$5, fecha_exp=$6, lugar_exp=$7,fecha_nacimiento$8, lugar_nacimiento=$9,   rh=$10,  estatura=$11, sexo=$12, grupo_sanguineo=$13, no_doc=$14 where no_doc=$15 returning *",
            [p_nombre,
                s_nombre,
                p_apellido,
                s_apellido,
                tipo_doc,
                fecha_exp,
                lugar_exp,
                fecha_nac,
                lugar_nac,
                rh,
                estatura, sexo,
                g_sanguineo,
                id,
                id])
        return ciud.rows[0];
    } catch (err) {
        throw new Error("Error en actualizacion ciudadano");
    }
}
const borrar = async (id) => {
    try {
        const ciudadano = await pool.query("delete from ciudadano where no_doc="+id+ " returning *")
        return ciudadano.rows[0]
    } catch (err) {
        throw new Error("Error borrando ciudadano");
    }
}
const listado_requeridos = async () => {

}

const antecedente = async (id) => {

}
const generarReporteRequeridos = async () => {
    try {
        const ciudadanos = await pool.query("SELECT * FROM v_ciudadanos_requeridos");
        return ciudadanos;
    } catch (err) {
        console.log(err)
        throw new Error("Error generando reporte")
    }
}
const generarReporteNoRequeridos = async () => {
    try {
        const ciudadanos = await pool.query("SELECT * FROM v_ciudadanos_noRequeridos");
        return ciudadanos;

    } catch (err) {
        throw new Error("Error generando reporte")
    }
}
const consultar = async (id) => {
    try {
        const ciudadanos = await pool.query("SELECT * FROM ciudadano where no_doc="+id);
        return ciudadanos.rows[0];

    } catch (err) {
        throw new Error("Error generando reporte")
    }
}
module.exports = { registrar, generarReporteRequeridos, generarReporteNoRequeridos, actualizar, borrar , consultar};