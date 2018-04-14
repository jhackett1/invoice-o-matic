var express = require('express');
var router = express.Router();
var path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const HTMLToPDF = require('html5-to-pdf')

// GET form
router.get('/', function(req, res, next) {
  res.render('form');
});

// POST form
router.post('/create-invoice', function(req, res, next){

  let data = req.body;

  console.log(data)

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
    fs.writeFile(path.join(__dirname, '../public/test.html'), html, function(err){
      if(err) return console.log(err);
      convertToPDF()
    })
  }
  // Convert the PDF to
  function convertToPDF(){
    const htmlToPDF = new HTMLToPDF({
      inputPath: path.join(__dirname, '../public/test.html'),
      outputPath: path.join(__dirname, '../public/output.pdf'),
    })
    htmlToPDF.build((error) => {
      if(error) throw error;
      res.sendFile(path.join(__dirname, '../public/output.pdf'))
    })
  }



})

module.exports = router;
