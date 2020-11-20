# 215. 数组中的第 K 个最大元素

https://leetcode-cn.com/problems/kth-largest-element-in-an-array/

- [215. 数组中的第 K 个最大元素](#215-数组中的第-k-个最大元素)
  - [题目描述](#题目描述)
  - [方法 1：排序](#方法-1排序)
    - [思路](#思路)
    - [复杂度分析](#复杂度分析)
    - [代码](#代码)
  - [方法 2：小顶堆](#方法-2小顶堆)
    - [思路](#思路-1)
    - [复杂度分析](#复杂度分析-1)
    - [代码](#代码-1)

## 题目描述

```
在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

示例 1:

输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
示例 2:

输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
说明:

你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/kth-largest-element-in-an-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法 1：排序

### 思路

直接给数组降序排序，再输出第 `k-1` 个数字。

### 复杂度分析

-   时间复杂度：$O(NlogN)$，N 是数组长度。
-   空间复杂度：$O(1)$。

### 代码

JavaScript Code

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    // 降序排序
    nums.sort((a, b) => b - a);
    return nums[k - 1];
};
```

## 方法 2：小顶堆

### 思路

维护一个大小为 k 的小顶堆，最后输出堆顶。

大顶堆也可以，就不写了。

### 复杂度分析

-   时间复杂度：$O(klogk)$。
-   空间复杂度：$O(k)$。

### 代码

JavaScript Code

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    const minHeap = new MinHeap();

    nums.forEach(n => {
        const size = minHeap.size();
        if (size < k) minHeap.insert(n);
        else if (size === k) {
            if (minHeap.peek() < n) {
                minHeap.pop();
                minHeap.insert(n);
            }
        }
    });
    return minHeap.peek();
};

// *************************************************

class Heap {
    constructor(list = [], comparator) {
        this.list = list;
        this.comparator = comparator;

        this.init();
    }

    init() {
        const size = this.size();
        for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
            this.heapify(this.list, size, i);
        }
    }

    insert(n) {
        this.list.push(n);
        const size = this.size();
        for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
            this.heapify(this.list, size, i);
        }
    }

    peek() {
        return this.list[0];
    }

    pop() {
        const last = this.list.pop();
        if (this.size() === 0) return last;
        const returnItem = this.list[0];
        this.list[0] = last;
        this.heapify(this.list, this.size(), 0);
        return returnItem;
    }

    size() {
        return this.list.length;
    }
}

class MinHeap extends Heap {
    constructor(list, comparator) {
        if (typeof comparator != 'function') {
            comparator = function comparator(inserted, compared) {
                return inserted > compared;
            };
        }
        super(list, comparator);
    }

    heapify(arr, size, i) {
        let smallest = i;
        const left = Math.floor(i * 2 + 1);
        const right = Math.floor(i * 2 + 2);
        if (left < size && this.comparator(arr[smallest], arr[left]))
            smallest = left;
        if (right < size && this.comparator(arr[smallest], arr[right]))
            smallest = right;

        if (smallest !== i) {
            [arr[smallest], arr[i]] = [arr[i], arr[smallest]];
            this.heapify(arr, size, smallest);
        }
    }
}
```
