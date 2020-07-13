# 677.键值映射

https://leetcode-cn.com/problems/map-sum-pairs

-   HashMap
-   Trie
-   Trie (优化版)
-   Trie + HashMap
-   Trie + HashMap (优化版)

## 题目描述

```
实现一个 MapSum 类里的两个方法，insert 和 sum。

对于方法 insert，你将得到一对（字符串，整数）的键值对。字符串表示键，整数表示值。如果键已经存在，那么原来的键值对将被替代成新的键值对。

对于方法 sum，你将得到一个表示前缀的字符串，你需要返回所有以该前缀开头的键的值的总和。

示例 1:

输入: insert("apple", 3), 输出: Null
输入: sum("ap"), 输出: 3
输入: insert("app", 2), 输出: Null
输入: sum("ap"), 输出: 5

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/map-sum-pairs
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## HashMap

### 复杂度分析

-   时间复杂度：`insert` 是 $O(1)$ (不考虑哈希冲突的话)，`sum` 是 $O(n*len(prefix))$，n 是 hashmap 的 key 总数，prefix 是要查找的前缀。
-   空间复杂度：$O(n)$，n 是字符串的数量，

### 代码

Python Code

```py
class MapSum(object):
    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.hashmap = {}

    def insert(self, key, val):
        """
        :type key: str
        :type val: int
        :rtype: None
        """
        self.hashmap[key] = val

    def sum(self, prefix):
        """
        :type prefix: str
        :rtype: int
        """
        res = 0
        for key in self.hashmap:
            if key.startswith(prefix):
                res += self.hashmap[key]
        return res



# Your MapSum object will be instantiated and called as such:
# obj = MapSum()
# obj.insert(key,val)
# param_2 = obj.sum(prefix)
```

## Trie

### 思路

-   构建前缀树。
-   `sum` 操作的时候，先判断 `prefix` 是否存在前缀树中，然后找到 `prefix` 最后的节点，开始 DFS。

**DFS**

-   **大问题**：`dfs(node)` 应该要返回以这个节点开始的所有路径中的 `value` 的和。
-   **小问题**：`dfs(node.child)`，先找到以 `node` 的子节点开始的所有路径中的 `value` 的和。不过由于 `node` 有很多子节点，所以我们需要一个循环。
-   **大问题与小问题的关系**：当我们求出了全部 `dfs(node.child)`，那么

    -   `dfs(node) = node.value + dfs(node.child1) + dfs(node.child2) + ...`

-   **递归出口**：如果节点不存在，我们直接返回 0，停止递归。

### 复杂度分析

-   时间复杂度：`insert` 操作的时间复杂度是 $O(len(key))$，`sum` 操作的时间复杂度是 $O(m^{n})$，m 是字符集中字符数量，n 是字符串长度。
-   空间复杂度：$O(m^{n})$，m 是字符集中字符数量，n 是字符串长度。

### 代码

TypeScript Code

```ts
class TrieNode {
    value: number
    children: Array<TrieNode>

    constructor(value: number) {
        this.value = value
        this.children = Array(26)
    }
}

class MapSum {
    private root: TrieNode

    constructor() {
        this.root = this._getTrieNode(0)
    }

    private _getTrieNode(value: number): TrieNode {
        return new TrieNode(value)
    }

    private _char2Index(char: string): number {
        return char.toLowerCase().charCodeAt(0) - 97
    }

    insert(key: string, val: number): void {
        let crawl: TrieNode = this.root
        for (let char of key) {
            const index: number = this._char2Index(char)
            if (!crawl.children[index]) {
                crawl.children[index] = this._getTrieNode(0)
            }
            crawl = crawl.children[index]
        }
        crawl.value = val
    }

    private _dfs(crawl: TrieNode): number {
        if (!crawl) return 0

        return crawl.children.reduce(
            (res: number, pointer: TrieNode): number => {
                return res + (pointer ? this._dfs(pointer) : 0)
            },
            crawl.value,
        )
    }

    sum(prefix: string): number {
        let crawl: TrieNode = this.root
        for (let char of prefix) {
            const index: number = this._char2Index(char)
            if (!crawl.children[index]) return 0
            crawl = crawl.children[index]
        }
        return this._dfs(crawl)
    }
}

/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */
```

## Trie (优化版)

在每个节点上存 `prefixSum`，可以把 `sum` 操作的时间复杂度降到 $O(1)$，代价是在 `insert` 的时候需要先检查 key 是否已经存在，存在的话要想从 `prefixSum` 中减去旧的 value，再加上新的 value。

### 复杂度分析

-   时间复杂度：`insert` 操作的时间复杂度是 $O(len(key))$，具体来说是 $O(2*len(key))$，一次查找 key 是否存在前缀树中，一次插入。`sum` 操作的时间复杂度是 $O(1)$。
-   空间复杂度：$O(m^{n})$，m 是字符集中字符数量，n 是字符串长度。

### 代码

```ts
class TrieNode {
    value: number
    prefixSum: number
    children: Array<TrieNode>

    constructor(value: number) {
        this.value = value
        this.prefixSum = 0
        this.children = Array(26)
    }
}

class MapSum {
    private root: TrieNode

    constructor() {
        this.root = this._getTrieNode(0)
    }

    private _getTrieNode(value: number): TrieNode {
        return new TrieNode(value)
    }

    private _char2Index(char: string): number {
        return char.toLowerCase().charCodeAt(0) - 97
    }

