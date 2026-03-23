const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: "데이터 조회 실패" });
    }
});

router.post('/', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        content: req.body.content
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: "데이터 저장 실패" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        
        if (!todo) {
            return res.status(404).json({ message: "항목을 찾을 수 없습니다." });
        }

        todo.isCompleted = !todo.isCompleted;

        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: "상태 변경 실패", error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

        if (!deletedTodo) {
            return res.status(404).json({ message: "삭제할 항목이 없습니다." });
        }

        res.json({ message: "삭제 성공", id: req.params.id });
    } catch (err) {
        res.status(500).json({ message: "삭제 실패", error: err.message });
    }
});

module.exports = router;
