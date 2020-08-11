const http = require('http');
const https = require('https');
const fs = require('fs');
const Koa = require('koa');
const koaBody = require('koa-body');

const authRouter = require('./authRouter');
const resourceRouter = require('./resourceRouter');
const logger = require('./utils');

const app = new Koa();

app.use(koaBody());

app.use(logger());

app.use(authRouter.routes());
app.use(resourceRouter.routes());

http.createServer(app.callback()).listen(3001);

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
}, app.callback()).listen(3000);
