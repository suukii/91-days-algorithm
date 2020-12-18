# 380.常数时间插入、删除和获取随机元素

https://leetcode-cn.com/problems/insert-delete-getrandom-o1/

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

| 数组操作           | 时间复杂度 |
| ------------------ | ---------- |
| 随机访问           | $O(1)$     |
| 插入数值到数组     | $O(N)$     |
| 插入数值到数组最后 | $O(1)$     |
| 从数组删除数值     | $O(N)$     |
| 从数组最后删除数值 | $O(1)$     |

| 链表操作           | 时间复杂度 |
| ------------------ | ---------- |
| 访问               | $O(N)$     |
| 插入数值到链表     | $O(N)$     |
| 插入数值到链表开头 | $O(1)$     |
| 从链表删除数值     | $O(N)$     |
| 从链表开头删除数值 | $O(1)$     |

很显然，链表时间复杂度为 $O(N)$ 的访问操作并不符合我们的需求，所以我们还是选择数组来作为存储数据的容器。

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

-   `set.insert(2)` 表示往集合中插入数值 2，成功插入返回 true，如果 2 已经存在集合中返回 false
-   `set.remove(2)` 表示从集合中删除数值 2，成功删除返回 true，如果 2 不存在集合中返回 false

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
        this.array = [];
        // store the value-> index mapping
        this.map = {};
    }

    insert(val) {
        if (val in this.map) return false;
        this.array.push(val);
        this.map[val] = this._size() - 1;
        return true;
    }

    remove(val) {
        if (!(val in this.map)) return false;

        const index = this.map[val];
        const lastIndex = this._size() - 1;
        if (index < lastIndex) {
            this._swap(index, lastIndex);
            this.map[this.array[index]] = index;
        }
        this.array.pop();
        delete this.map[val];
        return true;
    }

    getRandom() {
        const size = this._size();
        if (size === 0) return false;
        let randomIndex = Math.floor(Math.random() * size);
        return this.array[randomIndex];
    }

    _size() {
        return this.array.length;
    }

    _swap(a, b) {
        const temp = this.array[b];
        this.array[b] = this.array[a];
        this.array[a] = temp;
    }
}
```

_Originally posted by @suukii in https://github.com/leetcode-pp/91alg-1/issues/23#issuecomment-640231502_

**[参考题解](_Originally posted by @azl397985856 in https://github.com/leetcode-pp/91alg-1/issues/23#issuecomment-640155651_)**
