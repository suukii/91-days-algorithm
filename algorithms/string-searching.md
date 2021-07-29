# 字符串匹配算法

在一个长字符串或文章中，找出它是否包含一个或多个模式字符串及其位置。可以应用于生物基因匹配、信息检索等。

## Brute Force

数据量不大的情况下，可以使用固定长度的滑动窗口枚举长串的所有子串，逐一与模式串进行比较。

-   防御性编程(如模式串长度大于长串长度)
-   初始化长度为模式串长度的滑动窗口
-   将当前窗口的子串与模式串进行比较，若匹配成功，则记录相关信息如下标等
-   将滑动窗口后移一格

## Rabin-Karp (RK)

Rabin-Karp 是用于字符串匹配的算法

JavaScript Code

TODO

```js
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    if (!haystack || !needle || haystack.length < needle.length) return -1;

    const n = haystack.length,
        m = needle.length;

    let hash1 = initHash(haystack, 0, m);
    const hash2 = initHash(needle, 0, m);

    for (let i = 0; i <= n - m; i++) {
        if (i > 0 && i <= n - m) {
            hash1 = rehash(haystack, hash1, i - 1, i + m - 1, m);
        }

        if (hash1 === hash2 && compare(haystack, needle, i)) {
            return i;
        }
    }

    return -1;

    // ********************************************
    function initHash(string, start, end) {
        let hashVal = 0;
        for (let i = start; i < end; i++) {
            const c = string[i];
            hashVal +=
                (c.charCodeAt(0) - 'a'.charCodeAt(0)) *
                Math.pow(26, end - start);
        }
        return hashVal;
    }

    function rehash(string, hashVal, oldIdx, newIdx, patLen) {
        return (
            (hashVal -
                (string.charCodeAt(oldIdx) - 'a'.charCodeAt(0) + 1) *
                    Math.pow(26, patLen - 1)) *
                26 +
            (string.charCodeAt(newIdx) - 'a'.charCodeAt(0) + 1)
        );
    }

    function compare(string, pattern, start) {
        for (let i = 0; i < pattern.length; i++) {
            if (string[i + start] !== pattern[i]) return false;
        }
        return true;
    }
};

var a = strStr('lcode', 'code');

console.log(a);
```
