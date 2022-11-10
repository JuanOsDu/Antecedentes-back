const express = require("express");
const router = express.Router();
const loginController = require("../controller/login.controller");


router.post('/login', async(req, res)=>{
try{
    const {identificacion, password}=req.query;
    if(!identificacion || !password){
        return res.status(200).json({
            msg: "Revise el cuerpo de su solicitud",
            detail: `No ingreso identificacion y/o contraseña`,
            code: -4
        })
    }else{
        const user = await loginController.login(identificacion, password);
        if(!user){
            return res.status(200).json({
                msg: "Verifique sus credenciales",
                detail: "identificacion o contraseña incorrecta",
                code: 2
            })
        }else{
            return res.status(200).json({
                msg: "Inicio correcto",
                detail: "Credenciales validadas",
                code: 1
            })
        }
    }

}catch(err){
    console.log(err)
    return res.status(200).json({
        msg: "Error interno en incio de sesion",
        detail: err,
        code: -1
    })
}


})
module.exports = router