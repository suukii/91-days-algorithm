# 面试题 04.01.节点间通路

https://leetcode-cn.com/problems/route-between-nodes-lcci

- [面试题 04.01.节点间通路](#面试题-0401节点间通路)
  - [题目描述](#题目描述)
  - [方法 1：图+DFS](#方法-1图dfs)
    - [思路](#思路)
    - [dfs 伪代码](#dfs-伪代码)
    - [代码](#代码)
    - [复杂度分析](#复杂度分析)

## 题目描述

```
节点间通路。给定有向图，设计一个算法，找出两个节点之间是否存在一条路径。

示例1:

输入：n = 3, graph = [[0, 1], [0, 2], [1, 2], [1, 2]], start = 0, target = 2
输出：true
示例2:

输入：n = 5, graph = [[0, 1], [0, 2], [0, 4], [0, 4], [0, 1], [1, 3], [1, 4], [1, 3], [2, 3], [3, 4]], start = 0, target = 4
输出 true
提示：

节点数量n在[0, 1e5]范围内。
节点编号大于等于 0 小于 n。
图中可能存在自环和平行边。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/route-between-nodes-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法 1：图+DFS

### 思路

简单学习了下图，[笔记](https://github.com/suukii/Articles/blob/master/articles/dsa/dsa_graph.md)。

1. 建一个邻接表
2. dfs 查找

**邻接表**

![](https://cdn.jsdelivr.net/gh/suukii/91-days-algorithm/assets/0401_0.png)

### dfs 伪代码

```
如果当前顶点就是目标顶点：
    return true
否则：
    把当前顶点加入“已遍历”队列中
    let found = false 记录dfs邻接点是否能找到目标顶点
    遍历当前顶点的所有邻接点：
        如果这个邻接点是“未遍历”：
            继续dfs查找，只要有一个查找返回了true，found = true
    return found
```

### 代码

JavaScript Code

```js
/**
 * @param {number} n
 * @param {number[][]} graph
 * @param {number} start
 * @param {number} target
 * @return {boolean}
 */
var findWhetherExistsPath = function (n, graph, start, target) {
    // 建图
    const adjList = {};
    for (let i = 0; i < n; i++) {
        adjList[i] = new Set();
    }
    graph.forEach(edge => adjList[edge[0]].add(edge[1]));

    // dfs
    const dfs = (start, target, adjList, visited) => {
        if (start === target) return true;
        visited[start] = true;

        const neighs = adjList[start];
        let found = false;
        neighs.forEach(neigh => {
            if (!visited[neigh]) {
                const res = dfs(neigh, target, adjList, visited);
                res && (found = res);
            }
        });
        return found;
    };

    return dfs(start, target, adjList, []);
};
```

### 复杂度分析

-   时间复杂度：$O(V+E)$，V 是顶点数，E 是边的数量。
-   空间复杂度：$O(V+E)$，V 是顶点数，E 是边的数量，邻接表的空间复杂度是 $O(V+E)$，dfs 递归栈的空间复杂度是 $O(V)$。
