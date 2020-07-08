# 1381.设计一个支持增量操作的栈

https://leetcode-cn.com/problems/design-a-stack-with-increment-operation/

## 题目描述

```
请你设计一个支持下述操作的栈。

实现自定义栈类 CustomStack ：

CustomStack(int maxSize)：用 maxSize 初始化对象，maxSize 是栈中最多能容纳的元素数量，栈在增长到 maxSize 之后则不支持 push 操作。
void push(int x)：如果栈还未增长到 maxSize ，就将 x 添加到栈顶。
int pop()：弹出栈顶元素，并返回栈顶的值，或栈为空时返回 -1 。
void inc(int k, int val)：栈底的 k 个元素的值都增加 val 。如果栈中元素总数小于 k ，则栈中的所有元素都增加 val 。
 

示例：

输入：
["CustomStack","push","push","pop","push","push","push","increment","increment","pop","pop","pop","pop"]
[[3],[1],[2],[],[2],[3],[4],[5,100],[2,100],[],[],[],[]]
输出：
[null,null,null,2,null,null,null,null,null,103,202,201,-1]
解释：
CustomStack customStack = new CustomStack(3); // 栈是空的 []
customStack.push(1);                          // 栈变为 [1]
customStack.push(2);                          // 栈变为 [1, 2]
customStack.pop();                            // 返回 2 --> 返回栈顶值 2，栈变为 [1]
customStack.push(2);                          // 栈变为 [1, 2]
customStack.push(3);                          // 栈变为 [1, 2, 3]
customStack.push(4);                          // 栈仍然是 [1, 2, 3]，不能添加其他元素使栈大小变为 4
customStack.increment(5, 100);                // 栈变为 [101, 102, 103]
customStack.increment(2, 100);                // 栈变为 [201, 202, 103]
customStack.pop();                            // 返回 103 --> 返回栈顶值 103，栈变为 [201, 202]
customStack.pop();                            // 返回 202 --> 返回栈顶值 202，栈变为 [201]
customStack.pop();                            // 返回 201 --> 返回栈顶值 201，栈变为 []
customStack.pop();                            // 返回 -1 --> 栈为空，返回 -1
 

提示：

1 <= maxSize <= 1000
1 <= x <= 1000
1 <= k <= 1000
0 <= val <= 100
每种方法 increment，push 以及 pop 分别最多调用 1000 次

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/design-a-stack-with-increment-operation
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法一

#### 数组

使用数组来模拟栈，可以实现时间复杂度 O(1) 的 `push` 和 `pop`，和 O(k) 的 `inc`，剩下的就跟着题目描述来实现就好了。

- 当栈元素个数等于 `maxSize` 时不允许继续入栈；
- 当栈为空时，出栈操作返回 -1；
- 增量操作时，当栈元素多于 `k` 个，将栈底的 k 个元素都加 `val`，栈元素少于 `k` 个时将所有元素都加上 `val`。

#### 链表

也可以使用链表来模拟栈，入栈出栈都只操作 `head`，也能实现时间复杂度 O(1) 的 `push` 和 `pop` 操作，但 `inc` 操作的话，由于找到从链表尾端开始的第 `k` 个元素 (可以用双指针来找) 的时间复杂度是 O(n)，然后将链表尾端的 `k` 个元素进行增量操作的时间复杂度是 O(k)，所以增量操作总的时间复杂度是 O(n+k)。

### 代码

JavaScript Code

```js
/**
 * @param {number} maxSize
 */
var CustomStack = function (maxSize) {
  this.list = []
  this.maxSize = maxSize
}

/**
 * @param {number} x
 * @return {void}
 */
CustomStack.prototype.push = function (x) {
  if (this.list.length < this.maxSize) {
    this.list.push(x)
  }
}

/**
 * @return {number}
 */
CustomStack.prototype.pop = function () {
  const item = this.list.pop()
  return item === void 0 ? -1 : item
}

/**
 * @param {number} k
 * @param {number} val
 * @return {void}
 */
CustomStack.prototype.increment = function (k, val) {
  for (let i = 0; i < k && i < this.list.length; i++) {
    this.list[i] += val
  }
}

/**
 * Your CustomStack object will be instantiated and called as such:
 * var obj = new CustomStack(maxSize)
 * obj.push(x)
 * var param_2 = obj.pop()
 * obj.increment(k,val)
 */
