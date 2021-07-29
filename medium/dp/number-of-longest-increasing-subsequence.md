# 673. 最长递增子序列的个数

https://leetcode-cn.com/problems/number-of-longest-increasing-subsequence/

## 题目描述

```
给定一个未排序的整数数组，找到最长递增子序列的个数。

示例 1:

输入: [1,3,5,4,7]
输出: 2
解释: 有两个最长递增子序列，分别是 [1, 3, 4, 7] 和[1, 3, 5, 7]。
示例 2:

输入: [2,2,2,2,2]
输出: 5
解释: 最长递增子序列的长度是1，并且存在5个子序列的长度为1，因此输出5。
注意: 给定的数组长度不超过 2000 并且结果一定是32位有符号整数。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/number-of-longest-increasing-subsequence
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法 1：动态规划

### 思路


### 代码

JavaScript Code

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function (nums) {
  const n = nums.length;
  const length = Array.from({ length: n }).fill(1);
  const count = Array.from({ length: n }).fill(1);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] >= nums[i]) continue;

      if (length[j] + 1 > length[i]) {
        length[i] = length[j] + 1;
        count[i] = count[j];
      } else if (length[j] + 1 == length[i]) {
        count[i] += count[j];
      }
    }
  }

  const longest = Math.max(...length);
  return length.reduce(
    (cnt, len, i) => (len == longest ? cnt + count[i] : cnt),
    0
  );
};
```

C++ Code

```cpp
class Solution {
public:
    int findNumberOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<int> length(n, 1);
        vector<int> count(n, 1);

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] <= nums[j]) continue;

                if (length[j] + 1 > length[i]) {
                    length[i] = length[j] + 1;
                    count[i] = count[j];
                }
                else if (length[j] + 1 == length[i]) {
                    count[i] += count[j];
                }
            }
        }

        int longest = *max_element(length.begin(), length.end());
        int ans = 0;
        for (int i = 0; i < n; i++) {
            if (length[i] == longest) {
                ans += count[i];
            }
        }
        return ans;
    }
};
```

### 复杂度分析

-   时间复杂度：$O(N^2)$。N 是数组 `nums` 的长度。
-   空间复杂度：$O(N)$。N 是辅助数组 `length` 和 `count` 的长度。 