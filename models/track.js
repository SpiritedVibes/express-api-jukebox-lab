const mongoose = require('mongoose')

const trackSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    }
})

const Track = mongoose.model(`Track`, trackSchema)

module.exports = Track