# 1202. 交换字符串中的元素

https://leetcode-cn.com/problems/smallest-string-with-swaps/

- [1202. 交换字符串中的元素](#1202-交换字符串中的元素)
  - [题目描述](#题目描述)
  - [方法 1：并查集](#方法-1并查集)
    - [思路](#思路)
    - [复杂度分析](#复杂度分析)
    - [代码](#代码)

## 题目描述

```
给你一个字符串 s，以及该字符串中的一些「索引对」数组 pairs，其中 pairs[i] = [a, b] 表示字符串中的两个索引（编号从 0 开始）。

你可以 任意多次交换 在 pairs 中任意一对索引处的字符。

返回在经过若干次交换后，s 可以变成的按字典序最小的字符串。

 

示例 1:

输入：s = "dcab", pairs = [[0,3],[1,2]]
输出："bacd"
解释：
交换 s[0] 和 s[3], s = "bcad"
交换 s[1] 和 s[2], s = "bacd"
示例 2：

输入：s = "dcab", pairs = [[0,3],[1,2],[0,2]]
输出："abcd"
解释：
交换 s[0] 和 s[3], s = "bcad"
交换 s[0] 和 s[2], s = "acbd"
交换 s[1] 和 s[2], s = "abcd"
示例 3：

输入：s = "cba", pairs = [[0,1],[1,2]]
输出："abc"
解释：
交换 s[0] 和 s[1], s = "bca"
交换 s[1] 和 s[2], s = "bac"
交换 s[0] 和 s[1], s = "abc"
 

提示：

1 <= s.length <= 10^5
0 <= pairs.length <= 10^5
0 <= pairs[i][0], pairs[i][1] < s.length
s 中只含有小写英文字母

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/smallest-string-with-swaps
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法 1：并查集

### 思路

换个思路，如果字符串 s 中的所有字符都可以随意互换，那我们只需要对 s 进行排序就可以得到结果了。

但字符串并不是所有字符都可随意互换，pairs  中的一对索引表示这两处的字符可以互换，但如果其中两对索引有重叠，则说明这三处的字符都可以随意互换，如果我们将这三个索引处的字符进行排序后再分别填充回去，也就能得到想要的结果了。

剩下的问题就是

1. 如何找出字符可以随意互换的区域？
2. 如何重新填充字符？

第一个问题可以用并查集来解决，关于并查集这里就不详细展开了。通过并查集处理我们可以将字符串 s 分为若干个区域，每个区域内的字符都是可以随意互换的，我们只需要分别对每个区域中的字符进行排序就可以了。

![](https://cdn.jsdelivr.net/gh/suukii/91-days-algorithm/assets/1202_0.png)

第二个问题，要重新填充字符，我们需要知道当前索引属于哪个区域，以及当前区域有哪些字符。前者可以通过并查集的查找功能，后者可以使用一个哈希表来存储，使用并查集中每个不交集的代表元来作为哈希表的 key，当前区域内的所有字符作为 value。当然也可以修改并查集的结构，把数据直接存储在并查集中。

![](https://cdn.jsdelivr.net/gh/suukii/91-days-algorithm/assets/1202_1.png)

最后一步就是填充结果字符串。先对 map 中的字符进行分组排序，然后遍历 s 字符串，对于每个索引的处理是：先判断当前索引处于哪个不交集中，然后在 map 中找到这个不交集中的所有字符，取出字典序最小的字符，填充当前索引。

### 复杂度分析

| 操作           | 时间复杂度                                                              | 空间复杂度 |
| -------------- | ----------------------------------------------------------------------- | ---------- |
| 构建并查集     | $O(M*α(N))$                                                             | $O(N)$     |
| 构建哈希表     | $O(N*α(N))$, 并查集查询时间 $O(α(N))$，一共查询了 N 次                  | $O(N)$     |
| 字符排序       | $O(NlogN)$, 最坏情况字符串 s 的所有字符都可互换，即对整个字符串进行排序 | $O(1)$     |
| 构建结果字符串 | $O(N*α(N))$                                                             | $O(1)$     |
| 总计           | $O((M + N)*α(N) + NlogN)$                                               | $O(N)$     |

- M 为 pairs 长度，N 为字符串 s 的长度。

### 代码

TypeScript Code

```js
function smallestStringWithSwaps(s: string, pairs: number[][]): string {
    if (pairs.length === 0) return s;

    const uf: UnionFind = new UnionFind(s.length);
    for (const [x, y] of pairs) {
        uf.unionSet(x, y);
    }

    const map: {
        [prop: string]: string[];
    } = {};

    for (let i = 0; i < s.length; i++) {
        const parent: number = uf.findSet(i);
        if (!(parent in map)) map[parent] = [];
        map[parent].push(s[i]);
    }

    for (const k in map) {
        map[k].sort(
            (a: string, b: string): number => b.charCodeAt(0) - a.charCodeAt(0),
        );
    }

    const res: string[] = Array(s.length);
    for (let i = 0; i < s.length; i++) {
        const parent: number = uf.findSet(i);
        const strings: string[] = map[parent];
        res[i] = strings.pop();
    }

    return res.join('');
}

// *************************************************

class UnionFind {
    private parents: Array<number>;
    private rank: Array<number>;
    private numOfSets: number;

    constructor(size: number) {
        this.parents = Array(size)
            .fill(0)
            .map((_, i) => i);
        this.rank = Array(size).fill(0);
        this.numOfSets = size;
    }

    size(): number {
        return this.numOfSets;
    }

    findSet(x: number): number {
        if (x !== this.parents[x]) {
            this.parents[x] = this.findSet(this.parents[x]);
        }
        return this.parents[x];
    }

    unionSet(x: number, y: number): void {
        const px: number = this.findSet(x);
        const py: number = this.findSet(y);
        if (px === py) return;
        if (this.rank[px] > this.rank[py]) {
            this.parents[py] = px;
        } else {
            this.parents[px] = py;
            this.rank[px] === this.rank[py] && ++this.rank[py];
        }
        this.numOfSets--;
    }
}
```

更多题解可以访问：[https://github.com/suukii/91-days-algorithm](https://github.com/suukii/91-days-algorithm)
