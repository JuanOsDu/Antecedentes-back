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
            fecha_exp,
            lugar_exp,
            fecha_nac,
            lugar_nac,
            rh,
            g_sanguineo,
            estatura
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
                campo: "fecha_exp",

                valor: fecha_exp
            },
            {
                campo: "lugar_exp",

                valor: lugar_exp
            },
            {
                campo: "fecha_nac",

                valor: fecha_nac
            },
            {
                campo: "lugar_nac",

                valor: lugar_nac
            },
            {
                campo: "rh",

                valor: rh
            },
            {
                campo: "g_sanguineo",

                valor: g_sanguineo
            },
            {
                campo: "estatura",

                valor: estatura
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