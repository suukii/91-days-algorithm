# 面试题 04.01.节点间通路

https://leetcode-cn.com/problems/route-between-nodes-lcci

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

### 思路

贴一下今天学习图的简单[笔记](https://github.com/suukii/Articles/blob/master/articles/graph_data_structure.md)

1. 建一个邻接表
2. dfs 查找

**邻接表**

![adjacency_list](https://user-images.githubusercontent.com/30331289/85397948-03f7b800-b587-11ea-8d57-d3dcf55bf3f1.png)

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

```js
/**
 * @param {number} n
 * @param {number[][]} graph
 * @param {number} start
 * @param {number} target
 * @return {boolean}
 */
var findWhetherExistsPath = function (n, graph, start, target) {
  const adjList = {}
  for (let i = 0; i < n; i++) {
    adjList[i] = new Set()
  }
  graph.forEach((edge) => adjList[edge[0]].add(edge[1]))

  const dfs = (start, target, adjList, visited) => {
    if (start === target) return true
    visited[start] = true

    const neighs = adjList[start]
    let found = false
    neighs.forEach((neigh) => {
      if (!visited[neigh]) {
        const res = dfs(neigh, target, adjList, visited)
        res && (found = res)
      }
    })
    return found
  }

  return dfs(start, target, adjList, [])
}
```

### 复杂度分析

- 时间复杂度：O(V+E)，V 是顶点数，E 是边的数量。
- 空间复杂度：O(V+E)，V 是顶点数，E 是边的数量，邻接表的空间复杂度是 O(V+E)，dfs 递归栈的空间复杂度是 O(V)。

_Originally posted by @suukii in https://github.com/leetcode-pp/91alg-1/issues/45#issuecomment-648089334_

**官方题解**

# 面试题 04.01. 节点间通路

## 前置知识

- 哈希表
- 有向图
- 深度优先搜索
- 广度优先搜索

## 思路

首先这道题说的挺清楚的，还记得讲义里哈希表的作用之一是建立图对吧，这道题就是一道典型的先建图后搜索。

首先简单的说一下什么是有向图

- 大白话就是有很多个点，这些点用线来连接起来所构成的数据结构。
- 线如果是没有方向的就是无向图，反之，就是有向图。
- 我们之前讲的链表，树其实都是有向图的特殊情况。

下面回到这个问题， 题中说了图中可能存在自环和平行边，那再简单说下这两个概念：

- 自环：比如有一个节点 A，它有一条边指向了自己。
- 平行边：比如有两个节点 A,B，有两条或以上 A→B 的边。

好吧，那么我们用哈希表来表示图吧！怎么表示呢，哈希表的键来作为边的起始点，值（这里用 Set 作为值，为啥不用 List，小伙伴们可以自行思考）用来存储以该起始点向外指出的边集。

因此构图代码如下：

```java
Map<Integer, Set<Integer>> map = new HashMap<>();
for (int[] edge : graph) {

    Set<Integer> cur = map.getOrDefault(edge[0], new HashSet<>());
    cur.add(edge[1]);
    map.put(edge[0], cur);
}
```

这样构建出来的图自动忽略掉了平行边的情况，原因请自己思考（不难的）。

好啦，图构建完了，下一步就非常容易啦，因为就是一个搜索问题，找到指定的两个点之间是否存在一条路径，可以用深度优先搜索，也可以用广度优先搜索，因为大家之前有练习过树的遍历，因此我下面给出深度优先搜索的代码，由于我们有 visited 数组，自环这种特殊情况自动就被滤除出去了：

## 代码

```java
public boolean findWhetherExistsPath(int n, int[][] graph, int start, int target) {

    if (graph.length == 0 || n <= 0)
        return false;

    Map<Integer, Set<Integer>> map = new HashMap<>();
    for (int[] edge : graph) {

        Set<Integer> cur = map.getOrDefault(edge[0], new HashSet<>());
        cur.add(edge[1]);
        map.put(edge[0], cur);
    }

    if (!map.containsKey(start))
        return false;

    boolean[] visited = new boolean[n];

    return dfs(map, visited, start, target);
}

public boolean dfs(Map<Integer, Set<Integer>> map, boolean[] visited, int start, int target) {

    if (start == target)
        return true;

    if (!map.containsKey(start))
        return false;

    visited[start] = true;
    boolean flag = false;

    for (int to : map.get(start))
        if (!visited[to] && dfs(map, visited, to, target))
            flag = true;

    visited[start] = false;

    return flag;
}
```

该题其实就是拆分成构图+搜索两个问题，当然 构图方式不止这一种，因为这次的专题是哈希表，所以我用的哈希表来构图（邻接表的构建）。当然，我们也可以适当"剪枝"，遇到结果直接终止 dfs，可以用个全局 boolean 变量实现，感兴趣的朋友可以自己实现。

## 复杂度分析

时间复杂度：

- 建图：$O(E)$其中 E 是边的总数
- DFS：$O(E+V)$其中 E 是去除自环边和平行边的总数，V 是点的总数

空间复杂度：

- 建图：$O(E+V)$其中 E 是去除平行边的总数，V 是点的总数
- visit 数组：$O(V)$其中 V 是节点个数
- DFS：$O(V)$，递归的深度最大为节点总数

_Originally posted by @unclegem in https://github.com/leetcode-pp/91alg-1/issues/45#issuecomment-648178243_