```

Python Code

```py
class CustomStack(object):

    def __init__(self, maxSize):
        """
        :type maxSize: int
        """
        self.list = []
        self.maxSize = maxSize

    def size(self):
        return len(self.list)


    def push(self, x):
        """
        :type x: int
        :rtype: None
        """
        if self.size() < self.maxSize:
            self.list.append(x)


    def pop(self):
        """
        :rtype: int
        """
        return -1 if self.size() == 0 else self.list.pop()


    def increment(self, k, val):
        """
        :type k: int
        :type val: int
        :rtype: None
        """
        size = k if k < self.size() else self.size()
        for i in range(0, size):
            self.list[i] += val



# Your CustomStack object will be instantiated and called as such:
# obj = CustomStack(maxSize)
# obj.push(x)
# param_2 = obj.pop()
# obj.increment(k,val)
```

## 方法二

其实我们只在出栈时才关心元素的值，所以在增量操作的时候，可以不用去更新栈内的元素，而是用一个 hashMap 来记录第几个元素需要增加多少，出栈时，检查当前元素的下标是否在 hashMap 中有记录，有的话就加上增量再出栈。这样我们就得到了时间复杂度 O(1) 的增量操作，不过代价就是额外的 O(1) 空间。

### 图解

![](../assets/custom_stack.png)

### 代码

JavaScript Code

```js
/**
 * @param {number} maxSize
 */
var CustomStack = function (maxSize) {
  this.list = []
  this.maxSize = maxSize
  this.hashMap = {}
}

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
CustomStack.prototype._setInc = function (key, value) {
  if (!(key in this.hashMap)) {
    this.hashMap[key] = 0
  }
  this.hashMap[key] += value
}

/**
 * @param {number} key
 * @return {number}
 */
CustomStack.prototype._getInc = function (key) {
  return this.hashMap[key] || 0
}

/**
 * @return {number}
 */
CustomStack.prototype._size = function () {
  return this.list.length
}

/**
 * @param {number} x
 * @return {void}
 */
CustomStack.prototype.push = function (x) {
  if (this._size() < this.maxSize) {
    this.list.push(x)
  }
}

/**
 * @return {number}
 */
CustomStack.prototype.pop = function () {
  const top = this._size() - 1
  const inc = this._getInc(top)

  let item = this.list.pop()
  if (item === void 0) {
    return -1
  }

  item += inc
  const newTop = top - 1
  this._setInc(newTop, inc)
  this.hashMap[top] = 0
  return item
}

/**
 * @param {number} k
 * @param {number} val
 * @return {void}
 */
CustomStack.prototype.increment = function (k, val) {
  const size = this._size()
  k = k < size ? k - 1 : size - 1
  this._setInc(k, val)
}

/**
 * Your CustomStack object will be instantiated and called as such:
 * var obj = new CustomStack(maxSize)
 * obj.push(x)
 * var param_2 = obj.pop()
 * obj.increment(k,val)
 */
```

_Originally posted by @suukii in https://github.com/leetcode-pp/91alg-1/issues/18#issuecomment-637977959_

**官方题解**

## increment 时间复杂度为 $O(k)$ 的方法

### 思路

首先我们来看一种非常符合直觉的方法，然而这种方法并不好，increment 操作需要的时间复杂度为 $O(k)$。

`push`和 `pop` 就是普通的栈操作。 唯一要注意的是边界条件，这个已经在题目中指明了，具体来说就是：

- push 的时候要判断是否满了
- pop 的时候要判断是否空了

而做到上面两点，只需要一个 cnt 变量记录栈的当前长度，一个 size 变量记录最大容量，并在 pop 和 push 的时候更新 cnt 即可。

### 代码

```py
class CustomStack:

    def __init__(self, size: int):
        self.st = []
        self.cnt = 0
        self.size = size

    def push(self, x: int) -> None:
        if self.cnt < self.size:
            self.st.append(x)
            self.cnt += 1


    def pop(self) -> int:
        if self.cnt == 0: return -1
        self.cnt -= 1
        return self.st.pop()


    def increment(self, k: int, val: int) -> None:
        for i in range(0, min(self.cnt, k)):
            self.st[i] += val

