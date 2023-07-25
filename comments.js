// Create web server, listen on port 8080
// Send "Hello World" for requests to the root URL (/)

var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var comments = [];

var app = http.createServer(function(req, res) {
  var url_parts = url.parse(req.url, true);

  if (req.method == 'POST') {
    var body = '';
    req.on('data', function(data) {
      body += data;
    });
    req.on('end', function() {
      var post = qs.parse(body);
      comments.push(post.comment);
      showForm(res);
    });
  } else {
    showForm(res);
  }
});

function showForm(res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<html><head><title>Comment Form</title></head>');
  res.write('<body><h1>Comment Form</h1>');
  res.write('<form method="post">');
  res.write('<textarea name="comment"></textarea><br/>');
  res.write('<input type="submit" />');
  res.write('</form>');

  if (comments.length > 0) {
    res.write('<h2>Comments</h2>');
    comments.forEach(function(comment) {
      res.write('<p>' + comment + '</p>');
    });
  }

  res.end('</body></html>');
}

app.listen(8080);
console.log('Server running at http://localhost:8080');