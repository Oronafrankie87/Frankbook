const {Schema, model, Types} = require ('mongoose');


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdOn: {
      type: Date,
      default: Date.now,
      get: (timestamp) => timestamp.toLocaleString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);





const reactSchema = new Schema(

  {
    reactId:  {
      type: Schema.types.OjectId,
      default: () => new Types.ObjectId(),
    },
    reactBody: {
      type: String,
      required: true,
      maxlength:280
    },
    username: {
      type: String,
      required: true
    },
    createOn: {
      type: Date,
      default: Date.now,
      get: (timestamp)=> timestamp.toLocalStorage()
    }

  },

  {
    toJSON: {
      getters:true,
    },
  
  }
);

thoughtSchema.virtual('recationCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
module.exports = Thoughts;