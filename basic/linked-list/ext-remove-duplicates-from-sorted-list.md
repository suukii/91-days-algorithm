# 83. 删除排序链表中的重复元素

https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list

- [83. 删除排序链表中的重复元素](#83-删除排序链表中的重复元素)
  - [题目描述](#题目描述)
  - [方法 1：迭代](#方法-1迭代)
    - [思路](#思路)
    - [复杂度分析](#复杂度分析)
    - [代码](#代码)

## 题目描述

```
给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

示例 1:

输入: 1->1->2
输出: 1->2
示例 2:

输入: 1->1->2->3->3
输出: 1->2->3

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法 1：迭代

### 思路

简单题，只是考察操作节点指针的能力，直接看代码吧。

### 复杂度分析

-   时间复杂度：O$(N)$，N 为链表长度。
-   空间复杂度：O$(1)$。

### 代码

JavaScript Code

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
    if (!head) return null;

    let cur = head;
    while (cur) {
        // 如果下一个节点与当前节点相同，删掉下一个节点
        while (cur.next && cur.next.val === cur.val) {
            const next = cur.next;
            cur.next = next.next;
            next.next = null;
        }
        // 前移一步
        cur = cur.next;
    }
    return head;
};
```
