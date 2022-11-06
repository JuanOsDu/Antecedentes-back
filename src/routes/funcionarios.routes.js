const express = require('express');
const router = express.Router();
const ciud = require("../controller/ciudadanos.controller");
const funcionario = require('../controller/funcionarios.controller');



router.post('/registro-funcionario', async (req, res) => {
    try {
        const {
            p_nombre,
            s_nombre,
            p_apellido,
            s_apellido,
            id,
            fuerza,
            rango,
            sexo,
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
                campo: "sexo",

                valor: sexo
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
        const empty = data.find(e => e.valor == null);
        
        if (empty) {
            return res.status(400).json({
                msg: "Campo faltante",
                datail: empty,
                code: -4
            })
        }else{
            const ciudadano = await funcionario.registrar( p_nombre,
                s_nombre,
                p_apellido,
                s_apellido,
                id,
                fuerza,
                rango,
                correo, sexo);
               
            if(ciudadano){
                if(ciudadano == -2){
                    return res.status(200).json({
                        msg: "Funcionario ya existe",
                        datail: ciudadano,
                        code: 1
                    })
                }else if(ciudadano == -1){
                    return res.status(200).json({
                        msg: "No se pudo crear",
                        datail: ciudadano,
                        code: -1
                    })
                }
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


router.get('/consulta-antecedentes', async(req, res)=>{
    try{
        const identificacion= req.query.identificacion;
        if(!identificacion){
            return res.status(400).json({
                msg: "No se puede procesar su solicitud",
                detail: "Verifique cuerpo de su petición",
                code: -4
            })
        }else{
            const estado = await funcionario.consultarDocumento(identificacion);
            if(!estado){
                return res.status(200).json({
                    msg: "El ciudadano no es requerido por alguna autoridad",
                    detail: "No se encontro registro de antecedentes",
                    code: 0
                })
            }else{
                return res.status(200).json({
                    msg: "El ciudadano es requerido por las autoridades",
                    detail: estado,
                
                    code: 1
                }) 
            }
        }
    }catch(err){
       
        return res.status(500).json({
            msg: "Error interno",
            detail: err,
            code: -1
        })
    }
})


module.exports = router;