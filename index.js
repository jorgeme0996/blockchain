const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v1: uuid } = require('uuid');
const os = require('os');

const hostname = os.hostname();
console.log(hostname);
const Blockchain = require('./dev/blockchain');

const app = express();
const blockchain = new Blockchain();

const nodeAddress = uuid().split('-').join('');
const PORT = process.env.PORT || process.argv[2];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.get('/', (req, res)=> {
    res.json({message: 'Welcome!!!'})
})

app.get('/ip', (req, res)=> {
    const ip = (req.headers['x-forwarded-for'] || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress || 
    req.connection.socket.remoteAddress).split(",")[0];
    const host = req.headers.host
    res.json({ip, host})
})

app.get('/blockchain', (req, res)=> {
    res.json(blockchain);
})

app.post('/transaction', async(req, res)=> {
    const blockIndex = await blockchain.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    res.json({blockIndex})
})

app.get('/mine', (req, res)=> {
    const lastBlock = blockchain.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transaction: blockchain.pendingTransactions,
        index: lastBlock['index'] + 1
    }
    const nonce = blockchain.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = blockchain.hashBlock(previousBlockHash, currentBlockData, nonce);

    blockchain.createNewTransaction(12.5, "00", nodeAddress);

    const newBlock = blockchain.createNewBlock(nonce, previousBlockHash, blockHash);

    res.json({
        block: newBlock
    })
})

app.listen(PORT, ()=> {
    console.log(`Listenning on port ${PORT}`);
})