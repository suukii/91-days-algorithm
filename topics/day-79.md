# 980.不同路径 III

https://leetcode-cn.com/problems/unique-paths-iii

## 题目描述

```
在二维网格 grid 上，有 4 种类型的方格：

1 表示起始方格。且只有一个起始方格。
2 表示结束方格，且只有一个结束方格。
0 表示我们可以走过的空方格。
-1 表示我们无法跨越的障碍。
返回在四个方向（上、下、左、右）上行走时，从起始方格到结束方格的不同路径的数目。

每一个无障碍方格都要通过一次，但是一条路径中不能重复通过同一个方格。



示例 1：

输入：[[1,0,0,0],[0,0,0,0],[0,0,2,-1]]
输出：2
解释：我们有以下两条路径：
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2)
2. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2)
示例 2：

输入：[[1,0,0,0],[0,0,0,0],[0,0,0,2]]
输出：4
解释：我们有以下四条路径：
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2),(2,3)
2. (0,0),(0,1),(1,1),(1,0),(2,0),(2,1),(2,2),(1,2),(0,2),(0,3),(1,3),(2,3)
3. (0,0),(1,0),(2,0),(2,1),(2,2),(1,2),(1,1),(0,1),(0,2),(0,3),(1,3),(2,3)
4. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2),(2,3)
示例 3：

输入：[[0,1],[2,0]]
输出：0
解释：
没有一条路能完全穿过每一个空的方格一次。
请注意，起始和结束方格可以位于网格中的任意位置。


提示：

1 <= grid.length * grid[0].length <= 20
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/unique-paths-iii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 思路

从起始格子开始，尝试每一个 0 空格。当走到 2 时，如果此时网格没有还没走过的空格，说明这是一条可行的路径。也就是说我们需要用一个方式来标志已经走过的空格，可以把格子设为 -1，回溯时需要把格子重新设置为 0，不影响其他路径的尝试。

当我们走到 2 时，如何判断网格中是否还有未走过的空格？

每次都去遍历整个网格的话，时间复杂度太高。我们可以在开始先统计网格中一共有多少个可以走的格子，每走过一个格子计数器就减一。

## 复杂度

-   时间复杂度：$O(4^{m*n})$, m, n 分别是网格的长宽。找到起始格子和统计空格用了 $O(m*n)$，递归的时间复杂度 $O(4^{m*n})$，网格一共有 $m*n$ 个格子，每个格子有 4 个方向可以走。
-   空间复杂度：递归栈的最大空间 $O(m*n)$。

> p.s. 下方代码是我看错题了，求了所有路径。实际上只需要一个计数器来记录路径数，不消耗额外空间。

## 代码

JavaScript Code

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var uniquePathsIII = function (grid) {
    const offsets = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    const ans = [];
    const dfs = (grid, x, y, spaceCnt, path) => {
        if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) return;

        if (grid[x][y] === 2) {
            spaceCnt === 0 && ans.push([...path]);
            return;
        }

        if (grid[x][y] === -1) return;
        grid[x][y] = -1; // mark

        // recursion
        for (const [ox, oy] of offsets) {
            // p.s. 如果 (x+ox, y+oy) 不在网格中或者是障碍的话，也可以提前剪枝。
            dfs(grid, x + ox, y + oy, spaceCnt - 1, [...path, [x, y]]);
        }
        grid[x][y] = 0; // backtrack
    };

    let startPos = {};
    const init = grid => {
        let spaceCnt = 1; // 起始方格也是要走的一个格子
        for (let x = 0; x < grid.length; x++) {
            for (let y = 0; y < grid[x].length; y++) {
                if (grid[x][y] === 1) startPos = { x, y };
                if (grid[x][y] === 0) spaceCnt++;
            }
        }
        return spaceCnt;
    };

    // 统计要走的格子总数
    const spaceCnt = init(grid);
    dfs(grid, startPos.x, startPos.y, spaceCnt, []);
    return ans.length;
};
```

_Originally posted by @suukii in https://github.com/leetcode-pp/91alg-1/issues/106#issuecomment-676368122_
