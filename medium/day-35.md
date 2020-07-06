# 78.子集

https://leetcode-cn.com/problems/subsets

## 题目描述

```
给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。

说明：解集不能包含重复的子集。

示例:

输入: nums = [1,2,3]
输出:
[
[3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/subsets
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

# 我的回答

### 思路

如果我们要生成**一个**子集，那步骤大概是：

- 初始化一个数组用来表示这个子集；
- 遍历数组，对每个元素做出选择：
  - 把它放进子集中；
  - 不把它放进子集中；
- 遍历结束后就得到了一个子集；

那如果要生成所有的子集的话：

- 当我们对当前元素做出选择后，可以递归地去对数组剩余的其他元素做选择；
- 等递归到数组的最后一个元素，也就是说，我们已经遍历完一轮数组，对每个元素都做出了选择，那我们就得到了一个子集，把这个子集存到一个全局数组变量中；
- 等到 DFS 结束后返回这个全局变量就行；

### 代码

TypeScript Code

```ts
function subsets(nums: number[]): number[][] {
  const res: number[][] = []
  const dfs = (nums: number[], cur: number, sub: number[]): void => {
    if (cur === nums.length) {
      res.push(sub)
      return
    }
    // exclude the current element
    dfs(nums, cur + 1, sub)
    // include the current element
    dfs(nums, cur + 1, [...sub, nums[cur]])
  }
  dfs(nums, 0, [])
  return res
}
```

_Originally posted by @suukii in https://github.com/leetcode-pp/91alg-1/issues/60#issuecomment-653867166_

# 参考回答

## 前置知识

- 回溯

## 思路

这道题目是求集合，并不是`求极值`，因此动态规划不是特别切合，因此我们需要考虑别的方法。

这种题目其实有一个通用的解法，就是回溯法。
网上也有大神给出了这种回溯法解题的
[通用写法](<https://leetcode.com/problems/combination-sum/discuss/16502/A-general-approach-to-backtracking-questions-in-Java-(Subsets-Permutations-Combination-Sum-Palindrome-Partitioning)>)，这里的所有的解法使用通用方法解答。
除了这道题目还有很多其他题目可以用这种通用解法，具体的题目见后方相关题目部分。

我们先来看下通用解法的解题思路，我画了一张图：

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfyrnqi82ej31190u0e81.jpg)

> 每一层灰色的部分，表示当前有哪些节点是可以选择的， 红色部分则是选择路径。1，2，3，4，5，6 则分别表示我们的 6 个子集。

通用写法的具体代码见下方代码区。

## 关键点解析

- 回溯法
- backtrack 解题公式

## 代码

- 语言支持：JS，C++

JavaScript Code:

```js
/*
 * @lc app=leetcode id=78 lang=javascript
 *
 * [78] Subsets
 *
 * https://leetcode.com/problems/subsets/description/
 *
 * algorithms
 * Medium (51.19%)
 * Total Accepted:    351.6K
 * Total Submissions: 674.8K
 * Testcase Example:  '[1,2,3]'
 *
 * Given a set of distinct integers, nums, return all possible subsets (the
 * power set).
 *
 * Note: The solution set must not contain duplicate subsets.
 *
 * Example:
 *
 *
 * Input: nums = [1,2,3]
 * Output:
 * [
 * ⁠ [3],
 * [1],
 * [2],
 * [1,2,3],
 * [1,3],
 * [2,3],
 * [1,2],
 * []
 * ]
 *
 */
function backtrack(list, tempList, nums, start) {
  list.push([...tempList])
  for (let i = start; i < nums.length; i++) {
    tempList.push(nums[i])
    backtrack(list, tempList, nums, i + 1)
    tempList.pop()
  }
}
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const list = []
  backtrack(list, [], nums, 0)
  return list
}
```

C++ Code：

```C++
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        auto ret = vector<vector<int>>();
        auto tmp = vector<int>();
        backtrack(ret, tmp, nums, 0);
        return ret;
    }

    void backtrack(vector<vector<int>>& list, vector<int>& tempList, vector<int>& nums, int start) {
        list.push_back(tempList);
        for (auto i = start; i < nums.size(); ++i) {
            tempList.push_back(nums[i]);
            backtrack(list, tempList, nums, i + 1);
            tempList.pop_back();
        }
    }
};
```

**复杂度分析**

- 时间复杂度：由排列组合原理可知，一共有 $2^N$ 种组合，因此时间复杂度为 $O(2^N)$，其中 $N$ 为数字的个数。
- 空间复杂度：由于调用栈深度最多为 $N$，且临时数组长度不会超过 $N$，因此空间复杂度为 $O(N)$，其中 $N$ 为数字的个数。

## 相关题目

- [39.combination-sum](https://github.com/azl397985856/leetcode/master/problems/39.combination-sum.md)
- [40.combination-sum-ii](https://github.com/azl397985856/leetcode/master/problems/40.combination-sum-ii.md)
- [46.permutations](https://github.com/azl397985856/leetcode/master/problems/46.permutations.md)
- [47.permutations-ii](https://github.com/azl397985856/leetcode/master/problems/47.permutations-ii.md)
- [90.subsets-ii](https://github.com/azl397985856/leetcode/master/problems/90.subsets-ii.md)
- [113.path-sum-ii](https://github.com/azl397985856/leetcode/master/problems/113.path-sum-ii.md)
- [131.palindrome-partitioning](https://github.com/azl397985856/leetcode/master/problems/131.palindrome-partitioning.md)

更多题解可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 30K star 啦。

关注公众号力扣加加，努力用清晰直白的语言还原解题思路，并且有大量图解，手把手教你识别套路，高效刷题。

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfcuzagjalj30p00dwabs.jpg)

_Originally posted by @azl397985856 in https://github.com/leetcode-pp/91alg-1/issues/60#issuecomment-653883996_
