const express = require('express');
const router = express.Router();
const ciudadano = require("../controller/ciudadanos.controller");

const pdf = require('html-pdf');


router.get("/reporte", async (req, res) => {
    try {

        const ciudadanos = await ciudadano.generarReporteRequeridos();
        const ciudadanosNo = await ciudadano.generarReporteNoRequeridos();
        if (!ciudadanos) {

            var datetime = new Date();

            const content = `
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

            for (let i = 0; i < ciudadanos.rows; i++) {
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
            for (let i = 0; i < ciudadanosNo.rows; i++) {
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
            const filename = '../consultas/'+moment+'.pdf'
            pdf.create(content).toFile(filename, function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                }
            });


            return res.status(200).sendFile(filename);
           
        } else {
            return res.status(200).json({
                msg: "No se encontro informacion alguna",
                detail: "No hay datos en el sistema",
                code: 1
            })
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