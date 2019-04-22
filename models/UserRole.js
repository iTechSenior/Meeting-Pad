const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const UserRoleSchema = new Schema({
    name: {
        type: String,
        required: [true, 'User role name is missing!'],
        // enum: ['Unit', 'Organizer', 'Presenter'],
        unique: true
    }
}, {
        timestamps: true
    });

UserRoleSchema.plugin(uniqueValidator, {
    message: ({ path, value }) => {
        if (path == 'name') return 'UserRole already exists.'
    }
});

UserRoleSchema.post('save', async function (err, doc, next) {
    const error = [];
    if (err.name == 'ValidationError') {
        for (const a in err.errors) error.push(err.errors[a].message)
        return next(error)
    }
    else return next(err)
});

module.exports = mongoose.model('UserRole', UserRoleSchema);