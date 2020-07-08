# 1.两数之和

https://leetcode-cn.com/problems/two-sum

## 题目描述

```
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。



示例:

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/two-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

### 思路

在遍历数组的同时把数字和下标存进哈希表中，然后看下`目标值 - 当前数字`是否存在于哈希表中，有的话直接返回结果，没有就继续遍历。

### 代码

```py
class Solution(object):
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        hashmap = {}
        for i, n in enumerate(nums):
            diff = target - n
            if diff in hashmap:
                return [hashmap[diff], i]
            hashmap[n] = i
```

**复杂度分析**

- 时间复杂度：O(N)，N 为数组长度，最坏的情况下数组中的每个元素都被访问一次，访问数组元素的时间是 O(1)，哈希表插入和查询元素的时间也是 O(1)。
- 空间复杂度：O(N)，N 为数组长度，用来存元素和下标的哈希表所需的空间。

_Originally posted by @suukii in https://github.com/leetcode-pp/91alg-1/issues/40#issuecomment-646563166_

**官方题解**

# 1. 两数之和

## 前置知识

- 哈希表

## 思路

读完这个题，咱们反手先来个暴力题解。

```java
public int[] twoSum(int[] nums, int target) {

    // 例行防御编程，养成习惯
    if (nums == null || nums.length == 0)
        return new int[]{};


    for (int i = 0; i < nums.length - 1; i++)
        for (int j = i + 1; j < nums.length; j++)
            if (nums[i] + nums[j] == target)
                return new int[]{i, j};

    return new int[]{};
}
```

**_复杂度分析_**

- 时间复杂度：$O(N ^ 2)$
- 空间复杂度：$O(1)$

这个时间复杂度达到平方了，有啥办法优化呢，其实透过这个专题，大家已经有思路了吧，没错，就是用哈希表。

遍历数组的过程中不断的将元素存入哈希表，如果出现了符合要求的答案，直接返回就好啦。因为题目说了，只有一个答案哦！通过这第一道题大家应该能感受到 hash 表的神奇了。

## 代码

代码支持：Java

```java
public int[] twoSum(int[] nums, int target) {

    // 例行防御编程，养成习惯
    if (nums == null || nums.length == 0)
        return new int[]{};

    Map<Integer, Integer> map = new HashMap<>();

    for (int i = 0; i < nums.length; i++) {

        if (map.containsKey(nums[i]))
            return new int[]{map.get(nums[i]), i};

        map.put(target - nums[i], i);
    }

    return new int[]{};
}
```

**_复杂度分析_**

- 时间复杂度：$O(N)$
- 空间复杂度：$O(N)$

大家参加笔试的时候， 很多情况需要自己处理输入，这是和 LeetCode 不同的地方。 因此大家在平时练习过程中可以练习下自己处理输入。比如该题的输入可能是：

```
第一行代表n个元素和target， 第二行是n个元素，按空格分割
3 4
2 1 2
```

下面给个 Java 样例

```java
Scanner scan = new Scanner(System.in);
String[] firstLine = scan.nextLine().trim().split(" ");
int n = Integer.parseInt(firstLine[0]), target = Integer.parseInt(firstLine[1]);
String[] vals = scan.nextLine().trim().split(" ");

int[] arr = new int[vals.length];
for (int i = 0; i < arr.length; i++)
    arr[i] = Integer.parseInt(vals[i]);
```

_Originally posted by @unclegem in https://github.com/leetcode-pp/91alg-1/issues/40#issuecomment-646613516_
