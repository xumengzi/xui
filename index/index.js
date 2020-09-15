const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res)=>{
  // req.setEncoding('gzip')
  res.statusCode = 200;
  res.setHeader('Catch-Control', 'max-age=12312312');
  // res.setHeader('Content-Encoding', 'gzip');
  const arr = ['/', '/favicon.ico'];
  if(req.url == '/'){
    res.setHeader('Content-Type', 'text/html')
  }else{
    console.log('nima')
    res.setHeader('Content-Type', 'image/png');
  }
  try {
    let content = fs.readFileSync('./index.html');
    res.end(content);
  } catch (error) {
    res.end('error')
  }
});

server.listen(80, ()=>{
  console.log('the server is running!')
});