var express = require('express');
var router = express.Router();
var path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const HTMLToPDF = require('html5-to-pdf')

let agencyData = require('../config.json');

// GET form
router.get('/', function(req, res, next) {
  res.render('form');
});

// POST form
router.post('/', function(req, res, next){
  // Calulate totals
  let subTotal = 0;
  req.body.items.forEach(function(item){
    subTotal += (item.quantity * item.unitCost);
  })
  let grandTotal = subTotal - req.body.deductions;

  let data = {
    invoiceData: req.body,
    agencyData: agencyData,
    dateIssued: new Date().toDateString(),
    subTotal: subTotal,
    grandTotal: grandTotal
  }

  data.invoiceData.invoiceTo = data.invoiceData.invoiceTo.replace(new RegExp('\n', 'g'), '<br/>')

  // Create a HTML document from data and ejs template
  ejs.renderFile(path.join(__dirname, '../views/template.ejs'), data)
    .then(html=>{
      saveHTML(html);
    })
    .catch(err=>{
      console.log(err)
    })
  // Save the HTML document to disk
  function saveHTML(html){
    fs.writeFile(path.join(__dirname, '../public/output.html'), html, function(err){
      if(err) return console.log(err);
      convertToPDF()
    })
  }
  // Convert the PDF to
  function convertToPDF(){
    const htmlToPDF = new HTMLToPDF({
      inputPath: path.join(__dirname, '../public/output.html'),
      outputPath: path.join(__dirname, '../public/output.pdf'),
      templatePath: path.join(__dirname, "../template"),
      include: [
        {
          type: 'css',
          filePath: path.join(__dirname, '../public/invoice.css'),
        }
      ],
    })
    htmlToPDF.build((error) => {
      if(error) throw error;
      res.sendFile(path.join(__dirname, '../public/output.pdf'))
    })
  }



})

module.exports = router;
