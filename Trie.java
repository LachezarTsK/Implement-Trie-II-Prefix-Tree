
public class Trie {

    TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void insert(String word) {

        TrieNode current = root;
        int size = word.length();

        for (int i = 0; i < size; i++) {
            char ch = word.charAt(i);
            if (current.branches[ch - 'a'] == null) {
                current.branches[ch - 'a'] = new TrieNode();
            }

            current = current.branches[ch - 'a'];
            current.numberOfSharedPrefixesForThisNode++;
        }
        current.isWord = true;
        current.numberOfInstancesForThisWord++;

    }

    public int countWordsEqualTo(String word) {
        TrieNode current = root;
        int size = word.length();

        for (int i = 0; i < size; i++) {
            char ch = word.charAt(i);
            if (current.branches[ch - 'a'] == null) {
                return 0;
            }
            current = current.branches[ch - 'a'];
        }
        return current.numberOfInstancesForThisWord;
    }

    public int countWordsStartingWith(String prefix) {
        TrieNode current = root;
        int size = prefix.length();

        for (int i = 0; i < size; i++) {
            char ch = prefix.charAt(i);
            if (current.branches[ch - 'a'] == null) {
                return 0;
            }
            current = current.branches[ch - 'a'];
        }
        return current.numberOfSharedPrefixesForThisNode;
    }

    public void erase(String word) {
        TrieNode current = root;
        int size = word.length();//n,jvo

        for (int i = 0; i < size; i++) {
            char ch = word.charAt(i);
            if (--current.branches[ch - 'a'].numberOfSharedPrefixesForThisNode > 0) {
                current = current.branches[ch - 'a'];
            } else {
                TrieNode temp = current.branches[ch - 'a'];
                current.branches[ch - 'a'] = null;
                current = temp;
            }
        }
        current.numberOfInstancesForThisWord--;
    }

    class TrieNode {

        int numberOfSharedPrefixesForThisNode;
        int numberOfInstancesForThisWord;
        boolean isWord;
        final int ALPHABET = 26;
        TrieNode[] branches;

        public TrieNode() {
            branches = new TrieNode[ALPHABET];
        }
    }
}
