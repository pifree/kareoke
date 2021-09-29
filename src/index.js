require('./routes/auth/strategies/discord')
require('dotenv').config()

const passport = require('passport')
const app = require('express')()
const chalk = require('chalk')

const utils = require('./utils')
const log = console.log

app.listen(process.env.PORT || 3000, async () => {
    log(chalk.green(`[API SERVER] Server started listening on port ${process.env.PORT || 3000}`))
    log(chalk.green(`[API SERVER] Trying to connect mongodb...`))
    try {
        await require('./database/connect')()
        log(chalk.green(`[API SERVER] Connected to mongodb`))
    } catch (error) {
        log(chalk.red(`[API SERVER] An error occurred while trying to connect`))
        utils.error(error)
    }
})
app.use(require('express-session')({
    secret: 'uysalibov-pifree-lbarcl',
    cookie: {
        maxAge: 86400000
    },
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(utils.request(app))
app.use(require('cors')())

app.use('/', require('./routes/api'))
app.use('/auth', require('./routes/auth'))
