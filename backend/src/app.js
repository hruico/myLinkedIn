import express from 'express';
import jwt from 'jsonwebtoken';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.static('/home/vihaan/Desktop/Projects/linkedIn-Clone/frontend'));

const users = []

app.get('/feed', (req, res) => {
    res.send('Working!');
})

app.get('/', (req, res) => {
    res.json({
        message: "App working!"
    })
})

app.get('/signup', (req, res) => {
    res.status(200).sendFile('/home/vihaan/Desktop/Projects/linkedIn-Clone/frontend/signUp.html');

})

app.get('/signin', (req, res) => {
    res.status(200).sendFile('/home/vihaan/Desktop/Projects/linkedIn-Clone/frontend/signIn.html')
})

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = users.find(user => user.username === username);

    if (userExists) {
        res.status(403).json({
            message: "User already exists"
        })
        return;
    }

    users.push({ username, password });

    res.json({
        message: "You have signed up"
    })
})

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const validUserExists = users.find(user => user.username === username && user.password === password);

    if (!validUserExists) {
        res.status(403).json({
            message: "Invalid Credentials. User Not found"
        })
        return;
    }

    const token = jwt.sign({
        username: username
    }, "someGiberrish!@#1");

    res.json({
        token: token
    })

})

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT} `)
});