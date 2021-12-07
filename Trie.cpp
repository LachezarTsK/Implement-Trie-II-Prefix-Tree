
using namespace std;

class TrieNode {
public:
	int numberOfSharedPrefixesForThisNode = 0;
	int numberOfInstancesForThisWord = 0;
	bool isWord = false;
	TrieNode* branches[26] = { nullptr };//26 letters in alphabet.
};

class Trie {
public:

	TrieNode* root;

	Trie() {
		root = new TrieNode();
	}

	void insert(string word) {
		TrieNode* current = root;
		int size = word.length();

		for (int i = 0; i < size; i++) {
			char ch = word[i];
			if (current->branches[ch - 'a'] == nullptr) {
				current->branches[ch - 'a'] = new TrieNode();
			}

			current = current->branches[ch - 'a'];
			current->numberOfSharedPrefixesForThisNode++;
		}
		current->isWord = true;
		current->numberOfInstancesForThisWord++;
	}

	int countWordsEqualTo(string word) {
		TrieNode* current = root;
		int size = word.length();

		for (int i = 0; i < size; i++) {
			char ch = word[i];
			if (current->branches[ch - 'a'] == nullptr) {
				return 0;
			}
			current = current->branches[ch - 'a'];
		}
		return current->numberOfInstancesForThisWord;
	}

	int countWordsStartingWith(string prefix) {
		TrieNode* current = root;
		int size = prefix.length();

		for (int i = 0; i < size; i++) {
			char ch = prefix[i];
			if (current->branches[ch - 'a'] == nullptr) {
				return 0;
			}
			current = current->branches[ch - 'a'];
		}
		return current->numberOfSharedPrefixesForThisNode;
	}

	void erase(string word) {
		TrieNode* current = root;
		int size = word.length();//n,jvo

		for (int i = 0; i < size; i++) {
			char ch = word[i];
			if (--current->branches[ch - 'a']->numberOfSharedPrefixesForThisNode > 0) {
				current = current->branches[ch - 'a'];
			}
			else {
				TrieNode* temp = current->branches[ch - 'a'];
				current->branches[ch - 'a'] = nullptr;
				current = temp;
			}
		}
		current->numberOfInstancesForThisWord--;
	}
};
