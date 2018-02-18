const http = require('http');
const server = http.createServer();

server.listen(3000, () => {
  console.log('Server is listening on 3000. Ready to accept requests!')
});