```

**_复杂度分析_**

- 时间复杂度：push 和 pop 操作的时间复杂度为 $O(1)$（讲义有提到），而 increment 操作的时间复杂度为 $O(min(k, cnt))$
- 空间复杂度：$O(1)$

## increment 时间复杂度为 $O(1)$ 的方法

### 思路

和上面的思路类似，不过我们采用空间换时间的方式。采用一个额外的数组 incrementals 来记录每次 incremental 操作。

具体算法如下：

- 初始化一个大小为 maxSize 的数组， 并全部填充 0
- push 操作不变，和上面一样
- increment 的时候，我们将 incremental 信息，如何记录呢？我这里画了一个图

![image](https://user-images.githubusercontent.com/12479470/83656933-c096d300-a5f2-11ea-8f50-64ced5aa62f2.png)

如图黄色部分是我们需要执行增加操作，我这里画了一个挡板分割，实际上这个挡板不存在。那么如何记录黄色部分的信息呢？我举个例子来说

比如：

- 调用了 increment(3, 2)，就把 increment[3] 增加 2。
- 继续调用 increment(2, 5)，就把 increment[2] 增加 5。

![image](https://user-images.githubusercontent.com/12479470/83640207-6855d600-a5de-11ea-809e-bba303927707.png)

而当我们 pop 的时候：

- 只需要将栈顶元素**加上 increment[cnt - 1]** 即可， 其中 cnt 为栈当前的大小。
- 另外，我们需要将 increment[cnt - 1] 更新到 increment[cnt - 2]，并将 increment[cnt - 1] 重置为 0。

![image](https://user-images.githubusercontent.com/12479470/83640238-7146a780-a5de-11ea-8b81-81439353068f.png)

### 代码

```py
class CustomStack:

    def __init__(self, size: int):
        self.st = []
        self.cnt = 0
        self.size = size
        self.incrementals = [0] * size

    def push(self, x: int) -> None:
        if self.cnt < self.size:
            self.st.append(x)
            self.cnt += 1


    def pop(self) -> int:
        if self.cnt == 0: return -1
        if self.cnt >= 2:
            self.incrementals[self.cnt - 2] += self.incrementals[self.cnt - 1]
        ans = self.st.pop() + self.incrementals[self.cnt - 1]
        self.incrementals[self.cnt - 1] = 0
        self.cnt -= 1
        return ans


    def increment(self, k: int, val: int) -> None:
            if self.cnt:
                self.incrementals[min(self.cnt, k) - 1] += val
```

**_复杂度分析_**

- 时间复杂度：全部都是 $O(1)$
- 空间复杂度：我们维护了一个大小为 maxSize 的数组，因此平均到每次的空间复杂度为 $O(maxSize / N)$，其中 N 为操作数。

## 优化的 increment 时间复杂度为 $O(1)$ 的方法

### 思路

上面的思路无论如何，我们都需要维护一个大小为 $O(maxSize)$ 的数组 incremental 。而这实际上可以稍微优化一点。

### 代码

```py
class CustomStack:

    def __init__(self, size: int):
        self.st = []
        self.cnt = 0
        self.size = size
        self.incrementals = []

    def push(self, x: int) -> None:
        if self.cnt < self.size:
            self.st.append(x)
            self.incrementals.append(0)
            self.cnt += 1


    def pop(self) -> int:
        if self.cnt == 0: return -1
        self.cnt -= 1
        if self.cnt >= 1:
            self.incrementals[-2] += self.incrementals[-1]
        return self.st.pop() + self.incrementals.pop()


    def increment(self, k: int, val: int) -> None:
        if self.incrementals:
            self.incrementals[min(self.cnt, k) - 1] += val
```

**_复杂度分析_**

- 时间复杂度：全部都是 O(1)
- 空间复杂度：我们维护了一个大小为 cnt 的数组，因此平均到每次的空间复杂度为 $O(cnt / N)$，其中 N 为操作数，cnt 为操作过程中的栈的最大长度（小于等于 maxSize）。

可以看出优化的解法在 maxSize 非常大的时候是很有意义的。

## 相关题目

- [155. 最小栈](https://leetcode-cn.com/problems/min-stack/solution/chai-zhi-fa-155-zui-xiao-zhan-by-fe-lucifer/)

更多题解可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 30K star 啦。

大家也可以关注我的公众号《力扣加加》获取更多更新鲜的 LeetCode 题解

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfcuzagjalj30p00dwabs.jpg)

_Originally posted by @azl397985856 in https://github.com/leetcode-pp/91alg-1/issues/18#issuecomment-638268279_
