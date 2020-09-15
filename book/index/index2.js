const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res)=>{
  // req.setEncoding('gzip')
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  try {
    let content = fs.readFileSync('./index2.html');
    res.end(content);
  } catch (error) {
    res.end('error')
  }
});

server.listen(8001, ()=>{
  console.log('the server is running!')
});