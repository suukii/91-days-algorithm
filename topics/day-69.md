# 438. 找到字符串中所有字母异位词

https://leetcode-cn.com/problems/find-all-anagrams-in-a-string

## 题目描述

```
给定一个字符串 s 和一个非空字符串 p，找到 s 中所有是 p 的字母异位词的子串，返回这些子串的起始索引。

字符串只包含小写英文字母，并且字符串 s 和 p 的长度都不超过 20100。

说明：

字母异位词指字母相同，但排列不同的字符串。
不考虑答案输出的顺序。
示例 1:

输入:
s: "cbaebabacd" p: "abc"

输出:
[0, 6]

解释:
起始索引等于 0 的子串是 "cba", 它是 "abc" 的字母异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的字母异位词。
 示例 2:

输入:
s: "abab" p: "ab"

输出:
[0, 1, 2]

解释:
起始索引等于 0 的子串是 "ab", 它是 "ab" 的字母异位词。
起始索引等于 1 的子串是 "ba", 它是 "ab" 的字母异位词。
起始索引等于 2 的子串是 "ab", 它是 "ab" 的字母异位词。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/find-all-anagrams-in-a-string
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 思路

看完题目思路也很清晰了，就是用定宽的滑动窗口；而字母异位词，用大白话来说就是两个字符串包含的各种字母数量都相等。

接着第二个问题是，用什么方式来记录窗口中各个字母出现的次数？

哈希表是比较一个比较符合直觉的想法。

还有一种就是用数组。因为字符串中只包含小写字母，也就是只有 26 种字母，所以我们可以使用一个长度为 26 的数组来记录，数组下标表示字母，值则表示字母出现的次数。

## 复杂度

-   时间复杂度：$O(n)$，n 为字符串 s 的长度，使用滑动窗口只需要遍历一次 s，而比较窗口中字母数量和字符串 p 中字母数量的操作，虽然也用到了循环，但最多也就是 26 次，所以最终的时间复杂度还是 $O(n)$。
-   空间复杂度：$O(1)$，用到了两个长度为 26 的数组来记录字母出现次数以及若干个指针，但这些都与输入的字符串长度规模无关，是常数级别的空间，所以最终的空间复杂度还是 $O(1)$。

## 代码

Python Code

```py
class Solution(object):
    def isSame(self, a, b):
        for i in range(0, len(a)):
            if a[i] != b[i]: return False
        return True

    def findAnagrams(self, s, p):
        """
        :type s: str
        :type p: str
        :rtype: List[int]
        """
        if not s or not p or len(s) < len(p): return []

        a = ord('a')
        # 计算字符串 p 中的字母数量
        countP = [0 for _ in range(26)]
        for c in p:
            countP[ord(c) - a] += 1

        # 在 s 中先滑出一个窗口，计算窗口中的字母数量
        countS = [0 for _ in range(26)]
        for k in range(0, len(p)):
            countS[ord(s[k]) - a] += 1

        ans = []
        # 比较窗口中的字母数量和字符串 p 中的字母数量
        if (self.isSame(countP, countS)):
            ans.append(0)

        # 继续向右滑动窗口，更新 -> 比较
        i, j = 0, len(p) - 1
        while j < len(s) - 1:
            countS[ord(s[i]) - a] -= 1
            i += 1
            j += 1
            countS[ord(s[j]) - a] += 1
            if (self.isSame(countP, countS)):
                ans.append(i)
        return ans
```
