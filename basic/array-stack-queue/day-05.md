# 232.用栈实现队列

https://leetcode-cn.com/problems/implement-queue-using-stacks/

## 题目描述

```
使用栈实现队列的下列操作：

push(x) -- 将一个元素放入队列的尾部。
pop() -- 从队列首部移除元素。
peek() -- 返回队列首部的元素。
empty() -- 返回队列是否为空。
示例:

MyQueue queue = new MyQueue();

queue.push(1);
queue.push(2);
queue.peek();  // 返回 1
queue.pop();   // 返回 1
queue.empty(); // 返回 false
说明:

你只能使用标准的栈操作 -- 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）。


来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/implement-queue-using-stacks
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法一

#### 思路

由于队列是 FIFI (先进先出)，而栈是 FILO (先进后出)，如果要用栈来模拟队列，那么每次往队列尾端增加元素的时候，这个元素需要放在栈底，因为它是最后才会出列。

方法之一是，每次往队列尾端 `push` 一个新元素时，我们都先把栈中的元素尽数清空，然后把新元素入栈，再把刚刚清出来的元素放回栈中，所以还需要一个辅助栈来暂存清出来的元素。

#### 复杂度

- 时间复杂度：入列操作是 O(n)，每次入列时，除新增元素外，每个元素都需要分别出栈入栈 2 次 (从模拟队列的栈中弹出，压入辅助栈，再从辅助栈弹出，压入队列模拟栈)。压入、弹出操作的时间复杂度都是 O(1)，所以总的时间复杂度差不多是 O(4n)，忽略掉常数，最后得到 O(n)。出列操作是 O(1)。
- 空间复杂度：O(n)，n 是队列的大小，需要一个大小为 n 的栈来模拟队列，还需要一个大小为 n 的辅助空间，但总的空间复杂度还是 O(n)。

#### 代码

```js
class MyQueue {
  constructor() {
    this.stack = []
  }

  push(x) {
    const helper = []
    while (!this.empty()) {
      helper.push(this.stack.pop())
    }
    this.stack.push(x)
    while (helper.length) {
      this.stack.push(helper.pop())
    }
  }

  peek() {
    return this.stack[this.stack.length - 1]
  }

  pop() {
    return this.stack.pop()
  }

  empty() {
    return this.stack.length === 0
  }
}
```

## 方法二

#### 思路

方法一是在元素入列的时候，就考虑好了它出列的顺序，但我们还可以在元素需要出列的时候再来考虑这个问题。这样的话：

1. 入列时直接 `push` 到模拟栈中；
2. 出列时，由于先入列的元素在栈底，需要先把其他元素弹出，依次压入辅助栈；
3. 栈底元素弹出，出列；
4. 刚才出栈的其他元素依次从辅助栈弹出，重新压入模拟栈。

再仔细想想的话：

- 第 2 步中，辅助栈中的元素出栈顺序刚好就是队列的出列顺序；
- 所以到第 4 步的时候，我们根本没必要把元素再从辅助栈转移到模拟栈；
- 下一次 `pop` 操作时，直接从辅助栈弹出元素就可以了；
- 如果辅助栈中没有元素了，我们再重复第 2 步。

这样的话，我们的队列元素其实是用了两个栈来储存，所以在判断队列是否为空的时候，两个栈都要考虑进去。

#### 复杂度

- 时间复杂度：入列是 O(1)，出列最差的情况就是每个元素都要从模拟栈中弹出，压入辅助栈，再从辅助栈中弹出，所以是 O(n)。
- 空间复杂度：O(n)，n 为队列大小。

#### 代码

```js
class MyQueue {
  constructor() {
    this.stack = new MyStack()
    this.helper = new MyStack()
  }

  push(x) {
    this.stack.push(x)
  }

  peek() {
    if (this.helper.empty()) {
      while (!this.stack.empty()) {
        this.helper.push(this.stack.pop())
      }
    }
    return this.helper.peek()
  }

