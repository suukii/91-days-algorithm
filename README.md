转到 Notion 上记录啦，更方便些，[戳这里🔗](https://suukii.notion.site/ca5e6d9d43704a9d82e44758636642d6?v=e7bdde0a51e9424fa96b876e78b03958)

这个仓库可能不更新啦，内容也会逐步搬到 Notion 上的。

不过还是不要脸地说句，如果我的题解有帮到你的话，还是欢迎右上角 Star 🌟 这个仓库的。（拜托拜托ớ ₃ờ）

# LeetCode 题解

| 基础篇                      | 进阶篇                    | 专题篇                                  |
| --------------------------- | ------------------------- | --------------------------------------- |
| [数组/栈/队列](#数组栈队列) | [高频面试题](#高频面试题) | [二分法](#二分法)                       |
| [链表](#链表)               | [前缀树](#前缀树)         | [滑动窗口](#滑动窗口)                   |
| [树](#树)                   | [并查集](#并查集)         | [位运算](#位运算)                       |
| [哈希表](#哈希表)           | [跳表](#跳表)             | [搜索(BFS/DFS/回溯)](#搜索bfs-dfs-回溯) |
| [双指针](#双指针)           | [剪枝](#剪枝)             | [背包问题](#背包问题)                   |
| -                           | [字符串匹配](#字符串匹配) | [动态规划](#动态规划)                   |
| -                           | [堆](#堆)                 | [分治](#分治)                           |
| -                           | -                         | [贪心](#贪心)                           |

## 基础篇

### 数组，栈，队列

#### 每日一题

-   [x] [【day-01】66.加一](./basic/array-stack-queue/01.plus-one.md)
-   [x] [【day-02】821.字符的最短距离](./basic/array-stack-queue/02.shortest-distance-to-a-character.md)
-   [x] [【day-03】1381.设计一个支持增量操作的栈](./basic/array-stack-queue/03.design-a-stack-with-increment-operation.md)
-   [x] [【day-04】394.字符串解码](./basic/array-stack-queue/04.decode-string.md)
-   [x] [【day-05】232.用栈实现队列](./basic/array-stack-queue/05.implement-queue-using-stacks.md)
-   [x] [【day-06】768.最多能完成排序的块 II](./basic/array-stack-queue/06.max-chunks-to-make-sorted-ii.md)

#### 数组拓展题目

-   [x] [75.颜色分类](./basic/array-stack-queue/ext-sort-colors.md)
-   [x] [28.实现 strStr()](./basic/array-stack-queue/ext-implement-strstr.md)
-   [x] [380.常数时间插入、删除和获取随机元素](./basic/array-stack-queue/ext-insert-delete-getrandom-o1.md)
-   [x] [189.旋转数组](./basic/array-stack-queue/ext-rotate-array.md)
-   [ ] [59. 螺旋矩阵 II](https://leetcode-cn.com/problems/spiral-matrix-ii/)
-   [ ] [859. 亲密字符串](https://leetcode-cn.com/problems/buddy-strings/)

#### 栈拓展题目

-   [ ] [946. 验证栈序列](https://leetcode-cn.com/problems/validate-stack-sequences/)

#### 队列拓展题目

-   [ ] [155.最小栈](https://leetcode-cn.com/problems/min-stack/)
-   [ ] [更多](https://github.com/leetcode-pp/91alg-2/blob/master/lecture/basic-01.md#%E6%8E%A8%E8%8D%90%E9%A2%98%E7%9B%AE)

#### 相关专题

-   [ ] [前缀和](https://lucifer.ren/blog/2020/09/27/atMostK/)
-   [ ] [单调栈](https://github.com/leetcode-pp/91alg-2/blob/master/lecture/basic-01.md#%E5%8D%95%E8%B0%83%E6%A0%88)
-   [ ] [栈匹配](https://github.com/leetcode-pp/91alg-2/blob/master/lecture/basic-01.md#%E6%A0%88%E5%8C%B9%E9%85%8D)
-   [ ] [分桶](https://github.com/leetcode-pp/91alg-2/blob/master/lecture/basic-01.md#%E5%88%86%E6%A1%B6)
-   [ ] [链表反转](https://github.com/leetcode-pp/91alg-2/blob/master/lecture/basic-01.md#%E9%93%BE%E8%A1%A8%E5%8F%8D%E8%BD%AC)

### 链表

#### 每日一题

-   [x] [【day-07】24.两两交换链表中的节点](./basic/linked-list/07.swap-nodes-in-pairs.md)
-   [ ] [【day-08】61.旋转链表](./basic/linked-list/08.rotate-list.md)
-   [ ] [【day-09】109.有序链表转换二叉搜索树](./basic/linked-list/09.convert-sorted-list-to-binary-search-tree.md)
-   [x] [【day-10】160.相交链表](./basic/linked-list/10.intersection-of-two-linked-lists.md)
-   [x] [【day-11】142.环形链表 II](./basic/linked-list/11.linked-list-cycle-ii.md)
-   [x] [【day-12】146.LRU 缓存机制](./basic/linked-list/12.lru-cache.md)

#### 链表拓展题目

-   [x] [2.两数相加](./problems/2.add-two-numbers.md)
-   [x] [19.删除链表的倒数第 N 个结点](./problems/0019.remove-nth-node-from-end-of-list.md)
-   [x] [21.合并两个有序链表](./problems/0021.merge-two-sorted-lists.md)
-   [x] [83.删除排序链表中的重复元素](./basic/linked-list/ext-remove-duplicates-from-sorted-list.md)
-   [x] [206.反转链表](./basic/linked-list/ext-reverse-linked-list.md)

### 树

#### 每日一题

-   [x] [【day-13】104.二叉树的最大深度](./basic/binary-tree/13.maximum-depth-of-binary-tree.md)
-   [x] [【day-14】100.相同的树](./basic/binary-tree/14.same-tree.md)
-   [x] [【day-15】129.求根到叶子节点数字之和](./basic/binary-tree/15.sum-root-to-leaf-numbers.md)
-   [x] [【day-16】513.找树左下角的值](./basic/binary-tree/16.find-bottom-left-tree-value.md)
-   [x] [【day-17】297.二叉树的序列化与反序列化](./basic/binary-tree/17.serialize-and-deserialize-binary-tree.md)
-   [x] [【day-18】987.二叉树的垂序遍历](./basic/binary-tree/18.vertical-order-traversal-of-a-binary-tree.md)

#### 树拓展题目

-   [x] [105.从前序与中序遍历序列构造二叉树](./basic/binary-tree/ext-construct-binary-tree-from-preorder-and-inorder-traversal.md)
-   [x] [404.左叶子之和](./basic/binary-tree/ext-sum-of-left-leaves.md)
-   [x] [257.二叉树的所有路径](./basic/binary-tree/ext-binary-tree-paths.md)
-   [x] [112.路径总和](./basic/binary-tree/ext-path-sum.md)
-   [x] [543.二叉树的直径](./basic/binary-tree/ext-diameter-of-binary-tree.md)
-   [x] [98.验证二叉搜索树](./basic/binary-tree/ext-validate-binary-search-tree.md)

### 哈希表

#### 每日一题

-   [x] [【day-19】1.两数之和](./basic/hashmap/19.two-sum.md)
-   [x] [【day-20】347.前 K 个高频元素](./basic/hashmap/20.top-k-frequent-elements.md)
-   [x] [【day-21】447.回旋镖的数量](./basic/hashmap/21.number-of-boomerangs.md)
-   [x] [【day-22】3.无重复字符的最长子串](./basic/hashmap/22.longest-substring-without-repeating-characters.md)
-   [x] [【day-23】30.串联所有单词的子串](./basic/hashmap/23.substring-with-concatenation-of-all-words.md)
-   [x] [【day-24】37.解数独](./basic/hashmap/24.sudoku-solver.md)

#### 哈希表拓展题目

-   [x] [645.错误的集合](./basic/hashmap/ext-set-mismatch.md)
-   [x] [面试题 04.01.节点间通路](./basic/hashmap/ext-route-between-nodes-lcci.md)
-   [ ] [36.有效的数独](https://leetcode-cn.com/problems/valid-sudoku)
-   [x] [149.直线上最多的点数](./basic/hashmap/ext-max-points-on-a-line.md)

### 双指针

#### 每日一题

-   [x] [【day-25】35.搜索插入位置](./basic/two-pointers/25.search-insert-position.md)
-   [x] [【day-26】74.搜索二维矩阵](./basic/two-pointers/26.search-a-2d-matrix.md)
-   [x] [【day-27】26.删除排序数组中的重复项](./basic/two-pointers/27.remove-duplicates-from-sorted-array.md)
-   [x] [【day-28】876.链表的中间结点](./basic/two-pointers/28.middle-of-the-linked-list.md)
-   [x] [【day-29】1052.爱生气的书店老板](./basic/two-pointers/29.grumpy-bookstore-owner.md)
-   [x] [【day-30】239.滑动窗口最大值](./basic/two-pointers/30.sliding-window-maximum.md)

#### 双指针拓展题目

-   [x] [875.爱吃香蕉的珂珂](./basic/two-pointers/ext-koko-eating-bananas.md)
-   [x] [167.两数之和 II - 输入有序数组](./basic/two-pointers/ext-two-sum-ii-input-array-is-sorted.md)
-   [x] [42.接雨水](./basic/two-pointers/ext-trapping-rain-water.md)
-   [x] [面试题 17.11.单词距离](./basic/two-pointers/ext-find-closest-lcci.md)
-   [ ] [11.盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water)

## 进阶篇

### 高频面试题

**二叉树遍历系列**

-   [x] [【day-34】二叉树遍历系列](./medium/hot/34.traversal-of-binary-tree.md)

**反转链表系列**

-   [x] [【day-35】206.反转链表](./medium/hot/35.reverse-linked-list.md)
-   [x] [【day-35】92.反转链表 II](./medium/hot/35.reverse-linked-list-ii.md)
-   [x] [【day-35】25.K 个一组翻转链表](./medium/hot/35.reverse-nodes-in-k-group.md)

**位运算系列**

-   [ ] [【day-36】78.子集](./medium/hot/36.subsets.md)

**动态规划系列**

-   [x] [【day-37】62.不同路径](./medium/hot/37.unique-paths.md)
-   [x] [673. 最长递增子序列的个数](./medium/dp/number-of-longest-increasing-subsequence.md)
-   [ ] [70. 爬楼梯](./)
-   [ ] [121. 买卖股票的最佳时机](./)
-   [ ] [122. 买卖股票的最佳时机 II](./)
-   [ ] [123. 买卖股票的最佳时机 III](./)
-   [ ] [188. 买卖股票的最佳时机 IV](./)
-   [ ] [309. 最佳买卖股票时机含冷冻期](./)
-   [ ] [714. 买卖股票的最佳时机含手续费](./)

**有效括号系列**

-   [x] [【day-38】20.有效括号](./medium/hot/38.valid-parentheses.md)
-   [x] [【day-38】32.最长有效括号](./medium/hot/38.longest-valid-parentheses.md)

**设计系列**

-   [ ] [【day-39】剑指 Offer09.用两个栈实现队列](./)
-   [ ] [【day-39】641.设计循环双端队列](./)
-   [x] [【day-39】146.LRU 缓存机制](./basic/linked-list/12.lru-cache.md)
-   [ ] [【day-39】1206.设计跳表](./)

**前缀和系列**

-   [x] [【day-40】网易面试题](./medium/hot/40.netease.md)
-   [x] [【day-40】560.和为 K 的子数组](./medium/hot/40.subarray-sum-equals-k.md)
-   [x] [【day-40】1371.每个元音包含偶数次的最长子字符串](./medium/hot/40.find-the-longest-substring-containing-vowels-in-even-counts.md)

### 前缀树

-   [x] [【day-41】208.实现 Trie](./medium/trie/41.implement-trie-prefix-tree.md)
-   [x] [【day-42】677.键值映射](./medium/trie/42.map-sum-pairs.md)
-   [x] [【day-43】面试题 17.17.多次搜索](./medium/trie/43.multi-search-lcci.md)

### 并查集

#### 每日一题

-   [x] [【day-44】547.朋友圈](./medium/union-find/44.friend-circles.md)
-   [x] [【day-45】924.尽量减少恶意软件的传播](./medium/union-find/45.minimize-malware-spread.md)
-   [x] [【day-46】1319.连通网络的操作次数](./medium/union-find/46.number-of-operations-to-make-network-connected.md)

#### 拓展

-   [x] [1202.交换字符串中的元素](./medium/union-find/ext-smallest-string-with-swaps.md)

### 跳表

-   [ ] [【day-47】1206.设计跳表](./)

### 剪枝

#### 每日一题

-   [x] [【day-48】814.二叉树剪枝](./medium/prune/48.binary-tree-pruning.md)
-   [x] [【day-49】39.组合总和](./medium/prune/49.combination-sum.md)
-   [x] [【day-50】40.组合总和 II](./medium/prune/50.combination-sum-ii.md)
-   [ ] [【day-51】47.全排列 II](./medium/prune/51.permutations-ii.md)

### 字符串匹配

#### 每日一题

-   [ ] [【day-52】28.实现 strStr()](./medium/rk-kpm/52.implement-strstr.md)

#### 拓展题目

-   [ ] [1371.每个元音包含偶数次的最长子字符串](./medium/day-52.md)
-   [ ] [面试题 17.13.恢复空格](./medium/day-53.md)
-   [ ] [1316.不同的循环子字符串](./)
-   [ ] [215.数组中的第 K 个最大元素](./)
-   [ ] [451.根据字符出现频率排序](./)
-   [ ] [295.数据流的中位数](./)
-   [ ] [378.有序矩阵中第 K 小的元素](./)
-   [ ] [1054.距离相等的条形码](./)
-   [ ] [面试题 17.09.第 k 个数](./)

### 堆

#### 每日一题

-   [x] [【day-54】215.数组中的第 K 个最大元素](./medium/heap/54.kth-largest-element-in-an-array.md)
-   [x] [【day-55】1046.最后一块石头的重量](./medium/heap/55.last-stone-weight.md)
-   [x] [【day-56】23.合并 K 个升序链表](./medium/heap/56.merge-k-sorted-lists.md)
-   [x] [【day-57】451.根据字符出现频率排序](./medium/heap/57.sort-characters-by-frequency.md)
-   [x] [【day-58】378.有序矩阵中第 K 小的元素](./medium/heap/58.kth-smallest-element-in-a-sorted-matrix.md)
-   [x] [【day-59】1054.距离相等的条形码](./medium/heap/59.distant-barcodes.md)

## 专题篇

### 二分法

#### 每日一题

-   [x] [【day-61】69.x 的平方根](./topics/binary-search/61.sqrtx.md)
-   [x] [【day-62】278.第一个错误的版本](./topics/binary-search/62.first-bad-version.md)
-   [x] [【day-63】162.寻找峰值](./topics/binary-search/63.find-peak-element.md)

#### 拓展题目

-   [x] [33.搜索旋转排序数组](./topics/binary-search/ext-search-in-rotated-sorted-array.md)
-   [x] [81.搜索旋转排序数组 II](./topics/binary-search/ext-search-in-rotated-sorted-array-ii.md)
-   [ ] [34.在排序数组中查找元素的第一个和最后一个位置](./)
-   [ ] [4.寻找两个正序数组的中位数](./)
-   [ ] [222.完全二叉树的节点个数](./)

### 滑动窗口

#### 每日一题

-   [x] [【day-67】1456.定长子串中元音的最大数目](./topics/sliding-window/67.maximum-number-of-vowels-in-a-substring-of-given-length.md)
-   [ ] [【day-70】76.最小覆盖子串](./topics/day-70.md)
-   [ ] [【day-71】30.串联所有单词的子串](./topics/day-71.md)

#### 拓展题目

-   [x] [581.最短无序连续子数组](./topics/sliding-window/ext-shortest-unsorted-continuous-subarray.md)

### 位运算

-   [ ] [【day-72】268.缺失数字](./topics/day-72.md)
-   [ ] [【day-73】78.子集](./topics/day-73.md)

### 搜索(BFS, DFS, 回溯)

-   [x] [【day-74】1254.统计封闭岛屿的数目](./topics/day-74.md)
-   [ ] [【day-75】 51.N 皇后](./topics/day-75.md)
-   [ ] [【day-76】 130.被围绕的区域](./topics/day-76.md)
-   [ ] [【day-77】 827.最大人工岛](./topics/day-77.md)
-   [ ] [【day-78】 89.格雷编码](./topics/day-78.md)
-   [x] [【day-79】980.不同路径 III](./topics/day-79.md)

-   [x] [5210.球会落何处](./topics/searching/ext-where-will-the-ball-fall.md)

### 背包问题

-   [x] [【day-80】322.零钱兑换](./topics/day-80.md)
-   [x] [【day-81】416. 分割等和子集](./topics/day-81.md)
-   [x] [【day-82】494. 目标和](./topics/day-82.md)
-   [ ] [【day-83】474. 一和零](./topics/day-83.md)

### 动态规划

-   [ ] [【day-84】爬楼梯变种](./topics/day-84.md)
-   [ ] [【day-85】铺地毯-2021 网易校招](./topics/day-85.md)
-   [ ] [【day-86】935.骑士拨号器](./topics/day-86.md)
-   [ ] [【day-87】1458.两个子序列的最大点积](./topics/day-87.md)

### 分治

-   [x] [【day-88】96.不同的二叉搜索树](./topics/day-88.md)
-   [ ] [【day-89】23.合并 K 个升序链表](./topics/day-89.md)

### 贪心

#### 每日一题

-   [ ] [【day-90】765.情侣牵手](./topics/day-90.md)
-   [x] [【day-91】881.救生艇](./topics/day-91.md)

#### 贪心拓展题目

-   [x] [135.分发糖果](./topics/greedy/ext-candy.md)
-   [x] [455.分发饼干](./topics/greedy/ext-assign-cookies.md)
-   [x] [976.三角形的最大周长](./topics/greedy/ext-largest-perimeter-triangle.md)
-   [x] [435.无重叠区间](./topics/greedy/ext-non-overlapping-intervals.md)
-   [x] [605.种花问题](./topics/greedy/ext-can-place-flowers.md)

## 其他

-   [x] [77.组合](./extensions/77.combination.md)
-   [x] [5.最长回文子串](./extensions/5.longest-palindromic-substring.md)
-   [ ] [面试题 04.09. 二叉搜索树序列](./extensions/04.09.bst-sequences-lcci.md)

> [在线电子书](https://app.gitbook.com/@suki/s/91-days-algorithm/)
>
> [笔记](https://github.com/suukii/Articles#%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E7%AE%97%E6%B3%95)
