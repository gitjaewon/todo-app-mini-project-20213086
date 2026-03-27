const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
require('dotenv').config();

const app = express();

let connectionPromise;

app.use(cors()); 
app.use(express.json());

const connectToDatabase = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(process.env.MONGODB_URI)
            .then((connection) => {
                console.log('MongoDB 연결 성공');
                return connection;
            })
            .catch((err) => {
                connectionPromise = undefined;
                console.error('DB 연결 에러:', err);
                throw err;
            });
    }

    return connectionPromise;
};

app.get('/', (req, res) => {
    res.send('백엔드 정상 작동 중');
});

app.use('/api/todos', todoRoutes);

if (require.main === module) {
    const PORT = process.env.PORT || 5000;

    connectToDatabase()
        .then(() => {
            app.listen(PORT, () => {
                console.log('서버 시작 포트:', PORT);
            });
        })
        .catch(() => {
            process.exit(1);
        });
}

module.exports = {
    app,
    connectToDatabase
};
