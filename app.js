
const Koa = require('koa');
const app = new Koa();
const path = require('path');
const koaBody = require('koa-body');
const router = require('./src/routes')
 
app.use(koaBody(
  { multipart: true }
));

/* Our Routes  */
app.use(router())


// load .env
require('dotenv').config({
  path: path.resolve(__dirname, './.env'),
});


module.exports = app