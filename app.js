const ejs = require('ejs');
const fs = require('fs');
const HTMLToPDF = require('html5-to-pdf')

demoData = ['geddy', 'neil', 'alex']

ejs.renderFile('./template.ejs', demoData)
  .then(html=>{
    saveHTML(html);
  })
  .catch(err=>{
    console.log(err)
  })

function saveHTML(html){
  fs.writeFile('test.html', html, function(err){
    if(err) return console.log(err);
    convertToPDF()
  })
}

function convertToPDF(){
  const htmlToPDF = new HTMLToPDF({
    inputPath: './test.html',
    outputPath: './output.pdf',
  })
  htmlToPDF.build((error) => {
    if(error) throw error
  })
}
