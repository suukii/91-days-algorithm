# 645.错误的集合

https://leetcode-cn.com/problems/set-mismatch

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

- 遍历数组，用哈希表记录出现过哪些数字，以及重复出现的数字是哪个。
- 遍历数字 1-n，检查数字是否存在哈希表中，不存在则说明是缺失的数字。

### 复杂度分析

- 时间复杂度：O(N)，N 为数组长度。
- 空间复杂度：O(N)，N 为数组长度。

### 代码

JavaScript Code

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function (nums) {
  if (!nums || nums.length === 0) return []

  const map = {}
  let duplicate = 0

  nums.forEach((n) => {
    n in map && (duplicate = n)
    map[n] = true
  })

  for (let i = 1, n = nums.length; i <= n; i++) {
    if (i in map) continue
    return [duplicate, i]
  }
}
```

### 输入输出

Node

```js
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
    const output = findErrorNums(JSON.parse(line))
    outputs.push(output)
  })

  console.log('\n输出：\n')
  outputs.forEach((el) => console.log(`${JSON.stringify(el)}`))
})
```

_Originally posted by @suukii in https://github.com/leetcode-pp/91alg-1/issues/44#issuecomment-647280921_

**官方题解**

# #645 错误的集合

## 前置知识

- 哈希表
- 求和公式

### 思路

读完了题，大概题目是要干什么了，就是有 1-n 这么一个 n 个元素的集合，但是有一个元素重复了，这样就导致有一个元素消失了，我们就是要找出重复的元素和消失的元素是谁。

写代码如果不能立刻想到最优解，那么先按最简单的暴力去写看看能不能过，然后再考虑如何去优化就行，没必要上来就写最优解。

回到该题，既然元素是啥都知道了，我们就挨个元素判断就行，这样不就找出来谁是多的谁是少的了嘛，上代码

```java
public int[] findErrorNums(int[] nums) {

    // 简单防御编程
    if (nums == null || nums.length <= 1)
        return new int[]{};

    int duplicate = -1, miss = -1;
    // 从1到N挨个判断
    for (int i = 1; i <= nums.length; i++) {

        int count = 0;

        for (int j = 0; j < nums.length; j++)
            if (nums[j] == i)
                count++;
        // 重复
        if (count == 2)
            duplicate = i;
        // 丢失
        else if (count == 0)
            miss = i;
    }
    return new int[] {duplicate, miss};
}
```

看看上面代码，明显时间复杂度是 N 的平方级，那么我们能不能试试优化一下呢？很明显，当我们找到了 duplicate 和 miss 就没必要继续遍历后面的元素了，这样虽然不能真正优化时间复杂度，但是实现了剪枝，同样效果不错！

```java
public int[] findErrorNums(int[] nums) {

    // 简单防御编程
    if (nums == null || nums.length <= 1)
        return new int[]{};

    int duplicate = -1, miss = -1;
    // 从1到N挨个判断
    for (int i = 1; i <= nums.length; i++) {

        int count = 0;

        for (int j = 0; j < nums.length; j++)
            if (nums[j] == i)
                count++;
        // 重复
        if (count == 2)
            duplicate = i;
        // 丢失
        else if (count == 0)
            miss = i;

        // 剪枝
        if (duplicate > 0 && miss > 0)
            break;
    }
    return new int[] {duplicate, miss};
}
```

复杂度还是平方级，我们再进一步考虑，元素是 1-N，那么我们自然可以用高斯求和公式来求出所有元素和，遍历一遍数组也能知道当前元素和，那么关键点就是能否用尽量少的时间找到这个重复元素，这样不难想到用哈希表来存入已经遍历的元素！找到了重复元素，知道了原本元素的和，又知道了当前元素的和，答案不就出来了嘛！

```java
public int[] findErrorNums(int[] nums) {

    // 简单防御编程
    if (nums == null || nums.length <= 1)
        return new int[]{};

    Set<Integer> set = new HashSet<>();
    int repeat = 0, lost = 0, sum = 0, len = nums.length;

    for (int i = 0; i < len; i++) {
        sum += nums[i];
        if (!set.add(nums[i]))
            repeat = nums[i];
    }
    // 自然数求和
    lost = (len * (len + 1)) / 2 - sum + repeat;

    return new int[]{repeat, lost};
}
```

至此，我们就将时间复杂度降到了 O(N)，如果大家还有啥更有趣的解题思路欢迎提交至 issue 下。

ps：希望大家刷完该题之后尽量再手动实现输入输出，相信我，只有好处没有坏处！

比如，如下输入格式：

```java
5
1 2 2 3 5
```

_Originally posted by @unclegem in https://github.com/leetcode-pp/91alg-1/issues/44#issuecomment-647545569_
