// Create web server
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var path = require('path');
var commentsFilePath = path.join(__dirname, 'comments.json');

// Use body-parser to parse POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public folder
app.use(express.static('public'));

// Load comments from file
function loadComments() {
  try {
    return JSON.parse(fs.readFileSync(commentsFilePath, 'utf8'));
  } catch (err) {
    console.log('Error reading comments file:', err);
    return [];
  }
}

// Save comments to file
function saveComments(comments) {
  try {
    fs.writeFileSync(commentsFilePath, JSON.stringify(comments, null, 2));
  } catch (err) {
    console.log('Error writing comments file:', err);
  }
}

// GET /comments - return comments as JSON
app.get('/comments', function(req, res) {
  res.json(loadComments());
});

// POST /comments - add a new comment
app.post('/comments', function(req, res) {
  var comments = loadComments();
  var newComment = {
    id: Date.now(),