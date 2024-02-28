const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: ['https://localhost:5173', 'https://localhost:3001'],
	})
);

app.post('/api/set-cookie', (req, res) => {
	const { list } = req.body;

	// Ustawienie ciasteczka secure
	res.cookie('mySecureCookie', 'cookieValue', { secure: true, httpOnly: true });

	res.json({ list });
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
