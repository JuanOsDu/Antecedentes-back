const express = require('express');
const router = express.Router();
const ciudadano = require("../controller/ciudadanos.controller");
const path = require('path')
const pdf = require('html-pdf');


router.get("/reporte", async (req, res) => {
    try {

        const ciudadanos = await ciudadano.generarReporteRequeridos();
        const ciudadanosNo = await ciudadano.generarReporteNoRequeridos();
        
        if (ciudadanosNo) {

            var datetime = new Date();

            var content = `
            <h1>Reporte ciudadanos</h1>
            <h2>Generado ${datetime}</h2>
            <p>Requeridos: </p>
<table class="default">

<tr>

  <td>Identificacion</td>

  <td>Nombres</td>

  <td>Apellidos</td>

</tr>




            `;
            
            for (let i = 0; i < ciudadanos.rows.length; i++) {
                const ciudadano = ciudadanos.rows[i];
                
                content += `<tr>

                <td>${ciudadano.identificacion}</td>
              
                <td>${ciudadano.nombres}</td>
              
                <td>${ciudadano.apellidos}</td>
              
              </tr>`
            }
            content += `</table>
            <p>No requeridos</p>
            <table class="default">

<tr>

  <td>Identificacion</td>

  <td>Nombres</td>

  <td>Apellidos</td>

</tr>
`;
            for (let i = 0; i < ciudadanosNo.rows.length; i++) {
                const ciudadano = ciudadanosNo.rows[i];
                content += `<tr>

    <td>${ciudadano.identificacion}</td>
  
    <td>${ciudadano.nombres}</td>
  
    <td>${ciudadano.apellidos}</td>
  
  </tr>`
            }
            content += `</table>`;
            var moment = require('moment');
            moment().format('yyyymmddhhmmss');
            var ruta = moment()+'.pdf'
            const filename = '../consultas/'+ruta
            pdf.create(content).toFile(filename, function (err, resu) {
                if (err) {
                    console.log("Error creando "+ err);
                    return res.status(200).json({
                        msg: "No se pudo generar el reporte",
                        detail: "Error construyendo archivo",
                        code: 1
                    })
                } else {
                    console.log("PDF generado "+resu);
                    return res.status(200).sendFile(path.resolve('../consultas/'+ruta));
                }
            });


           
           
        } else {
            return res.status(200).json({
                msg: "No se encontro informacion alguna",
                detail: "No hay datos en el sistema",
                code: 1
            })
        }
    } catch (err) {
        console.log(err)
        return res.status(200).json({
            msg: "Error interno",
            detail: err,
            code: -1
        })
    }
})



module.exports = router;