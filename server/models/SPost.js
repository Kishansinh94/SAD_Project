const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema ({
    uid: String,
    text: String,
    name: String,
    email : String,
    createdAt : String
},
    {
        collection:'posts'
    }
)

const SPost = mongoose.model('Post', PostSchema);

module.exports= SPost;