const pool = require('../database/connection');



const registrar = async (data) => {
    try {
        const ciud = await pool.require("select * from f_registro_funcionario()", [])
        return ciud.rows[0];
    } catch (err) {
        throw new Error("Error en registro ciudadano");
    }
}


const generar_contraseña = () => {
    try {
        const alph = [
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z'
        ];

        const letra1 = alph[Math.ceil(Math.random()*alph.length)];
        const letra2 = alph[Math.ceil(Math.random()*alph.length)].toLowerCase();
        var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
        var pass = letra1+""+seq+""+letra2;
        return pass;
    } catch (err) {
        throw new Error("Error generando contraseña");
    }
}


module.exports = { registrar };