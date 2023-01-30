const http = require('http');

const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/':
            res.write('Hello World');
            res.end();
            break;
        case '/api/courses':
            res.write(JSON.stringify([1, 2, 3]));
            res.end();
            break;
        default:
            res.write('Not Found');
            res.end();
    }
})

server.listen(3000);
console.log('Listening on port 3000...');