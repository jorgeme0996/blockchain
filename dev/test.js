const Blockchain = require('./blockchain')

const bitcoin = new Blockchain();

const previusBlockHash = 'QWERTYUIOPASDFGHJKL4521'
const currentBlockData = [
    {
        amount: 101,
        sender: 'NOUIJQOWQWFDWSDL',
        recipient: 'UW8JWEO8IWOE'
    },
    {
        amount: 30,
        sender: 'NOUIJQOWQWFDWSDL',
        recipient: 'UW8JWEO8IWOE'
    },
    {
        amount: 200,
        sender: 'NOUIJQOWQWFDWSD7',
        recipient: 'UW8JWEO8IWOL'
    }
]

console.log(bitcoin.proofOfWork(previusBlockHash, currentBlockData))