# 5210. 球会落何处

https://leetcode-cn.com/problems/where-will-the-ball-fall/

## 题目描述

```
用一个大小为 m x n 的二维网格 grid 表示一个箱子。你有 n 颗球。箱子的顶部和底部都是开着的。

箱子中的每个单元格都有一个对角线挡板，跨过单元格的两个角，可以将球导向左侧或者右侧。

将球导向右侧的挡板跨过左上角和右下角，在网格中用 1 表示。
将球导向左侧的挡板跨过右上角和左下角，在网格中用 -1 表示。
在箱子每一列的顶端各放一颗球。每颗球都可能卡在箱子里或从底部掉出来。如果球恰好卡在两块挡板之间的 "V" 形图案，或者被一块挡导向到箱子的任意一侧边上，就会卡住。

返回一个大小为 n 的数组 answer ，其中 answer[i] 是球放在顶部的第 i 列后从底部掉出来的那一列对应的下标，如果球卡在盒子里，则返回 -1 。

 

示例 1：
```

![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/12/26/ball.jpg)

```
输入：grid = [[1,1,1,-1,-1],[1,1,1,-1,-1],[-1,-1,-1,1,1],[1,1,1,1,-1],[-1,-1,-1,-1,-1]]
输出：[1,-1,-1,-1,-1]
解释：示例如图：
b0 球开始放在第 0 列上，最终从箱子底部第 1 列掉出。
b1 球开始放在第 1 列上，会卡在第 2、3 列和第 1 行之间的 "V" 形里。
b2 球开始放在第 2 列上，会卡在第 2、3 列和第 0 行之间的 "V" 形里。
b3 球开始放在第 3 列上，会卡在第 2、3 列和第 0 行之间的 "V" 形里。
b4 球开始放在第 4 列上，会卡在第 2、3 列和第 1 行之间的 "V" 形里。
示例 2：

输入：grid = [[-1]]
输出：[-1]
解释：球被卡在箱子左侧边上。
 

提示：

m == grid.length
n == grid[i].length
1 <= m, n <= 100
grid[i][j] 为 1 或 -1

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/where-will-the-ball-fall
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法1: DFS

### 思路

用 DFS，模拟小球的运动轨迹就好了。小球可以从三个方向进入一个格子。

![](https://cdn.jsdelivr.net/gh/suukii/91-days-algorithm/assets/5210_0.png)

具体看代码注释。

### 复杂度分析

-   时间复杂度：$O()$。
-   空间复杂度：$O()$。

### 代码

JavaScript Code

```js
/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var findBall = function (grid) {
    if (!grid || !grid[0]) return [];

    const cols = grid[0].length;
    const ans = Array(cols).fill(-1);

    for (let i = 0; i < cols; i++) {
        // 一开始所有小球都是从格子上方掉入格子中
        ans[i] = roll(grid, 0, i, 'TOP');
    }
    return ans;

    // ******************************
    /**
     * @param {number[][]} grid
     * @param {number} x
     * @param {number} y
     * @param {string} 表示小球是从哪个方向进入当前格子的
     */
    function roll(grid, x, y, dir) {
        // 顺利掉到了网格下方的
        if (x >= grid.length) return y;
        // 左右边界
        if (x < 0 || y < 0 || y >= grid[0].length) return -1;

        // 挡板
        let board = grid[x][y];
        let res = -1;

        // 从上方掉落的，看挡板方向，小球只能滚向左侧或者右侧
        if (dir === 'TOP') {
            if (board === 1) res = roll(grid, x, y + 1, 'LEFT');
            else if (board === -1) res = roll(grid, x, y - 1, 'RIGHT');
        }
        // 从左右两侧进入的，看挡板方向，小球只能卡在当前格子或者往下掉
        else if (
            (dir === 'LEFT' && board === -1) ||
            (dir === 'RIGHT' && board === 1)
        )
            res = -1;
        else res = roll(grid, x + 1, y, 'TOP');

        return res;
    }
};
```

更多题解可以访问：[https://github.com/suukii/91-days-algorithm](https://github.com/suukii/91-days-algorithm)