const http = require('http');
const message = 'I am finally starting to understand Node.js!';

const handler = (request, response) => {
  response.writeHead(200, {"content-Type": "text/html"});
  response.write(message);
  response.end();
};

const server = http.createServer(handler);

server.listen(3000, () => {
  console.log('Server is listening on 3000. Ready to accept requests!')
});
