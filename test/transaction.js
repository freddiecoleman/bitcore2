var Varint = require('../lib/varint');
var Transaction = require('../lib/transaction');
var Txin = require('../lib/txin');
var Txout = require('../lib/txout');
var should = require('chai').should();
var BufferReader = require('../lib/bufferreader');
var BufferWriter = require('../lib/bufferwriter');

describe('Transaction', function() {

  it('should make a new transaction', function() {
    var tx = new Transaction();
    should.exist(tx);
    tx = Transaction();
    should.exist(tx);
  });

  var txin = Txin().fromBuffer(new Buffer('00000000000000000000000000000000000000000000000000000000000000000000000001ae00000000', 'hex'));
  var txout = Txout().fromBuffer(new Buffer('050000000000000001ae', 'hex'));
  var tx = Transaction().set({
    version: 0,
    txinsvarint: Varint(1),
    txins: [txin],
    txoutsvarint: Varint(1),
    txouts: [txout],
    nlocktime: 0
  });
  var txhex = '000000000100000000000000000000000000000000000000000000000000000000000000000000000001ae0000000001050000000000000001ae00000000';
  var txbuf = new Buffer(txhex, 'hex');

  var tx2idhex = '8c9aa966d35bfeaf031409e0001b90ccdafd8d859799eb945a3c515b8260bcf2';
  var tx2hex = '01000000029e8d016a7b0dc49a325922d05da1f916d1e4d4f0cb840c9727f3d22ce8d1363f000000008c493046022100e9318720bee5425378b4763b0427158b1051eec8b08442ce3fbfbf7b30202a44022100d4172239ebd701dae2fbaaccd9f038e7ca166707333427e3fb2a2865b19a7f27014104510c67f46d2cbb29476d1f0b794be4cb549ea59ab9cc1e731969a7bf5be95f7ad5e7f904e5ccf50a9dc1714df00fbeb794aa27aaff33260c1032d931a75c56f2ffffffffa3195e7a1ab665473ff717814f6881485dc8759bebe97e31c301ffe7933a656f020000008b48304502201c282f35f3e02a1f32d2089265ad4b561f07ea3c288169dedcf2f785e6065efa022100e8db18aadacb382eed13ee04708f00ba0a9c40e3b21cf91da8859d0f7d99e0c50141042b409e1ebbb43875be5edde9c452c82c01e3903d38fa4fd89f3887a52cb8aea9dc8aec7e2c9d5b3609c03eb16259a2537135a1bf0f9c5fbbcbdbaf83ba402442ffffffff02206b1000000000001976a91420bb5c3bfaef0231dc05190e7f1c8e22e098991e88acf0ca0100000000001976a9149e3e2d23973a04ec1b02be97c30ab9f2f27c3b2c88ac00000000';
  var tx2buf = new Buffer(tx2hex, 'hex');

  describe('#set', function() {

    it('should set all the basic parameters', function() {
      var tx = Transaction().set({
        version: 0,
        txinsvarint: Varint(1),
        txins: [txin],
        txoutsvarint: Varint(1),
        txouts: [txout],
        nlocktime: 0
      });
      should.exist(tx.version);
      should.exist(tx.txinsvarint);
      should.exist(tx.txins);
      should.exist(tx.txoutsvarint);
      should.exist(tx.txouts);
      should.exist(tx.nlocktime);
    });

  });

  describe('#fromBuffer', function() {
    
    it('should recover from this known tx', function() {
      Transaction().fromBuffer(txbuf).toBuffer().toString('hex').should.equal(txhex);
    });

    it('should recover from this known tx from the blockchain', function() {
      Transaction().fromBuffer(tx2buf).toBuffer().toString('hex').should.equal(tx2hex);
    });

  });

  describe('#fromBufferReader', function() {
    
    it('should recover from this known tx', function() {
      Transaction().fromBufferReader(BufferReader(txbuf)).toBuffer().toString('hex').should.equal(txhex);
    });

  });

  describe('#toBuffer', function() {
    
    it('should produce this known tx', function() {
      Transaction().fromBuffer(txbuf).toBuffer().toString('hex').should.equal(txhex);
    });

  });

  describe('#toBufferWriter', function() {
    
    it('should produce this known tx', function() {
      Transaction().fromBuffer(txbuf).toBufferWriter().concat().toString('hex').should.equal(txhex);
    });

  });

});
