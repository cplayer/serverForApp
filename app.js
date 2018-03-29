'use strict'
var http = require("http")
var url = require("url")
var querystring = require("querystring");

var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "serverDB"
});

var express = require("express");
var app = express();

// function start ()
// {
//     function onRequest(request, response)
//     {
//         var pathname = url.parse(request.url).pathname;
//         // console.log("Request for " + pathname + " received.");
//         response.writeHead(200, {"Content-Type": "text/plain"});
//         response.write("Running!");
//         response.end();
//     }

//     http.createServer(onRequest).listen(8888);
//     console.log("Started..");
//     // connection.connect();
//     // connection.query("SELECT * FROM test_DB", function (error, results, fields)
//     // {
//     //     if (error) console.log(error);
//     //     console.log("The Result is:");
//     //     console.log(results);
//     // })
// }

app.get('/getInfos', function (req, res)
{
    res.writeHead(200, { 'Content-Type': 'json' });
    connection.query("SELECT * FROM test_DB", function (error, results, fields)
    {
        if (error) console.log(error);
        res.write(JSON.stringify(results));
        res.end();
    });
});

app.post('/getInfosById', function (req, res)
{
    var post = '';
    req.on('data', function(chunk) 
    {
        post += chunk;
    });
    req.on('end', function () 
    {
        post = querystring.parse(post);
        res.writeHead(200, { 'Content-Type': 'json' });
        if (post.id)
        {
            console.log("id = " + post.id);
            connection.query("SELECT * FROM test_DB WHERE id = " + post.id, function (error, results, fields)
            {
                if (error) console.log(error);
                res.write(JSON.stringify(results));
                res.end();
            });
        }
    });
});

app.get('/', function (req, res)
{
    res.end('Need to have arguments!');
})

var app = app.listen(8080, function ()
{
    var host = app.address().address;
    var port = app.address().port;
    connection.connect();

    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});