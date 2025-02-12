class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  searchPrefix(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) return [];
      node = node.children[char];
    }
    return this._getWordsFromNode(prefix, node);
  }

  _getWordsFromNode(prefix, node, words = []) {
    if (node.isEndOfWord) words.push(prefix);
    for (let char in node.children) {
      this._getWordsFromNode(prefix + char, node.children[char], words);
    }
    return words;
  }
}

module.exports = Trie;
