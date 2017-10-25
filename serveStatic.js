var static = require('node-static');

var file = new static.Server('./dist');
const PORT = process.env.PORT || "4200";

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    }).resume();
}).listen(PORT);
