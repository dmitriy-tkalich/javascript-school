var jsonServer = require('json-server');
var multer = require('multer');
var express = require('express');
var path = require('path');
var crypto = require('crypto');

var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
var storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err);

      cb(null, raw.toString('hex') + path.extname(file.originalname));
    });
  }
});
var upload = multer({ storage: storage });

server.use(middlewares);
server.use('/uploads', express.static('uploads'));

server.post('/upload-avatar', upload.single('avatar'), function (req, res, next) {
  try {
    var profile = router.db.get('profiles').find({ id: parseInt(req.query.userId) }).set('avatar', req.file.path).value();
    res.json({
      avatar: req.file.path
    });
  } catch(err) {
    res.error(err);
  }
});

server.use(router);

var port = process.env.PORT || 3000;
server.listen(port, function () {
  console.log('JSON Server is running on port ' + port);
});
