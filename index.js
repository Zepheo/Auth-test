const http = require('http');
const https = require('https');
const fs = require('fs');
const Koa = require('koa');
const koaBody = require('koa-body');

const authRouter = require('./routes/authRouter');
const resourceRouter = require('./routes/resourceRouter');
const { logger } = require('./middleware/logger');
const { mongoose } = require('./db');
const dbConfig = require('./db/config');
const initiateRoles = require('./utils/initiateRoles');

const HTTP_PORT = 3001;
const HTTPS_PORT = 3000;

const app = new Koa();

app.use(logger());
app.use(koaBody());

app.use(authRouter.routes());
app.use(resourceRouter.routes());

mongoose
  .connect(`mongodb+srv://${dbConfig.HOST}/${dbConfig.DB}?${dbConfig.OPTIONS}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connected to Atlas');
    initiateRoles();
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });

http.createServer(app.callback()).listen(HTTP_PORT, () => console.log(`Http server listening on ${HTTP_PORT}`));

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
}, app.callback()).listen(HTTPS_PORT, () => console.log(`Https server listening on ${HTTPS_PORT}`));
