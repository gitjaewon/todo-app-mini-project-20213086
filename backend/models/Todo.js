const mongoose = require('mongoose');

// 자바의 @Entity 클래스와 필드 정의라고 보시면 됩니다.
const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // @Column(nullable = false)
  },
  content: {
    type: String,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Todo', TodoSchema);