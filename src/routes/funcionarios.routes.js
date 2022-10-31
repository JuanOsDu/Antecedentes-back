const express = require('express');
const router = express.Router();




router.post('/registro', async (req, res) => {
    try {
        const {
            p_nombre,
            s_nombre,
            p_apellido,
            s_apellido,
            id,
            fuerza,
            rango,
            correo
           
        } = req.body;

        const data = [
            {
                campo: "p_nombre",

                valor: p_nombre
            },
            {
                campo: "s_nombre",

                valor: s_nombre
            },
            {
                campo: "p_apellido",

                valor: p_apellido
            },
            {
                campo: "s_apellido",

                valor: s_apellido
            },
            {
                campo: "id",

                valor: id
            },
            {
                campo: "fuerza",

                valor: fuerza
            },
            {
                campo: "rango",

                valor: rango
            }, {
                campo: "correo",

                valor: correo
            }
            

        ]
        const empty = data.filter(e => e.valor == null);
        if (empty) {
            return res.status(400).json({
                msg: "Campo faltante",
                datail: empty,
                code: -4
            })
        }else{
            const ciudadano = await ciud.registrar(req.body);
            if(ciudadano){
                return res.status(200).json({
                    msg: "Registro exitoso",
                    datail: ciudadano,
                    code: 1
                })
            }else{
                return res.status(200).json({
                    msg: "Registro no se pudo completar",
                    datail: ciudadano,
                    code: -1
                }) 
            }
        }
    



    } catch (err) {
        return res.status(500).json({
            msg: "Error interno",
            detail: err,
            code: -1
        })
    }
})



module.exports = router;