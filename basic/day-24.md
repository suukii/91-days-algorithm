# 149.直线上最多的点数

https://leetcode-cn.com/problems/max-points-on-a-line

## 题目描述

```
给定一个二维平面，平面上有 n 个点，求最多有多少个点在同一条直线上。

示例 1:

输入: [[1,1],[2,2],[3,3]]
输出: 3
解释:
^
|
|        o
|     o
|  o
+------------->
0  1  2  3 4
示例 2:

输入: [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
输出: 4
解释:
^
|
| o
|     o   o
|      o
|  o   o
+------------------->
0  1  2  3  4  5  6

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/max-points-on-a-line
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 思路

**官方题解**

# 149. 直线上最多的点数

## 前置知识

- 哈希表
- 数学

## 思路

题读完之后，简单直观，但很有可能不知道该从何下手，这时候我们要一点点抽象出问题来（希望大家以后做题无从下手时，就从问题中抽丝剥茧，最后抽象出数学 or 数据结构的问题）。

- 首先，题目问的是关于最多有多少点在同一条直线，那么我们就要知道如何判断这些点在不在一条直线：这时候我们可以先固定一个点，求出其他所有点与当前点构成线的斜率，与固定点斜率相同的点，他们就在一条直线上，斜率公式如下

$$K = \dfrac{\Delta{y}}{\Delta{x}} = \dfrac{y2 - y1}{x2 - x1}, ifx1 != x2$$

- 知道了斜率，也就是回到了类似前两天的回旋镖问题（这个题是先固定一个点，求出其他点距离该点的欧式距离），先固定一个点，统计出斜率的频率并找出最大值，这不就又抽象出来用哈希表来统计频率的这个问题上了嘛。
- 但是这个哈希表的键按上述所说应该为斜率，但是我们知道斜率很容易出现 5/7 这种除不尽的小数，并且使用哈希表的时候一定要慎重使用实数作为 key！！！
- 那么如何构建一个合适的斜率表示就成了本题的关键，我们回到上面的那个求斜率公式，很明显是个分数表示，难道我们一定需要把这个分数求出实值来才可以么？当然不需要，我们只需要把分子分母拆开并连接起来就可以作为一个字符串键啊！比如：2/4 我们转化一下：2#4，这时候作为键就可以啦！
- 继续思考，2#4，4#8 这两个键不一样，但是斜率是一样啊，我们需要处理的，这时候分数约分的知识点就来啦，其实就是用分子和分母的最大公约数（GCD）来把分数化成最简单形式不就行了！而且都不用担心斜率不存在，也就是分母为 0 的情况了！ps：当直线平行于 y 轴，斜率虽然不存在，但是点也可以是都在一条直线上。
- 再思考，如果分子分母都是 0，也就是两个点重合，那我们辗转相除法求 gcd 可就不行了，那不行不求就可以了，作为一个特殊情况单独做统计，两个点重合本来就可以算在一条直线上的。

上面分析完之后，发现我们只要了解求两点斜率，并且知道如何构建一个合适的 key，代码就不难写出来了：

## 代码

```java
public int maxPoints(int[][] points) {

    if (points == null)
        return -1;

    if (points.length <= 1)
        return points.length;

    Map<String, Integer> map = new HashMap<>();
    int res = 0;

    for (int i = 0; i < points.length; i++) {

        int same = 1;

        for (int j = 0; j < points.length; j++) {

            if (i == j)
                continue;

            int x = points[i][0] - points[j][0];
            int y = points[i][1] - points[j][1];

            if (x == 0 && y == 0) {

                same++;
                continue;
            }
            int gcd = gcd(x, y);
            String key = x / gcd + "-" + y / gcd;
            map.put(key, map.getOrDefault(key, 0) + 1);
        }

        if (map.isEmpty())
            res = Math.max(res, same);
        else {

            for (int val : map.values())
                res = Math.max(res, val + same);
        }

        map.clear();
    }

    return res;
}

public int gcd(int x, int y) {

    if (y == 0)
        return x;

    return gcd(y, x % y);
}
```

### 复杂度分析：

时间复杂度：$O(N^2)$ 其中 N 为点的个数

空间复杂度：$O(N)$其中 N 为点的个数

## 本周哈希表的课程到此结束～

_Originally posted by @unclegem in https://github.com/leetcode-pp/91alg-1/issues/50#issuecomment-648820744_
