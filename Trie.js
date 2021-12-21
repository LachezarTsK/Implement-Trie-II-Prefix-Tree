
var Trie = function () {
    this.root = new TrieNode();
    this.ascii_a = 97;

};

class TrieNode {
    constructor() {
        this.branches = new Array(26).fill(null);
        this.numberOfSharedPrefixesForThisNode = 0;
        this.numberOfInstancesForThisWord = 0;
        this.isWord = false;
    }
}

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {

    let current = this.root;
    let size = word.length;

    for (let i = 0; i < size; i++) {
        let ch = word.codePointAt(i);
        if (current.branches[ch - this.ascii_a] === null) {
            current.branches[ch - this.ascii_a] = new TrieNode();
        }

        current = current.branches[ch - this.ascii_a];
        current.numberOfSharedPrefixesForThisNode++;
    }
    current.isWord = true;
    current.numberOfInstancesForThisWord++;
};

/** 
 * @param {string} word
 * @return {number}
 */
Trie.prototype.countWordsEqualTo = function (word) {
    let current = this.root;
    let size = word.length;

    for (let i = 0; i < size; i++) {
        let ch = word.codePointAt(i);
        if (current.branches[ch - this.ascii_a] === null) {
            return 0;
        }
        current = current.branches[ch - this.ascii_a];
    }
    return current.numberOfInstancesForThisWord;
};

/** 
 * @param {string} prefix
 * @return {number}
 */
Trie.prototype.countWordsStartingWith = function (prefix) {
    let current = this.root;
    let size = prefix.length;

    for (let i = 0; i < size; i++) {
        let ch = prefix.codePointAt(i);
        if (current.branches[ch - this.ascii_a] === null) {
            return 0;
        }
        current = current.branches[ch - this.ascii_a];
    }
    return current.numberOfSharedPrefixesForThisNode;
};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.erase = function (word) {
    let current = this.root;
    let size = word.length;

    for (let i = 0; i < size; i++) {
        let ch = word.codePointAt(i);
        if (--current.branches[ch - this.ascii_a].numberOfSharedPrefixesForThisNode > 0) {
            current = current.branches[ch - this.ascii_a];
        } else {
            let temp = current.branches[ch - this.ascii_a];
            current.branches[ch - this.ascii_a] = null;
            current = temp;
        }
    }
    current.numberOfInstancesForThisWord--;
};
