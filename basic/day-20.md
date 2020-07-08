# 447.回旋镖的数量

https://leetcode-cn.com/problems/number-of-boomerangs

## 题目描述

```
给定平面上 n 对不同的点，“回旋镖” 是由点表示的元组 (i, j, k) ，其中 i 和 j 之间的距离和 i 和 k 之间的距离相等（需要考虑元组的顺序）。

找到所有回旋镖的数量。你可以假设 n 最大为 500，所有点的坐标在闭区间 [-10000, 10000] 中。

示例:

输入:
[[0,0],[1,0],[2,0]]

输出:
2

解释:
两个回旋镖为 [[1,0],[0,0],[2,0]] 和 [[1,0],[2,0],[0,0]]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/number-of-boomerangs
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

### 思路

TODO://

### 复杂度分析

- 时间复杂度：O(N^2)，两层循环找到每个点到其他点的距离是 O(N^2)，再两层循环计算距离每个点相同距离的所有点的排列结果是 O(N^2)，结果还是 O(N^2)。
- 空间复杂度：O(N^2)，需要 N 个哈希表来记录 N 个点到其他 N-1 个点的距离，最坏的情况是每个点到其他点的距离都不一样，那哈希表的大小是 N-1。

### 代码

```js
/**
 * @param {number[][]} points
 * @return {number}
 */
var numberOfBoomerangs = function (points) {
  const array = Array(points.length)
    .fill(0)
    .map(() => ({}))
  const calcDist = (p1, p2) => Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2)

  points.forEach((n, i) => {
    const map = array[i]
    points.forEach((m) => {
      if (n !== m) {
        const dist = calcDist(n, m)
        dist in map || (map[dist] = 0)
        map[dist]++
      }
    })
  })

  let count = 0
  array.forEach((map) => {
    for (let d in map) {
      if (map[d] > 1) {
        count += map[d] * (map[d] - 1)
      }
    }
  })
  return count
}
```

### 输入输出

node 版，现查 API 写的，仅供参考。

```js
const __main__ = function () {
  const readline = require('readline')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  console.log('\n输入：\n')
  rl.prompt()
  const inputs = []
  rl.on('line', (line) => inputs.push(line))

  const outputs = []
  rl.on('close', () => {
    inputs.forEach((line) => {
      const output = numberOfBoomerangs(JSON.parse(line))
      outputs.push(output)
    })

    console.log('\n输出：\n')
    outputs.forEach((el) => console.log(`${el}\n`))
  })
}
```

_Originally posted by @suukii in https://github.com/leetcode-pp/91alg-1/issues/41#issuecomment-646966574_

**官方题解**

# #447 回旋镖的数量

多读两遍题，大概就明白了题意：就是找出所有符合三个点 x,y,z，并且 dis(x,y)=dis(x,z)这种点的个数。首先要明确两点间距离怎么计算，忘了是小学还是初中的知识了：

$$x=(x1,x2)$$

$$y=(y1,y2)$$

$$dis(x,y) = \sqrt{(x1 - y1)^{2} + (x2 - y2) ^{2}}$$

由于求的是算数平方根，所以我们算距离的时候也没必要开根号了

我们可以很容易地想到暴力解法，也就是来个三重循环

```java
public int numberOfBoomerangs(int[][] points) {

    if (points == null || points.length <= 2)
        return 0;

    int res = 0;

    for (int i = 0; i < points.length; i++) {

        for (int j = 0; j < points.length; j++) {

            if (i == j)
                continue;

            for (int k = 0; k < points.length; k++) {

                if (k == i || k == j)
                    continue;

                if (getDistance(points[i], points[j]) == getDistance(points[i], points[k]))
                    res++;
            }
        }
    }

    return res;
}

private int getDistance(int[] x, int[] y) {

    int x1 = y[0] - x[0];
    int y1 = y[1] - x[1];

    return x1 * x1 + y1 * y1;
}
```

这就相当于把题目翻译了一遍，但是提交就会发现 TLE 了，也不难发现时间复杂度是$O(N^{3})$，

也就是我们需要优化代码了。。。首先题目说 n 个点不同且答案考虑元组顺序，那么我们最外层循环是跑不掉了，因为需要固定每一个点。

里面两层循环可不可以优化一下呢，其实不难想，当我们固定其中一个点 A 的时候，并且想算距离为 3 的点的个数，那么我们就找出所有和点 A 距离为 3 的点，然后来一个简单的排列组合嘛！比如找到了 n 个距离为 3 的点，那么我们选择第二个点有 n 种方案，选择第三个点有(n - 1)个方案，那么固定点 A 且距离为 3 的所有可能就是 n\*(n-1)，这是说距离为 3，还有许多其他距离呢，这不就又回到了我们统计元素频率的问题上了嘛，当然哈希表用起来！上代码：

```java
public int numberOfBoomerangs(int[][] points) {

    if (points == null || points.length <= 2)
        return 0;

    int res = 0;
    Map<Integer, Integer> equalCount = new HashMap<>();

    for (int i = 0; i < points.length; ++i) {

        for (int j = 0; j < points.length; ++j) {

            int dinstance = getDistance(points[i], points[j]);
            equalCount.put(dinstance, equalCount.getOrDefault(dinstance, 0) + 1);
        }

        for (int count : equalCount.values())
            res += count * (count - 1);
        equalCount.clear();
    }

    return res;
}

private int getDistance(int[] x, int[] y) {

    int x1 = y[0] - x[0];
    int y1 = y[1] - x[1];

    return x1 * x1 + y1 * y1;
}
```

这样时间复杂度就被优化为$O(N^{2} * max(different_distance_count))$

ps: 希望大家自己动手实现输入输出格式，输入格式可以如下：

```java
第一行代表n个点，后面有n行数据 用空格分割元素
5
1 2
0 1
0 2
3 2
2 3
```

_Originally posted by @unclegem in https://github.com/leetcode-pp/91alg-1/issues/41#issuecomment-647002357_
