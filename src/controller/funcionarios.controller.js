const {pool} = require('../database/connection');
const mail = require('../utils/mail')
const bcrypt = require("bcrypt")

const registrar = async ( p_nombre,
    s_nombre,
    p_apellido,
    s_apellido,
    id,
    fuerza,
    rango,
    correo, sexo) => {
        try {
            let password = generar_contraseña();
            
            let passwordNH = password;
            console.log(password)
            password = bcrypt.hashSync(password, 5);
            console.log(password)
            try{
            const ciud = await pool.query(`INSERT INTO funcionario_df(
                no_doc, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, sexo, fuerza, rango, correo)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`, [ id,
                    p_nombre,
                    s_nombre,
                    p_apellido,
                    s_apellido,
                    sexo,
                    fuerza,
                    rango,
                    correo
                ])}catch(errR){
                    console.log(errR)
                    return -2
                }
                
             const user = await pool.query(`INSERT INTO usuario_fun(
                identificacion, password)
               VALUES ( $1, $2)`,[id, password])

        if(user.rows != "[]"){
    /*        var mailOptions = {
                from: '"Our Code World " <mymail@outlook.com>', // sender address (who sends)
                to: 'mymail@mail.com, mymail2@mail.com', // list of receivers (who receives)
                subject: 'Hello ', // Subject line
                text: 'Hello world ', // plaintext body
                html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js' // html body
            };*/
            var mailOptions = {
                from: '"Registraduria Konrad " <RegistraduriaKonrad2022@outlook.com>', // sender address (who sends)
                to: correo, // list of receivers (who receives)
                subject: 'Registro en el sistema ', // Subject line
                text: "Su registro se ha completado con exito, utilice esta contraseña para acceder: \n"+passwordNH, // plaintext body
                html: '' // html body
            };
            mail.send(mailOptions);
            return "OK";
        }else{
            return null;
        }
      
    } catch (err) {
        console.log(err)
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
        let letra1;
        let letra2;
        try{
         letra1 = alph[Math.ceil(Math.random()*alph.length)];
         letra2 = alph[Math.ceil(Math.random()*alph.length)].toLowerCase();
        }catch(err){
             letra1 = "e"
             letra2 = "R"
        }
        var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
        var pass = letra1+""+seq+""+letra2;
      
        return pass;
    } catch (err) {
        throw new Error("Error generando contraseña");
    }
}


module.exports = { registrar };