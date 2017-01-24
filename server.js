const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const fs = require('fs');
// const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.config.js');
require('./lib/db');

const User = mongoose.model('user');
const app = express();
const compiler = webpack(config);

app.set('port', (process.env.PORT || 8081));

app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
// Additional middleware which will set headers that we need on each request.
// app.use('/', function(req, res){
//     res.sendFile(path.resolve('client/index.html'));
// });
app.use((req, res, next) => {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*');
    // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache');
  next();
});


app.get('/api/comments', (req, res) => {
  User.find({}).sort({
    id: 1,
  }).exec((err, userDataList) => {
    if (err) {
      console.log(err);
    }
    res.send({
      userData: userDataList,
    });
    res.end();
  });
});
app.post('/api/delete', (req, res) => {
  User.remove({ id: req.body.id }, (err, result) => {
    if (err) return res.status(500).send({ err: 'Error: Could not delete user' });
    if (!result) return res.status(400).send({ err: 'User bot deleted from firebase database' });
    return console.log('deleted!!!');
  });
  res.end();
});
app.post('/api/comments', (req, res) => {
  new User({
    id: Date.now(),
    name: req.body.data.author,
    text: req.body.data.text,
  }).save((err) => {
    if (err) console.log('err');
  });
  res.end();
});
app.post('/api/update', (req, res) => {
  User.findOneAndUpdate({ id: req.body.data.id }, { $set:
    { name: req.body.data.author, text: req.body.data.text } },
    { new: true }, (err, doc) => {
      if (err) console.log('Something wrong when updating data!');
      console.log(doc);
    });
  res.end();
});
app.listen(app.get('port'), () => {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
