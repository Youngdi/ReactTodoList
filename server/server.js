// require('../lib/db');
// import fs from 'fs';
// import path from 'path';
// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import webpack from 'webpack';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
// const user = mongoose.model('user');
// const app = express();
// const config = require('../webpack.config.js');
// const compiler = webpack(config);

// app.set('port', (process.env.PORT || 8080));

// app.use(express.static('../client'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
// app.use(webpackHotMiddleware(compiler));
// // Additional middleware which will set headers that we need on each request.
// // app.use('/', function(req, res){
// //     res.sendFile(path.resolve('client/index.html'));
// // });
// app.use(function(req, res, next) {
//     // Set permissive CORS header - this allows this server to be used only as
//     // an API server in conjunction with something like webpack-dev-server.
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Disable caching so we'll always get the latest comments.
//     res.setHeader('Cache-Control', 'no-cache');
//     next();
// });


// app.get('/api/comments', function(req, res) {
//     console.log('user list redener');
//     user.find({}).sort({
//         id: 1
//     }).exec(function(err, userData) {
//         if (err) {
//             console.log(err);
//         }
//         res.send({
//             userData: userData
//         });
//         res.end();
//     });
// });
// app.post('/api/delete', function(req, res) {
//     user.remove({ id: req.body.id }, function(err, result) { //undefined??
//         if (err) return res.status(500).send({ err: 'Error: Could not delete user' });
//         if (!result) return res.status(400).send({ err: 'User bot deleted from firebase database' });
//         console.log('deleted!!!');
//     });
//     res.end();
// });
// app.post('/api/comments', function(req, res) {
//     new user({
//         id: Date.now(),
//         name: req.body.data.author,
//         text: req.body.data.text
//     }).save(function(err, user, count) {
//         if (err) {
//             console.log('err');
//         }
//     });
//     res.end();
// });
// app.post('/api/update', function(req, res) {
//     user.findOneAndUpdate({ id: req.body.data.id }, { $set: { name: req.body.data.author, text:req.body.data.text  } }, { new: true }, function(err, doc) {
//         if (err) {
//             console.log('Something wrong when updating data!');
//         }
//         console.log(doc);
//     });
//     res.end();
// });
// app.listen(app.get('port'), function() {
//     console.log('Server started: http://localhost:' + app.get('port') + '/');
// });
