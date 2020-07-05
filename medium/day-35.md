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
