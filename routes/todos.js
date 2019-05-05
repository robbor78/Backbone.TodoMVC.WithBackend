import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    const todos = await req.context.models.Todos.find();
    return res.send(todos);
});

router.get('/:todoId', async (req, res) => {
    const todo = await req.context.models.Todos.findById(
        req.params.todoId,
    );
    return res.send(todo);
});

router.post('/', async (req, res) => {
    console.log('post');
    const todo = await req.context.models.Todos.create({
        title: req.body.title,
        completed: req.body.completed,
    });

    return res.send(todo);
});

router.put('/:todoId', async (req, res) => {
    console.log('put');
    const todo = req.context.models.Todos.findById(
        req.params.todoId,
        function (err, todo) {
            if (err) {
                res.send(err);
            } else {
                todo.title = req.body.title;
                todo.completed = req.body.completed;

                todo.save(function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(todo);
                    }
                });
            }
        }
    );
});

router.delete('/:todoId', async (req, res) => {
    const todo = await req.context.models.Todos.findById(
        req.params.todoId,
    );

    let result = null;
    if (todo) {
        result = await todo.remove();
    }

    return res.send(todo);
});

export default router;