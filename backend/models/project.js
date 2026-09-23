const mongoose = require('mongoose');

//Define the Project schema
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim : true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'User',
        required: false,
    }],
},
    {timestamps: true,}
)

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;

