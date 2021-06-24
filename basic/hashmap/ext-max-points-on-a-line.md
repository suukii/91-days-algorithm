# 149. 直线上最多的点数

https://leetcode-cn.com/problems/max-points-on-a-line/

## 题目描述

```
给你一个数组 points ，其中 points[i] = [xi, yi] 表示 X-Y 平面上的一个点。求最多有多少个点在同一条直线上。

 

示例 1：
```
![](https://assets.leetcode.com/uploads/2021/02/25/plane1.jpg)
```
输入：points = [[1,1],[2,2],[3,3]]
输出：3
示例 2：
```
![](https://assets.leetcode.com/uploads/2021/02/25/plane2.jpg)
```
输入：points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
输出：4
 

提示：

1 <= points.length <= 300
points[i].length == 2
-104 <= xi, yi <= 104
points 中的所有点 互不相同

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/max-points-on-a-line
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法 1：枚举

### 思路

这题其实不难，只需要知道两个朴素的数学知识：

- 两点确定一条直线
- 用斜率方程来判断某点是否在一条直线上

暴力点的思路就是，枚举所有两个点的组合：

- 先用两个点确定一条直线
- 枚举其他点，判断点是否在这条直线上

### 复杂度分析

-   时间复杂度：$O(N^3)$，枚举直线的时间是 $O(N^2)$，计算在直线上的点的时间是 $O(N)$。
-   空间复杂度：$O(1)$。

### 代码

JavaScript Code

```js
/**
 * @param {number[][]} points
 * @return {number}
 */
var maxPoints = function(points) {
    let max = 1;
    // 点两两组合，枚举所有组合
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            // points[i] 和 points[j] 确定了一条直线
            // 计算在这条直线上的点
            const count = countPointsOnLine(points[i], points[j]);
            max = Math.max(max, count);
        }
    }
    return max;

    // *********************************************

    function countPointsOnLine([x1, y1], [x2, y2]) {
        const slopeOfLine = (y1 - y2) / (x1 - x2);
        let count = 2;
        points.forEach(([x, y]) => {
            if (x === x1 && y === y1) return
            if (x === x2 && y === y2) return
            // 斜率一样则说明点在线上
            const slope = (y1 - y) / (x1 - x);
            if (slope === slopeOfLine) count++
        })
        return count;
    }
};
```

## 方法 2: 哈希表

### 思路

枚举直线无法避免，但是计算直线上的点这一步可以优化，思路如下：

- 先确定一个点，计算当前点与剩余其他点的斜率
- 用哈希表记录这个过程中所有出现过的斜率以及出现次数
- 因为斜率一样的点就在同一条直线上，所以统计斜率出现次数就能知道该直线上有多少个点了
- 难点在于斜率的记录方式，直接计算会出现精度问题，所以采取分子分母元祖的记录方式，如，`slope = y / x` 记录为字符串 `'y/x'`，记录前还需要对分式进行约分。

### 复杂度分析

-   时间复杂度：$O(N^2*logm)$，枚举直线的时间是 $O(N^2)$，计算gcd的时间是 $O(logm)$，m 是点的最大差值。
-   空间复杂度：$O(N)$。

### 代码

JavaScript Code

```js
/**
 * @param {number[][]} points
 * @return {number}
 */
var maxPoints = function (points) {
    let max = 1;
    for (let i = 0; i < points.length; i++) {
        // 先确定一个点 points[i]
        const map = {};
        for (let j = i + 1; j < points.length; j++) {
            // 枚举剩余的点，计算两点的斜率
            // 用哈希表记录所有出现过的斜率的次数
            const key = getSlopeKey(points[i], points[j]);
            map[key] = (map[key] || 0) + 1;
        }
        const count = Math.max(...Object.values(map)) + 1;
        max = Math.max(count, max);
    }
    return max

    // ***********************************
    function getSlopeKey([x1, y1], [x2, y2]) {
        const [x, y] = [x1 - x2, y1 - y2];
        const k = gcd(x, y);
        return `${y / k}/${x / k}`;
    }
    function gcd(a, b) {
        return b != 0 ? gcd(b, a % b) : a;
    }
};
```

更多题解可以访问：[https://github.com/suukii/91-days-algorithm](https://github.com/suukii/91-days-algorithm)