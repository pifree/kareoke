const mongoose = require('mongoose');
const user = require('./schemes/user')
const songInfo = require('./schemes/song-info')
const projects = require('./schemes/projects')

class db {
    constructor(URL, Options) {
        this.URL = URL || process.env.DB_URL;
        if(!this.URL) throw 'There is not a provided database URL'
        this.Options = Options || {};
        this.Schema = 'test';
    }

    async connect() {
        await mongoose.connect(this.URL, this.Options);
        return mongoose;
    }

    async findOne(query) {
        await this.connect()
        let result = await this.Schema.findOne(query).catch(err => { return err })
        mongoose.connection.close()
        return result
    }

    async findOneAndUpdate(query, update) {
        await this.connect()
        let result = await this.Schema.findOneAndUpdate(query, update).catch(err => { return err })
        mongoose.connection.close()
        return result
    }

    async findOneAndRemove(query) {
        await this.connect()
        let result = await this.Schema.findOneAndRemove(query).catch(err => { return err })
        mongoose.connection.close()
        return result
    }

    async find(query) {
        await this.connect()
        let result = await this.Schema.find(query).catch(err => { return err })
        mongoose.connection.close()
        return result
    }

    async findById(id) {
        await this.connect()
        let result = await this.Schema.findById(id).catch(err => { return err })
        mongoose.connection.close()
        return result
    }

    async findByIdAndUpdate(id, update) {
        await this.connect()
        let result = await this.Schema.findByIdAndUpdate(id, update).catch(err => { return err })
        mongoose.connection.close()
        return result
    }

    async findByIdAndRemove(id) {
        await this.connect()
        let result = await this.Schema.findByIdAndRemove(id).catch(err => { return err })
        mongoose.connection.close()
        return result
    }

    async aggregate(query) {
        await this.connect()
        let result = await this.Schema.aggregate(query).catch(err => { return err })
        mongoose.connection.close()
        return result
    }

    async save(data) {
        await this.connect()
        let result = await this.Schema(data).save().catch(err => { return err })
        mongoose.connection.close()
        return result
    }
}

module.exports = {
    db,
    user,
    songInfo,
    projects
}