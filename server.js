const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const TonWeb = require('tonweb');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const tonweb = new TonWeb();
let wallet;

app.post('/create-wallet', (req, res) => {
    try {
        // Генерация ключевой пары
        const keyPair = TonWeb.utils.crypto.generateKeyPair();
        wallet = tonweb.wallet.create({ publicKey: keyPair.publicKey });

        // Возвращаем приватный и публичный ключи
        res.json({
            privateKey: keyPair.secretKey.toString('hex'),
            publicKey: keyPair.publicKey.toString('hex')
        });
    } catch (error) {
        console.error('Ошибка при создании кошелька:', error);
        res.status(500).json({ error: 'Не удалось создать кошелек.' });
    }
});

// Остальные обработчики остаются без изменений...

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
