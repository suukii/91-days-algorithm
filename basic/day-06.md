# 380.常数时间插入、删除和获取随机元素

https://leetcode-cn.com/problems/insert-delete-getrandom-o1/description/

## 题目描述

```
设计一个支持在平均 时间复杂度 O(1) 下，执行以下操作的数据结构。

insert(val)：当元素 val 不存在时，向集合中插入该项。
remove(val)：元素 val 存在时，从集合中移除该项。
getRandom：随机返回现有集合中的一项。每个元素应该有相同的概率被返回。
示例 :

// 初始化一个空的集合。
RandomizedSet randomSet = new RandomizedSet();

// 向集合中插入 1 。返回 true 表示 1 被成功地插入。
randomSet.insert(1);

// 返回 false ，表示集合中不存在 2 。
randomSet.remove(2);

// 向集合中插入 2 。返回 true 。集合现在包含 [1,2] 。
randomSet.insert(2);

// getRandom 应随机返回 1 或 2 。
randomSet.getRandom();

// 从集合中移除 1 ，返回 true 。集合现在包含 [2] 。
randomSet.remove(1);

// 2 已在集合中，所以返回 false 。
randomSet.insert(2);

// 由于 2 是集合中唯一的数字，getRandom 总是返回 2 。
randomSet.getRandom();
```

## 思路

首先得考虑的是，用数组还是用链表来存，先来复习一下数组和链表常见操作的时间复杂度吧。

### 数组常见操作时间复杂度分析

- 随机访问 -> O(1)
- 插入数值到数组 -> O(N)
- 插入数值到数组最后 -> O(1)
- 从数组删除数值 -> O(N)
- 从数组最后删除数值 -> O(1)

### 链表常见操作时间复杂度分析

- 访问 -> O(N)
- 插入数值到链表 -> O(N)
- 插入数值到链表开头 -> O(1)
- 从链表删除数值 -> O(N)
- 从链表开头删除数值 -> O(1)

很显然，链表时间复杂度为 O(N) 的访问操作并不符合我们的需求，所以我们还是选择数组来作为存储数据的容器。

### 插入

首先要实现常数时间插入元素，我们只能在数组最后插入。

**在数组最后插入元素**

