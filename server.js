const http = require('http');
let message;
const fs = require('fs');
const querystring = require('querystring');

const handler = (request, response) => {
  let endpoint = request.url;
  console.log(endpoint);
  let method = request.method;
  console.log(method);
  let allTheData = '';

  if (endpoint === '/') {
    response.writeHead(200, {"Content-Type": "text/html"});

    fs.readFile(__dirname + '/public/index.html', (error, file) => {
      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    })
  } else if (endpoint === '/node') {
    message = 'node';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(message);
    response.end();
  } else if (endpoint === '/girls') {
    message = 'girls';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(message);
    response.end();
  } else {
    response.writeHead(200, {"Content-Type": "image/jpg"});

    fs.readFile(__dirname + '/public/img/image.jpg', (error, file) => {
      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    })
  }
  request.on('data', (chunkOfData) => {
    allTheData += chunkOfData;
  });

  request.on('end', () => {
    let convertedData = querystring.parse(allTheData);
    console.log(allTheData);
    response.end();
  });
};



const server = http.createServer(handler);

server.listen(3000, () => {
  console.log('Server is listening on 3000. Ready to accept requests!')
});