    search(key: string): number {
        let crawl: TrieNode = this.root
        for (let char of key) {
            const index: number = this._char2Index(char)
            if (!crawl.children[index]) return 0
            crawl = crawl.children[index]
        }
        return crawl.value
    }

    insert(key: string, val: number): void {
        let crawl: TrieNode = this.root
        const existedVal: number = this.search(key)
        for (let char of key) {
            const index: number = this._char2Index(char)
            if (!crawl.children[index]) {
                crawl.children[index] = this._getTrieNode(0)
            }
            crawl = crawl.children[index]
            crawl.prefixSum = crawl.prefixSum - existedVal + val
        }
        crawl.value = val
    }

    sum(prefix: string): number {
        let crawl: TrieNode = this.root

        for (let char of prefix) {
            const index: number = this._char2Index(char)
            if (!crawl.children[index]) return 0
            crawl = crawl.children[index]
        }
        return crawl.prefixSum
    }
}

/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */
```

## Trie + HashMap

### 思路

把以某个前缀开始的 `key` 相应的 `value`，以 hashmap 的形式存在这个前缀的最后一个节点中。比如，

-   我们先插入了一个 `(dark, 3)`，
-   然后再插入一个 `(darkest, 2)`，
-   那这时表示 `k` 的那个节点的 hashmap 应该是这样：
    -   `{ dark: 3, darkest: 2 }`
-   这时如果我们再次插入 `(darkest, 5)`，覆盖了之前的值，那 `k` 节点的 hashmap 就变成了：
    -   `{ dark: 3, darkest: 5 }`

> 当然，d, a, r 节点上的数据结构也和 k 节点一样

现在，我们的 `sum` 操作就变成了：

1. 找到 `prefix` 的结束节点。
2. 计算这个节点中的 hashmap 的 `value` 和。

不过我们还可以继续优化一点，在存 hashmap 的时候，也顺便存一个 `prefixSum`，也就是上述第 2 步得到的值。当我们往前缀树插入重复的 `key` 时，由于有 hashmap 的存在，我们就可以从 `prefixSum` 中删除这个 `key` 对应的旧的 `value`，然后加上新的 `value`。

### 复杂度分析

-   时间复杂度：`insert` 是 $O(len(key))$，`sum` 是 $O(len(prefix))$。
-   空间复杂度：Trie 的空间复杂度是 $O(m^{n})$，m 是字符集中字符数量，n 是字符串长度。然后每个节点还有一个 hashmap，这个，怎么算啊？

### 代码

TypeScript Code

```ts
class TrieNode {
    value: number
    prefixSum: number
    prefixMap: {
        [key: string]: number
    }
    children: Array<TrieNode>

    constructor(value: number) {
        this.value = value
        this.prefixSum = 0
        this.prefixMap = {}
        this.children = Array(26)
    }
}

class MapSum {
    private root: TrieNode

    constructor() {
        this.root = this._getTrieNode(0)
    }

    private _getTrieNode(value: number): TrieNode {
        return new TrieNode(value)
    }

    private _char2Index(char: string): number {
        return char.toLowerCase().charCodeAt(0) - 97
    }

    insert(key: string, val: number): void {
        let crawl: TrieNode = this.root
        for (let char of key) {
            const index: number = this._char2Index(char)
            if (!crawl.children[index]) {
                crawl.children[index] = this._getTrieNode(0)
            }
            crawl = crawl.children[index]
            if (key in crawl.prefixMap) {
                crawl.prefixSum -= crawl.prefixMap[key]
            }
            crawl.prefixMap[key] = val
            crawl.prefixSum += val
        }
        crawl.value = val
    }

    sum(prefix: string): number {
        let crawl: TrieNode = this.root

        for (let char of prefix) {
            const index: number = this._char2Index(char)
            if (!crawl.children[index]) return 0
            crawl = crawl.children[index]
        }
        return crawl.prefixSum
    }
}

/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */
```

## Trie + HashMap (优化版 1)

### 思路

上一个方法中其实没有必要把 hashmap 放到每个节点中，只需要用一个全局的 hashmap 来记录前缀树已存在的 key 就好了。

### 代码

```ts
class TrieNode {
    value: number
    prefixSum: number
    children: Array<TrieNode>

    constructor(value: number) {
        this.value = value
        this.prefixSum = 0
        this.children = Array(26)
    }
}

class MapSum {
    private root: TrieNode
    private existedWords: {
        [key: string]: number
    }

    constructor() {
        this.root = this._getTrieNode(0)
        this.existedWords = {}
    }

    private _getTrieNode(value: number): TrieNode {
        return new TrieNode(value)
    }

    private _char2Index(char: string): number {
        return char.toLowerCase().charCodeAt(0) - 97
    }

    insert(key: string, val: number): void {
        let crawl: TrieNode = this.root
        for (let char of key) {
            const index: number = this._char2Index(char)
            if (!crawl.children[index]) {
                crawl.children[index] = this._getTrieNode(0)
            }
            crawl = crawl.children[index]
            if (key in this.existedWords) {
                crawl.prefixSum -= this.existedWords[key]
            }
            crawl.prefixSum += val
        }
        this.existedWords[key] = val
        crawl.value = val
    }

    sum(prefix: string): number {
        let crawl: TrieNode = this.root

        for (let char of prefix) {
            const index: number = this._char2Index(char)
            if (!crawl.children[index]) return 0
            crawl = crawl.children[index]
        }
        return crawl.prefixSum
    }
}

/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */
```

**官方题解**

https://github.com/leetcode-pp/91alg-1/issues/69#issuecomment-657210282
