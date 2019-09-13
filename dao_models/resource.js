
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceModel = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        index: { unique: true }
    },
    context: {
        type: String,
        required: true
    },
    iprange: {
        type: Array
    },
    location: {
        type: String,
        lowercase: true
    }
}, { collection: 'Resources' });

resourceModel.methods.toJSON = function () {
    let obj = this.toObject();
    return obj;
};
resourceModel.methods.toReturnContext = function () {
    let obj = this.toObject();
    return {context: obj.context};
};

module.exports = mongoose.model('Resource', resourceModel);