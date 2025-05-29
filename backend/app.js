var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const estudiantesRouter = require('./routes/estudiantes');
const docentesRouter = require('./routes/docentes');
const gruposRouter = require('./routes/grupos');
const asignaturasRouter = require('./routes/asignaturas');
const asistenciasRouter = require('./routes/asistencias');
const evaluacionesRouter = require('./routes/evaluaciones');
const authRouter = require('./routes/auth');

var app = express();
const db = require('./db');

// Initialize database connection pool
db.initialize();
const cors = require('cors');
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
const verifyToken = require('./middleware/authMiddleware');
app.use('/estudiantes', verifyToken, estudiantesRouter);
app.use('/docentes', verifyToken, docentesRouter);
app.use('/grupos', verifyToken, gruposRouter);
app.use('/asignaturas', verifyToken, asignaturasRouter);
app.use('/asistencias', verifyToken, asistenciasRouter);
app.use('/evaluaciones', verifyToken, evaluacionesRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
