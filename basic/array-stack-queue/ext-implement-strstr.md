# 28. 实现 strStr()

https://leetcode-cn.com/problems/implement-strstr/

- [28. 实现 strStr()](#28-实现-strstr)
  - [题目描述](#题目描述)
  - [方法 1：滑动窗口+子串逐一比较](#方法-1滑动窗口子串逐一比较)
    - [思路](#思路)
    - [复杂度分析](#复杂度分析)
    - [代码](#代码)

## 题目描述

```
实现 strStr() 函数。

给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。

示例 1:

输入: haystack = "hello", needle = "ll"
输出: 2
示例 2:

输入: haystack = "aaaaa", needle = "bba"
输出: -1
说明:

当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。

对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与C语言的 strstr() 以及 Java的 indexOf() 定义相符。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/implement-strstr
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法 1：滑动窗口+子串逐一比较

### 思路

用一个 `needle` 长度的滑动窗口滑动遍历 `haystack`，每次滑动都比较窗口内的子字符串和 `needle`（其实只要窗口和 `needle` 的第一个字母相同才开始比较）。

### 复杂度分析

-   时间复杂度：O$((m-n)*n)$，m 是 haystack 的长度，n 是 needle 的长度。
-   空间复杂度：O$(1)$。

### 代码

JavaScript Code

```js
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    if (!needle) return 0;

    let l = 0,
        r = needle.length;
    while (r <= haystack.length) {
        if (haystack[l] === needle[0] && compare(haystack, needle, l, r))
            return l;
        l++;
        r++;
    }
    return -1;

    // ********************************
    function compare(long, short, l, r) {
        for (let i = 0; i < r - l; i++) {
            if (long[i + l] !== short[i]) return false;
        }
        return true;
    }
};
```
