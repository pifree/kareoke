const passport = require('passport')
const DiscordStrategy = require('passport-discord')
const UserSchema = require('../../../database/schemes/user')

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserSchema.findById(id)
        if (user) {
            done(null, user)
        } else {
            done(null, null)
        }
    } catch (error) {
        console.log(error)
        return done(error, null)
    }
})
passport.use(
    new DiscordStrategy({
        clientID: '839132865790476357',
        clientSecret: '43pFX7T-UsAYZp4ZN5GGv01iORRE-M92',
        callbackURL: '/auth/discord/redirect',
        scope: [ 'identify', 'email' ]
      }, async (asccessToken, refresToken, profile, done) => {
        const { id, username, discriminator, avatar, email } = profile
        try {
            const tempdata = {
                '_id': id,
                'email': email,
                'avatar': avatarURL(avatar, id),
                'discordTag': username + ':' + discriminator
            }
            let user = await UserSchema.findById(id)
            if (user) {
                user = await UserSchema.findByIdAndUpdate(id, tempdata)
                return done(null, user)
            } else {
                user = await UserSchema(tempdata).save()
                return done(null, user)
            }
        } catch (error) {
            return done(error, null)
        }
    })
)

function avatarURL(hash, id) {
    return `https://cdn.discordapp.com/avatars/${id}/${hash}.jpg?size=64`
}