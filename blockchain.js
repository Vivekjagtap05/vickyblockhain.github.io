// Blockchain Class
class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.logo = this.assignLogo(); // Assign logo to each block
  }

  calculateHash() {
    return btoa(
      this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash
    );
  }

  assignLogo() {
    const logos = [
      'ethereum.png',
      'bitcoin.png',
      'shiba.png',
    ];
    return logos[Math.floor(Math.random() * logos.length)];
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, new Date().toLocaleString(), "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}

// Initialize Blockchain
const myBlockchain = new Blockchain();

// DOM Elements
const blockchainDiv = document.getElementById('blockchain');
const addBlockButton = document.getElementById('addBlock');

// Render Blockchain
function renderBlockchain() {
  blockchainDiv.innerHTML = ''; // Clear previous blocks
  myBlockchain.chain.forEach(block => {
    const blockDiv = document.createElement('div');
    blockDiv.classList.add('block');
    blockDiv.innerHTML = `
      <img src="${block.logo}" alt="Crypto Logo">
      <p><strong>Index:</strong> ${block.index}</p>
      <p><strong>Timestamp:</strong> ${block.timestamp}</p>
      <p><strong>Data:</strong> ${JSON.stringify(block.data)}</p>
      <p><strong>Previous Hash:</strong> <span class="hash">${block.previousHash}</span></p>
      <p><strong>Hash:</strong> <span class="hash">${block.hash}</span></p>
    `;
    blockchainDiv.appendChild(blockDiv);
  });
}

// Add Block on Button Click
addBlockButton.addEventListener('click', () => {
  const newBlockData = { amount: Math.floor(Math.random() * 100) + 1 }; // Random data
  myBlockchain.addBlock(new Block(
    myBlockchain.chain.length,
    new Date().toLocaleString(),
    newBlockData
  ));
  renderBlockchain();
});

// Initial Render
renderBlockchain();
