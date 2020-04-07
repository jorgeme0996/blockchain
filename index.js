const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');
const cors = require('cors')

const trackIp = require('./dev/trackLocation');
const Blockchain = require('./dev/blockchain');

const app = express();
const blockchain = new Blockchain();

const nodeAddress = uuid().split('-').join('');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.get('/', (req, res)=> {
    res.json({message: 'Welcome!!!'})
})

app.get('/test', (req, res)=> {
    const ipInfo = req.ip;
    const GodEyes = trackIp(ipInfo)
    console.log(ipInfo, GodEyes);

    res.json({ipInfo, GodEyes})
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

    blockchain.createNewTransaction(12.5, "00", )

    const newBlock = blockchain.createNewBlock(nonce, previousBlockHash, blockHash);

    res.json({
        block: newBlock
    })
})

app.listen(PORT, ()=> {
    console.log(`Listenning on port ${PORT}`);
})