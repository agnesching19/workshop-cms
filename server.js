const http = require('http');
let message;
const fs = require('fs');

const handler = (request, response) => {
  let endpoint = request.url;
  console.log(endpoint);
  let method = request.method;
  console.log(method);

  if (endpoint === '/') {
    response.writeHead(200, {"Content-Type": "text/html"});

    fs.readFile(__dirname + '/public/index.html', (error, file) => {
      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    })
  }
};

const server = http.createServer(handler);

server.listen(3000, () => {
  console.log('Server is listening on 3000. Ready to accept requests!')
});
