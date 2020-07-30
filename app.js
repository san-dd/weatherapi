var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose=require('mongoose')

var indexRouter = require('./routes/index');

//create database connection
const {MONGO_URI,MONGO_DB_NAME,APPKEY} = require('./config/appConfig');
const uri=`${MONGO_URI}/${MONGO_DB_NAME}`

mongoose.connect(uri,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
let db = mongoose.connection;

// Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
  console.log(err);
});


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//route
app.use('/',indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.end();

});

module.exports = app;

