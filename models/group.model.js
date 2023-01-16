const Joi = require('joi')
const mongoose = require('mongoose')

const GroupSchema = new mongoose.Schema({
  group_name: {
    type: String,
    required: true,
    minlength: 3
  }
});

const Group = mongoose.model('groups', GroupSchema);

function validateGroup(answer) {
  const schema = Joi.object({
    group_name: Joi.string().min(3).required(),
  });

  return schema.validate(answer);
}

exports.Group = Group;
exports.validate = validateGroup;