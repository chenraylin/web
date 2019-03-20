// nvm管理node的版本
// curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
// command -v nvm
// node 執行環境
// nvm -ls
// nvm use 
// node index.js
// npm init
// npm install express (npm i express)
// npm install request (npm i request) 
//// html: localhost:3000
//// http://localhost:3000/proxy?http://data.nba.net/prod/v3/today.json

var express = require('express'); // require抓取其它套件來用
var request = require('request');
var app     = express();

//cors
app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*"); // 改成跨網域
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
 });
 


app.get('/proxy', function (req, res) {
   var url = req.url.replace('/proxy?', '');
   console.log(url)
   req.pipe(request({
       url: url,
       headers: {
           'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36',
       }
   })).on('error', function (err) {
       console.log('Error piping request object to request(): ', err);
       res.writeHead(404);
       res.end();
   }).pipe(res).on('error', function (err) {
       console.log('Error piping response from request() to response object : ', err);
       res.writeHead(404);
       res.end();
   });
});

app.listen(3000, function () {
   console.log('Example app listening on port 3000!');
});
