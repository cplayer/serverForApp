var http = require("http")
var url = require("url")

var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "serverDB"
});

function start ()
{
    function onRequest(request, response)
    {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Test!");
        response.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log("Started..");
    connection.connect();
    connection.query("SELECT * FROM test_DB", function (error, results, fields)
    {
        if (error) console.log(error);
        console.log("The Result is:");
        console.log(results);
    })
}

start();
console.log("Server running at 8888...");