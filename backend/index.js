const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB 연결 성공'))
    .catch(err => console.error('DB 연결 에러:', err));

app.get('/', (req, res) => {
    res.send('백엔드 정상 작동 중');
});

app.use('/api/todos', todoRoutes);

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log('서버 시작 포트:', PORT);
    });
}

module.exports = app;