  pop() {
    if (this.helper.empty()) {
      while (!this.stack.empty()) {
        this.helper.push(this.stack.pop())
      }
    }
    return this.helper.pop()
  }

  empty() {
    return this.stack.empty() && this.helper.empty()
  }
}

class MyStack {
  constructor() {
    this.stack = []
  }
  push(x) {
    this.stack.push(x)
  }
  pop() {
    return this.stack.pop()
  }
  peek() {
    return this.stack[this.stack.length - 1]
  }
  empty() {
    return this.stack.length === 0
  }
}
```

**官方题解**

## 题目地址

### [232. 用栈实现队列](https://leetcode-cn.com/problems/implement-queue-using-stacks/)

## 题目描述

使用栈实现队列的下列操作：

push(x) -- 将一个元素放入队列的尾部。
pop() -- 从队列首部移除元素。
peek() -- 返回队列首部的元素。
empty() -- 返回队列是否为空。
示例:

MyQueue queue = new MyQueue();

queue.push(1);
queue.push(2);
queue.peek(); // 返回 1
queue.pop(); // 返回 1
queue.empty(); // 返回 false
说明:

你只能使用标准的栈操作 -- 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
假设所有操作都是有效的、 （例如，一个空的队列不会调用 pop 或者 peek 操作）。

## 前置知识

- 栈
- 队列

## 思路

题目要求用栈的原生操作来实现队列，也就是说需要用到 pop 和 push
但是我们知道 pop 和 push 都是在栈顶的操作，而队列的 enque 和 deque 则是在队列的两端的操作，这么一看一个 stack 好像不太能完成。

我们来分析一下过程。

假如向栈中分别 push 四个数字 `1, 2, 3, 4`，那么此时栈的情况应该是：

![image](https://user-images.githubusercontent.com/12479470/83890684-abe74600-a77e-11ea-88fc-6c35361b5ba4.png)

如果此时按照题目要求 pop 或者 peek 的话， 应该是返回 1 才对，而 1 在栈底我们无法直接操作。如果想要返回 1，我们首先要将 2，3，4 分别出栈才行。

![image](https://user-images.githubusercontent.com/12479470/83892430-39c43080-a781-11ea-8565-d580bb964ad6.png)

然而，如果我们这么做，1 虽然是正常返回了，但是 2，3，4 不就永远消失了么？ 一种简答方法就是，将 2，3，4 **存** 起来。而题目又说了，只能使用栈这种数据结构，那么我们考虑使用一个额外的栈来存放弹出的 2，3，4。

![image](https://user-images.githubusercontent.com/12479470/83895374-32068b00-a785-11ea-9705-888db2967d9f.png)
（pop 出来不扔掉，而是存起来）

整个过程类似这样：

![image](https://user-images.githubusercontent.com/12479470/83895434-434f9780-a785-11ea-9720-165231272ff1.png)

比如，这个时候，我们想 push 一个 5，那么大概就是这样的：

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfhu6exrzyj327g0u0gu9.jpg)

然而这一过程，我们也可以发生在 push 阶段。

总之，就是我们需要在 push 或者 pop 的时候，将数组在两个栈之间倒腾一次。

## 关键点

- 在 push 的时候利用辅助栈(双栈)

## 代码

- 语言支持：JS, Python, Java

Javascript Code:

```js
/*
 * @lc app=leetcode id=232 lang=javascript
 *
 * [232] Implement Queue using Stacks
 */
/**
 * Initialize your data structure here.
 */
