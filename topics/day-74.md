# 1254. 统计封闭岛屿的数目

## 题目描述

```
有一个二维矩阵 grid ，每个位置要么是陆地（记号为 0 ）要么是水域（记号为 1 ）。

我们从一块陆地出发，每次可以往上下左右 4 个方向相邻区域走，能走到的所有陆地区域，我们将其称为一座「岛屿」。

如果一座岛屿 完全 由水域包围，即陆地边缘上下左右所有相邻区域都是水域，那么我们将其称为 「封闭岛屿」。

请返回封闭岛屿的数目。

输入：grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
输出：2
解释：
灰色区域的岛屿是封闭岛屿，因为这座岛屿完全被水域包围（即被 1 区域包围）。
输入：grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]
输出：1
输入：grid = [[1,1,1,1,1,1,1],
             [1,0,0,0,0,0,1],
             [1,0,1,1,1,0,1],
             [1,0,1,0,1,0,1],
             [1,0,1,1,1,0,1],
             [1,0,0,0,0,0,1],
             [1,1,1,1,1,1,1]]
输出：2
```

## 思路

先把跟边界连通的 0 变成 1 (或者其他占位符)，然后计算其他连通的 0 有多少组。

## 复杂度

-   时间复杂度：$O(m*n)$，m 和 n 是 grid 的长宽。
-   空间复杂度：$O(max(m, n))$，递归栈的空间我感觉是这个。

## 代码

JavaScript Code

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var closedIsland = function (grid) {
    const outOfBoundary = (grid, x, y) =>
        x < 0 || x >= grid.length || y < 0 || y >= grid[0].length;

    const dfs = (grid, x, y) => {
        if (outOfBoundary(grid, x, y)) return false;
        if (grid[x][y] === 1) return true;
        grid[x][y] = 1;

        if (
            dfs(grid, x - 1, y) &&
            dfs(grid, x + 1, y) &&
            dfs(grid, x, y - 1) &&
            dfs(grid, x, y + 1)
        )
            return true;

        return false;
    };

    const mark = (grid, x, y) => {
        if (outOfBoundary(grid, x, y) || grid[x][y] === 1) return;

        grid[x][y] = 1;
        mark(grid, x - 1, y);
        mark(grid, x + 1, y);
        mark(grid, x, y - 1);
        mark(grid, x, y + 1);
    };

    // 将连通边界的 0 都改成 1
    for (let i = 0; i < grid.length; i++) {
        mark(grid, i, 0);
        mark(grid, i, grid[0].length - 1);
    }
    for (let j = 0; j < grid[0].length; j++) {
        mark(grid, 0, j);
        mark(grid, grid.length - 1, j);
    }

    let ans = 0;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1) continue;
            if (dfs(grid, i, j)) ans++;
        }
    }
    return ans;
};
```

_Originally posted by @suukii in https://github.com/leetcode-pp/91alg-1/issues/101#issuecomment-673413128_
