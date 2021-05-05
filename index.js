require('dotenv').config()
require('./strategies/discord')

const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')
const session = require('express-session')
const Store = require('connect-mongo')(session)

const app = express()
const port = process.env.PORT || 3000
mongoose.connect(process.env.DB_URL, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});


app.use(session({
    secret: 'uysalibov-pifree-lbarcl',
    cookie: {
        maxAge: 86400000
    },
    resave: false,
    saveUninitialized: false,
    store: new Store({mongooseConnection: mongoose.connection}),
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.sendStatus(200)
})
app.use('/v1', require('./routes/vone/index'))
app.listen(port, () => { console.log(`http://localhost:${port}`) })