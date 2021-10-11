const express = require('express');
const app = express();

const chalk = require('chalk');
const cors = require('cors');
if (process.env.ENV != 'production') require('dotenv').config();

app.listen(process.env.PORT, () => { console.log(chalk.greenBright('[API] Started listening on ' + process.env.PORT)) })

app.use(cors())
app.use(require('./utils/reqCheck'))
app.use('/', require('./routes'))