var MyQueue = function () {
  // tag: queue stack array
  this.stack = []
  this.helperStack = []
}

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  let cur = null
  while ((cur = this.stack.pop())) {
    this.helperStack.push(cur)
  }
  this.helperStack.push(x)

  while ((cur = this.helperStack.pop())) {
    this.stack.push(cur)
  }
}

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  return this.stack.pop()
}

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  return this.stack[this.stack.length - 1]
}

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return this.stack.length === 0
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
```

Python Code:

```python
class MyQueue:

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.stack = []
        self.help_stack = []

    def push(self, x: int) -> None:
        """
        Push element x to the back of queue.
        """
        while self.stack:
            self.help_stack.append(self.stack.pop())
        self.help_stack.append(x)
        while self.help_stack:
            self.stack.append(self.help_stack.pop())

    def pop(self) -> int:
        """
        Removes the element from in front of queue and returns that element.
        """
        return self.stack.pop()

    def peek(self) -> int:
        """
        Get the front element.
        """
        return self.stack[-1]

    def empty(self) -> bool:
        """
        Returns whether the queue is empty.
        """
        return not bool(self.stack)


# Your MyQueue object will be instantiated and called as such:
# obj = MyQueue()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.peek()
# param_4 = obj.empty()
```

Java Code

```java
class MyQueue {
    Stack<Integer> pushStack = new Stack<> ();
    Stack<Integer> popStack = new Stack<> ();

    /** Initialize your data structure here. */
    public MyQueue() {

    }

    /** Push element x to the back of queue. */
    public void push(int x) {
        while (!popStack.isEmpty()) {
            pushStack.push(popStack.pop());
        }
        pushStack.push(x);
    }

    /** Removes the element from in front of queue and returns that element. */
    public int pop() {
        while (!pushStack.isEmpty()) {
            popStack.push(pushStack.pop());
        }
        return popStack.pop();
    }

    /** Get the front element. */
    public int peek() {
        while (!pushStack.isEmpty()) {
            popStack.push(pushStack.pop());
        }
        return popStack.peek();
    }

    /** Returns whether the queue is empty. */
    public boolean empty() {
        return pushStack.isEmpty() && popStack.isEmpty();
    }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * MyQueue obj = new MyQueue();
 * obj.push(x);
 * int param_2 = obj.pop();
 * int param_3 = obj.peek();
 * boolean param_4 = obj.empty();
 */
```

**_复杂度分析_**

- 时间复杂度：$O(N)$，其中 N 为 栈中元素个数，因为每次我们都要倒腾一次。
- 空间复杂度：$O(N)$，其中 N 为 栈中元素个数，多使用了一个辅助栈，这个辅助栈的大小和原栈的大小一样。

## 扩展

- 类似的题目有用队列实现栈，思路是完全一样的，大家有兴趣可以试一下。
- 栈混洗也是借助另外一个栈来完成的，从这点来看，两者有相似之处。

## 延伸阅读

实际上现实中也有使用两个栈来实现队列的情况，那么为什么我们要用两个 stack 来实现一个 queue？

其实使用两个栈来替代一个队列的实现是为了在多进程中分开对同一个队列对读写操作。一个栈是用来读的，另一个是用来写的。当且仅当读栈满时或者写栈为空时，读写操作才会发生冲突。

当只有一个线程对栈进行读写操作的时候，总有一个栈是空的。在多线程应用中，如果我们只有一个队列，为了线程安全，我们在读或者写队列的时候都需要锁住整个队列。而在两个栈的实现中，只要写入栈不为空，那么`push`操作的锁就不会影响到`pop`。

- [reference](https://leetcode.com/problems/implement-queue-using-stacks/discuss/64284/Do-you-know-when-we-should-use-two-stacks-to-implement-a-queue)

- [further reading](https://stackoverflow.com/questions/2050120/why-use-two-stacks-to-make-a-queue/2050402#2050402)

更多题解可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 30K star 啦。

大家也可以关注我的公众号《力扣加加》获取更多更新鲜的 LeetCode 题解

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfcuzagjalj30p00dwabs.jpg)

_Originally posted by @azl397985856 in https://github.com/leetcode-pp/91alg-1/issues/21#issuecomment-639573715_
