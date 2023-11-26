const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// 使用 body-parser 中間件處理 POST 資料
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 靜態檔案放在 public 資料夾
app.use(express.static('public'));

// 儲存投稿的陣列（暫時存在記憶體中）
const posts = [];

// 處理投稿
app.post('/submit', (req, res) => {
    const submissionText = req.body.text;
    if (submissionText) {
        posts.push(submissionText);
        res.status(201).send({ message: 'Submission successful' });
    } else {
        res.status(400).send({ message: 'Invalid submission' });
    }
});

// 取得所有投稿
app.get('/posts', (req, res) => {
    res.send({ posts });
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
