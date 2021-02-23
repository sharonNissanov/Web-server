var http = require('http');
var fs = require('fs');
var url = require("url");
var path = require("path");
const { types } = require('util');
var port = '8080';
function onRequest(request, response) {
 
  response.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('index.html',null, function(error, dataa) {
      if (error) {
          response.writeHead(404);
          response.write('File not found');
      } else {
          // emitter.emit('massageLogged');
          response.write(dataa);
      }
      response.end();
  });

  if(request.url == "/add" && request.method == "POST"){
    let body = ''; 
    request.on('data', chunk => {
    body += chunk.toString('utf8')

    })
    request.on('end', function () {

      fs.readFile('./data.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return;
        }else{
          console.log("File read succeeded:",  jsonString+body)
         
        }
        try {
            fs.writeFile('./data.json', jsonString+body+"\n", err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })


        } catch(err) {
          console.log('Error parsing JSON string:', err)
        }
        
      })

    })
    request.on('error', err=> {
      console.log("recieve err" + err)
    })
  }
}
http.createServer(onRequest).listen(8080, function(){
  console.log("Server is running on port: " + port);
});