const http = require('http');
let message;
const express = require('express');
const app = express();
const fs = require('fs');
const formidable = require('express-formidable');
// const querystring = require('querystring');

app.use(express.static("public"));
app.use(formidable());
app.get("/gets-posts", (request, response) => {
  response.sendFile(__dirname + '/data/posts.json')
});

app.post("/create-post", (request, response) => {
  fs.readFile(__dirname + "/data/posts.json", (error, file) => {
    if (error) {
      console.log(error);
    }

    let parsedJson = JSON.parse(file);
    let key = Date.now();
    let value = request.fields.blogpost;

    parsedJson[key] = value;
    let data = JSON.stringify(parsedJson);
    fs.readFile(__dirname + "/data/posts.json", data, (error) => {
      console.log(error);
    });
  });
});

// const handler = (request, response) => {
//   let endpoint = request.url;
//   console.log(endpoint);
//   let method = request.method;
//   console.log(method);
//   let allTheData = '';

//   if (endpoint === '/') {
//     response.writeHead(200, {"Content-Type": "text/html"});

//     fs.readFile(__dirname + '/public/index.html', (error, file) => {
//       if (error) {
//         console.log(error);
//         return;
//       }
//       response.end(file);
//     })

//     request.on('data', (chunkOfData) => {
//       allTheData += chunkOfData;
//     });

//     request.on('end', () => {
//       let convertedData = querystring.parse(allTheData);
//       console.log(allTheData);
//       response.end();
//     });

//   } else if (endpoint === '/node') {
//     message = 'node';
//     response.writeHead(200, {"Content-Type": "text/html"});
//     response.write(message);
//     response.end();
//   } else if (endpoint === '/girls') {
//     message = 'girls';
//     response.writeHead(200, {"Content-Type": "text/html"});
//     response.write(message);
//     response.end();
//   } else {
//     response.writeHead(200, {"Content-Type": "image/jpg"});

//     fs.readFile(__dirname + '/public/img/image.jpg', (error, file) => {
//       if (error) {
//         console.log(error);
//         return;
//       }
//       response.end(file);
//     })
//   }

// };



// const server = http.createServer(handler);

app.listen(3000, () => {
  console.log('Server is listening on 3000. Ready to accept requests!')
});
