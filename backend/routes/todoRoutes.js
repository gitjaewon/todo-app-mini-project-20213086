const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo'); // 아까 만든 Entity(Model) 가져오기

// 1. 모든 할 일 조회 (GET) - Java의 @GetMapping
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find(); // repository.findAll()과 같음
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: "데이터 조회 실패" });
    }
});

// 2. 새로운 할 일 추가 (POST) - Java의 @PostMapping
router.post('/', async (req, res) => {
    // req.body는 @RequestBody와 같습니다.
    const todo = new Todo({
        title: req.body.title,
        content: req.body.content
    });

    try {
        const newTodo = await todo.save(); // repository.save(todo)와 같음
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: "데이터 저장 실패" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        // 1. URL 파라미터에서 ID를 가져와 DB에서 찾음 (findById)
        const todo = await Todo.findById(req.params.id);
        
        if (!todo) {
            return res.status(404).json({ message: "항목을 찾을 수 없습니다." });
        }

        // 2. 현재 상태를 반전 (true -> false, false -> true)
        todo.isCompleted = !todo.isCompleted;

        // 3. 변경된 내용을 저장
        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: "상태 변경 실패", error: err.message });
    }
});

// 4. 항목 삭제 (DELETE) - 자바의 @DeleteMapping("/{id}")
router.delete('/:id', async (req, res) => {
    try {
        // findByIdAndDelete를 쓰면 한 번에 찾아서 삭제까지 가능합니다.
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