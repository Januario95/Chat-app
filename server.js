const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:false
}));
app.use(express.static(__dirname + '/public'));

const http = require('http').Server(app);
const io = require('socket.io')(http);

const messages = [
	{ name: 'Tim', message: 'Yo' },
	{ name: 'Pam', message: 'Hi' }
];

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

app.post('/message', (req, res) => {
	console.log(req.body);
	messages.push(req.body);
	io.emit("message", req.body);
	res.sendStatus(200);
})

app.get('/messages', (req, res) => {
	res.json(messages);
})

const server = http.listen(3000, () => {
	const { port } = server.address();
	console.log(`app listening on port ${port}`);
});

