# 66.加一

## 题目描述

```
给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。

最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

你可以假设除了整数 0 之外，这个整数不会以零开头。

示例 1:

输入: [1,2,3]
输出: [1,2,4]
解释: 输入数组表示数字 123。
示例 2:

输入: [4,3,2,1]
输出: [4,3,2,2]
解释: 输入数组表示数字 4321。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/plus-one
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 我的回答

https://github.com/leetcode-pp/91alg-1/issues/1#issuecomment-636585991

### 思路

数学计算，用 `carry` 来表示进位。如果可以修改原数组的话，那 `carry` 等于 0 的时候就可以停止遍历了，如果需要返回新数组，还需要遍历剩下的元素复制到新数组

### 代码
```js
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    let carry = 1,
        sum = 0,
        index = digits.length - 1
    
    while (carry > 0 && index > -1) {
        sum = digits[index] + 1
        carry = Math.floor(sum / 10)
        digits[index] = sum % 10
        index--
    }
    carry && digits.unshift(carry)
    
    return digits
};
```

# 参考回答

## 前置知识

- 数组的遍历(正向遍历和反向遍历)

## 思路

这道题其实我们可以把它想象成小学生练习加法，只不过现在是固定的“加一”那么我们只需要考虑如何通过遍历来实现这个加法的过程就好了。

加法我们知道要从低位到高位进行运算，那么只需要对数组进行一次反向遍历即可。

伪代码：

```java
for(int i = n - 1; i > - 1; i --) {
  内部逻辑
}
```

内部逻辑的话，其实有三种情况：

```
1. 个位上的数字小于9
    17
+   1
= 18
2. 个位数上等于9，其他位数可以是0-9的任何数，但是首位不等于9
    199
+     1
=  200

    109
+      1
=  110
3. 所有位数都为9
    99
+    1
= 100

      999
+       1
=  1000
```

第一种情况是最简单的，我们只需将数组的最后一位进行+1操作就好了

第二种情况稍微多了一个步骤：我们需要把个位的carry向前进一位并在计算是否有更多的进位

第三种其实和第二种是一样的操作，只是由于我们知道数组的长度是固定的，所以当我们遇到情况三的时候需要扩大数组的长度。我们只需要在结果数组前多加上一位就好了。

```js
// 首先我们要从数组的最后一位开始我们的计算得出我们新的sum
sum = arr[arr.length - 1] + 1

// 接下来我们需要判断这个新的sum是否超过9
sum > 9 ?

// 假如大于 9, 那么我们会更新这一位为 0 并且将carry值更改为1
carry = 1
arr[i] = 0

// 假如不大于 9，更新最后一位为sum并直接返回数组
arr[arr.length - 1] = sum
return arr

// 接着我们要继续向数组的倒数第二位重复进行我们上一步的操作
...

// 当我们完成以后，如果数组第一位时的sum大于0，那么我们就要给数组的首位增添一个1
result = new array with size of arr.length + 1
result[0] = 1
result[1] ...... result[result.length - 1]  = 0 // 
```
## 代码

```js
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    var carry = 1 // 我们将初始的 +1 也当做是一个在个位的 carry
    for(var i = digits.length - 1; i > -1; i-- ) {
        if(carry) {
            var sum = carry + digits[i]
            digits[i] = sum % 10
            carry = sum > 9 ? 1 : 0 // 每次计算都会更新下一步需要用到的 carry
        }
    }
    if(carry === 1) {
        digits.unshift(1) // 如果carry最后停留在1，说明有需要额外的一个长度 所以我们就在首位增添一个 1
    }
    return digits
};
```

_Originally posted by @azl397985856 in https://github.com/leetcode-pp/91alg-1/issues/1#issuecomment-636883697_