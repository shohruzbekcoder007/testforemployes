const Joi = require('joi');
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    correct_answer: {
        type: Number,
        required: true
    }
});

const Result = mongoose.model('results', resultSchema);

function validateResult(result) {
    const schema = Joi.object({
        answer_text: Joi.string().min(1).required(),
    });

    return schema.validate(result);
}

exports.Result = Result;
exports.validate = validateResult;