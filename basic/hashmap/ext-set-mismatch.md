# 645.错误的集合

https://leetcode-cn.com/problems/set-mismatch

- [645.错误的集合](#645错误的集合)
  - [题目描述](#题目描述)
    - [思路](#思路)
    - [复杂度分析](#复杂度分析)
    - [代码](#代码)
    - [输入输出](#输入输出)

## 题目描述

```
集合 S 包含从1到 n 的整数。不幸的是，因为数据错误，导致集合里面某一个元素复制了成了集合里面的另外一个元素的值，导致集合丢失了一个整数并且有一个元素重复。

给定一个数组 nums 代表了集合 S 发生错误后的结果。你的任务是首先寻找到重复出现的整数，再找到丢失的整数，将它们以数组的形式返回。

示例 1:

输入: nums = [1,2,2,4]
输出: [2,3]
注意:

给定数组的长度范围是 [2, 10000]。
给定的数组是无序的。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/set-mismatch
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

### 思路

-   遍历数组，用哈希表记录出现过哪些数字，以及重复出现的数字是哪个。
-   遍历数字 1-n，检查数字是否存在哈希表中，不存在则说明是缺失的数字。

### 复杂度分析

-   时间复杂度：$O(N)$，N 为数组长度。
-   空间复杂度：$O(N)$，N 为数组长度。

### 代码

JavaScript Code

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function (nums) {
    if (!nums || nums.length === 0) return [];

    const map = {};
    let duplicate = 0;

    nums.forEach(n => {
        n in map && (duplicate = n);
        map[n] = true;
    });

    for (let i = 1, n = nums.length; i <= n; i++) {
        if (i in map) continue;
        return [duplicate, i];
    }
};
```

### 输入输出

Node

```js
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log('\n输入：\n');
rl.prompt();
const inputs = [];
rl.on('line', line => inputs.push(line));

const outputs = [];
rl.on('close', () => {
    inputs.forEach(line => {
        const output = findErrorNums(JSON.parse(line));
        outputs.push(output);
    });

    console.log('\n输出：\n');
    outputs.forEach(el => console.log(`${JSON.stringify(el)}`));
});
```
