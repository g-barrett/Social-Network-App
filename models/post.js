const { Schema, Types, mongoose } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {type: Schema.Types.ObjectId, default: () => new Types.ObjectId(), },
    reactionBody: {type: String, required: true, maxLength: 280},
    username: {type: String, required: true},
    createdAt: {type: Date, default: Date.now }

});

const postSchema = new Schema({
    postText: {type: String, required: true, minLength: 1, maxLength: 280},
    createdAt: {type: Date, default: Date.now},
    username: {type: String, required: true},
    reactions: [reactionSchema],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

postSchema.virtual('reactionCount')
  .get(function () {return `${this.reactions.length}`})
  .set(function (value) {
    const reactionCount = value;
    this.set({reactionCount});
  });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;