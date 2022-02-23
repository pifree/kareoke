const express = require('express');
const app = express();

const chalk = require('chalk');
const cors = require('cors');
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
if (process.env.ENV != 'production') {
    require('dotenv').config();
} else {
    Sentry.init({
        dsn: process.env.SENTRY,
        release: require('../package.json').name + '@' + require('../package.json').version,  
        tracesSampleRate: 1.0,
        integarations: [
            new Sentry.Integrations.Http({ tracing: true }),
            new Tracing.Integrations.Express({app})
        ]
    });
}

app.listen(process.env.PORT, () => { console.log(chalk.greenBright('[API] Started listening on ' + process.env.PORT)) })
app.use(Sentry.Handlers.requestHandler({
    request: false,
    user: false,
    ip: true
}));
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());
app.use(cors())
app.use(require('./utils/reqCheck'))
app.use('/', require('./routes'))