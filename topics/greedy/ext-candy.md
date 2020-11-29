# 135. 分发糖果

https://leetcode-cn.com/problems/candy/

- [135. 分发糖果](#135-分发糖果)
  - [题目描述](#题目描述)
  - [方法 1：贪心](#方法-1贪心)
    - [思路](#思路)
    - [复杂度分析](#复杂度分析)
    - [代码](#代码)

## 题目描述

```
老师想给孩子们分发糖果，有 N 个孩子站成了一条直线，老师会根据每个孩子的表现，预先给他们评分。

你需要按照以下要求，帮助老师给这些孩子分发糖果：

每个孩子至少分配到 1 个糖果。
相邻的孩子中，评分高的孩子必须获得更多的糖果。
那么这样下来，老师至少需要准备多少颗糖果呢？

示例 1:

输入: [1,0,2]
输出: 5
解释: 你可以分别给这三个孩子分发 2、1、2 颗糖果。
示例 2:

输入: [1,2,2]
输出: 4
解释: 你可以分别给这三个孩子分发 1、2、1 颗糖果。
     第三个孩子只得到 1 颗糖果，这已满足上述两个条件。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/candy
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法 1：贪心

### 思路

-   根据题意，对于每个孩子，我们只需要考虑他左右两侧的孩子。
-   因为要准备 `尽量少` 的糖果，所以，我们只在当前孩子比左右孩子分数高的时候，才给他更多糖果。
-   分两次遍历数组，第一次只考虑每个孩子左边的孩子，第二次只考虑每个孩子右边的孩子(左右顺序不重要，也可以先考虑右边再考虑左边)。

### 复杂度分析

-   时间复杂度：$O(N)$。
-   空间复杂度：$O(N)$。

### 代码

JavaScript Code

```js
/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
    if (!ratings || !ratings.length) return 0;

    // 每个孩子都有至少一颗糖果
    const candies = Array(ratings.length).fill(1);

    // 先考虑每个孩子左边的孩子，如果他比左边的分数高，就把他的糖果改成左边孩子糖果+1
    for (let i = 1; i < ratings.length; i++) {
        // 因为初始糖果数都是 1，所以 candies[i] <= candies[i - 1] 这个判断条件就没必要啦
        if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;
    }

    // 再考虑每个孩子右边的孩子，如果他比右边的分数高，而且他的糖果比右边的少，
    // 就将他的糖果数在右边孩子糖果的基础上加一
    for (let i = ratings.length - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1] && candies[i] <= candies[i + 1])
            candies[i] = candies[i + 1] + 1;
    }

    // 求和
    return candies.reduce((a, b) => a + b, 0);
};
```

Python Code

```py
class Solution(object):
    def candy(self, ratings):
        """
        :type ratings: List[int]
        :rtype: int
        """
        candies = [1] * len(ratings)

        # 考虑每个孩子的左边
        for i in range(1, len(ratings)):
            if ratings[i] > ratings[i - 1]:
                candies[i] = candies[i - 1] + 1

        # 考虑每个孩子的右边
        for i in range(len(ratings) - 2, -1, -1):
            if ratings[i] > ratings[i + 1] and candies[i] <= candies[i + 1]:
                candies[i] = candies[i + 1] + 1

        return sum(candies)
```