![Untitled-2020-06-05-2052](https://user-images.githubusercontent.com/30331289/83948534-7743bf00-a850-11ea-80f4-9cd46fd75d1f.png)

**在数组其他位置插入元素**

![insert-o(n)](https://user-images.githubusercontent.com/30331289/83970694-9d796580-a909-11ea-9011-1d0724a2e77a.png)

### 获取随机元素

这个就很简单了，因为数组是可以通过下标随机访问的，我们只需要生成一个 0 ～ N-1 的随机数即可，N 为数组长度。

### 删除

删除元素的操作可以分为两种：

1. 删除末尾元素，时间复杂度为 O(1)

![remove-last](https://user-images.githubusercontent.com/30331289/83971346-863c7700-a90d-11ea-8540-efc31a712086.png)

2. 删除非末尾元素，因为删除位置之后的每个元素都要向前移动一步，所以时间复杂度是 O(N)

![remove-o(n)](https://user-images.githubusercontent.com/30331289/83949462-80d02580-a856-11ea-9260-77be04319d0d.png)

显然，如果我们想实现题目要求的 O(1) 时间的删除，只能在数组末尾进行删除操作。具体做法就是把要删除的元素和末尾的元素换个位置，然后再从数组末尾删除。

![remove-o(1)](https://user-images.githubusercontent.com/30331289/83971351-8ccaee80-a90d-11ea-80fd-25ec3995e7e2.png)
那我们再来看看 API 是怎么用的：

- `set.insert(2)` 表示往集合中插入数值 2，成功插入返回 true，如果 2 已经存在集合中返回 false
- `set.remove(2)` 表示从集合中删除数值 2，成功删除返回 true，如果 2 不存在集合中返回 false

可以看到这两个方法的参数都是值，而在数组中，要在常数时间内找到一个元素，必须要知道它的下标。所以显然我们还需要一个结构来记录集合中的值和它所在的数组下标的关系，这样一系列 `值->下标` 的对应关系，你应该能想到用一个哈希表来记录。

![hashmap 2](https://user-images.githubusercontent.com/30331289/83971179-85571580-a90c-11ea-9d55-ac8084caa9f7.png)

数组中存放着真正的值，而哈希表中存放着每个值所对应的数组下标。

但是，还有一个问题，还记得删除操作么？我们是先把要删除的元素和最后的元素换了位置再删除，换了位置后，两个元素的下标也变了。

![remove-swap](https://user-images.githubusercontent.com/30331289/83971306-58573280-a90d-11ea-85a8-883195931186.png)

所以很显然的，删除某个元素后，我们的哈希表也需要更新。

![update-hashmap](https://user-images.githubusercontent.com/30331289/83971286-3b226400-a90d-11ea-9bc1-012dcb67f885.png)

## 代码

```js
class RandomizedSet {
  constructor() {
    // store the actual values
    this.array = []
    // store the value-> index mapping
    this.map = {}
  }

  insert(val) {
    if (val in this.map) return false
    this.array.push(val)
    this.map[val] = this._size() - 1
    return true
  }

  remove(val) {
    if (!(val in this.map)) return false

    const index = this.map[val]
    const lastIndex = this._size() - 1
    if (index < lastIndex) {
      this._swap(index, lastIndex)
      this.map[this.array[index]] = index
    }
    this.array.pop()
    delete this.map[val]
    return true
  }

  getRandom() {
    const size = this._size()
    if (size === 0) return false
    let randomIndex = Math.floor(Math.random() * size)
    return this.array[randomIndex]
  }

  _size() {
    return this.array.length
  }

  _swap(a, b) {
    const temp = this.array[b]
    this.array[b] = this.array[a]
    this.array[a] = temp
  }
}
```

_Originally posted by @suukii in https://github.com/leetcode-pp/91alg-1/issues/23#issuecomment-640231502_

**官方题解**

## 题目地址（380. 常数时间插入、删除和获取随机元素）

https://leetcode-cn.com/problems/insert-delete-getrandom-o1/description/

## 思路

这是一个设计题。这道题的核心就是考察基本数据结构和算法的操作以及复杂度。

我们来回顾一下基础知识：

- 数组支持随机访问，其按照索引查询的时间复杂度为$O(1)$,按值查询的时间复杂度为$O(N)$， 而插入和删除的时间复杂度为$O(N)$。
- 链表不支持随机访问，其查询的时间复杂度为$O(N)$,但是对于插入和删除的复杂度为$O(1)$（不考虑找到选要处理的节点花费的时间）。
- 对于哈希表，正常情况下其查询复杂度平均为$O(N)$，插入和删除的复杂度为$O(1)$。

由于题目要求 getRandom 返回要随机并且要在$O(1)$复杂度内，那么如果单纯使用链表或者哈希表肯定是不行的。

而又由于对于插入和删除也需要复杂度为$O(1)$，因此单纯使用数组也是不行的，因此考虑多种使用数据结构来实现。

> 实际上 LeetCode 设计题，几乎没有单纯一个数据结构搞定的，基本都需要多种数据结构结合，这个时候需要你对各种数据结构以及其基本算法的复杂度有着清晰的认知。

对于 getRandom 用数组很简单。对于判断是否已经有了存在的元素，我们使用哈希表也很容易做到。因此我们可以将数组随机访问，以及哈希表$O(1)$按检索值的特性结合起来，即同时使用这两种数据结构。

对于删除和插入，我们需要一些技巧。

对于插入：

- 我们直接往 append，并将其插入哈希表即可。
- 对于删除，我们需要做到 O(1)。删除哈希表很明显可以，但是对于数组，平均时间复杂度为 O(1)。

因此如何应付删除的这种性能开销呢？ 我们知道对于数据删除，我们的时间复杂度来源于

1. `查找到要删除的元素`
2. 以及`重新排列被删除元素后面的元素`。

对于 1，我们可以通过哈希表来实现。 key 是插入的数字，value 是数组对应的索引。删除的时候我们根据 key 反查出索引就可以快速找到。

> 题目说明了不会存在重复元素，所以我们可以这么做。思考一下，如果没有这个限制会怎么样？

对于 2，我们可以通过和数组最后一项进行交换的方式来实现，这样就避免了数据移动。同时数组其他项的索引仍然保持不变，非常好！

> 相应地，我们插入的时候，需要维护哈希表

图解：

以依次【1，2，3，4】之后为初始状态，那么此时状态是这样的：

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfjm9sg9olj30pg11wwiu.jpg)

而当要插入一个新的 5 的时候， 我们只需要分别向数组末尾和哈希表中插入这条记录即可。

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfjmanhni6j30ka126tdm.jpg)

而删除的时候稍微有一点复杂：

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfjmbib4v5j30z60u049j.jpg)

## 关键点解析

- 数组
- 哈希表
- 数组 + 哈希表
- 基本算法时间复杂度分析

## 代码

```python
from random import random


class RandomizedSet:

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.data = dict()
        self.arr = []
        self.n = 0

    def insert(self, val: int) -> bool:
        """
        Inserts a value to the set. Returns true if the set did not already contain the specified element.
        """
        if val in self.data:
            return False
        self.data[val] = self.n
        self.arr.append(val)
        self.n += 1

        return True

    def remove(self, val: int) -> bool:
        """
        Removes a value from the set. Returns true if the set contained the specified element.
        """
        if val not in self.data:
            return False
        i = self.data[val]
        # 更新data
        self.data[self.arr[-1]] = i
        self.data.pop(val)
        # 更新arr
        self.arr[i] = self.arr[-1]
        # 删除最后一项
        self.arr.pop()
        self.n -= 1

        return True

    def getRandom(self) -> int:
        """
        Get a random element from the set.
        """

        return self.arr[int(random() * self.n)]


# Your RandomizedSet object will be instantiated and called as such:
# obj = RandomizedSet()
# param_1 = obj.insert(val)
# param_2 = obj.remove(val)
# param_3 = obj.getRandom()
```

**_复杂度分析_**

- 时间复杂度：$O(1)$
- 空间复杂度：$O(1)$

更多题解可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 30K star 啦。

大家也可以关注我的公众号《力扣加加》获取更多更新鲜的 LeetCode 题解

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfcuzagjalj30p00dwabs.jpg)

_Originally posted by @azl397985856 in https://github.com/leetcode-pp/91alg-1/issues/23#issuecomment-640155651_
