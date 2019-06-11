var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lectureSchema = new Schema({
  title: {
    type: String
  },
  dayOfWeek: {
    type: Number
  },
  start: {
    type: Date
  },
  end: {
    type: Date
  },
  capacity: {
    type: Number
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student"
    }
  ]
});

module.exports = mongoose.model("Lecture", lectureSchema);
