# 前缀和系列

**[网易面试题](#网易面试题)**

**[560.和为 K 的子数组](#560.和为K的子数组)**

**[1371.每个元音包含偶数次的最长子字符串](#1371.每个元音包含偶数次的最长子字符串)**

# 网易面试题

## 题目描述

```
有一个班级有 n 个人，给出 n 个元素，第 i 个元素代表 第 i 位同学的考试成绩，接下进行 m 次询问，每次询问给出一个数值 t ，表示第 t 个同学，然后需要我们输出第 t 个同学的成绩超过班级百分之几的人，百分数 p 可以这样算：p = (不超过第 t 个同学分数的人数 ) / n * 100%。输出的时候保留到小数点后 6 位，并且需要四舍五入。

输入描述：第一行输入两个数 n 和 m，两个数以空格隔开，表示 n 个同学和 m 次询问。第二行输入 n 个数值 ni，表示每个同学的分数，第三行输入 m 个数值mi，表示每次询问是询问第几个同学。（注意，这里 2<=n，m<=100000，0<=ni<=150，1<=mi<=n）

输出描述：输出 m 行，每一行输出一个百分数 p，代表超过班级百分之几的人。

示例1：

输入 ：

3 2

50 60 70

1 2

输出

33.333333%

66.666667%
```

## 思路

一开始我的思路是，先将 `scores` 数组排序，这样就能很容易算出 “有多少人不超过当前分数” 这个前缀和。但如果要将 `scores` 排序的话，还得另外记录 “第 mi 位同学” 排序后是第几位，这样就很麻烦，一点都不优雅。

今天看到 lucifer 的[公众号推文](https://mp.weixin.qq.com/s?__biz=MzI4MzUxNjI3OA==&mid=2247484133&idx=1&sn=8870dab18460b703b533554348bfbc2d&chksm=eb88cefcdcff47eaadeacd973aeb8f121f38d391836609634938012d4928c3ae05821b7de413&mpshare=1&scene=1&srcid=0709I7wtNzjBsdJCb6Scn047&sharer_sharetime=1594257607942&sharer_shareid=941e688bd70e39dd8c5830d69244a606&key=2cc21493b77c18de0932e4abe179e6b8bf5276701b5903d43b2a4e994c0a9c41c980ea9d342c09ca426a66ab8d432d35ba7ac74719fdf9190813c24066e3e8f0f6d8a6f4d9e2cdb1b6ca7e8164f7abb8&ascene=1&uin=MjY3NjAyNDkwOA%3D%3D&devicetype=Windows+10+x64&version=62090529&lang=zh_CN&exportkey=A5Dnu8F36bmWI9kheu9OEKA%3D&pass_ticket=EMd5fQITaaViEIM88E0TkfQdPbU3%2BdQeQ5UwK3eYZOalQ092cZJXi01KYB7Q9wyk)后，才发现原来可以把“分数”这个值本身当作数组下标啊，所以思路就变成了：

- 因为`分数`的范围是 `[0, 150]`，所以我们可以用一个长度为 150 的数组 `prefix` 来记录每个分数出现的次数，数组下标是`分数值`，数组的值就是分数出现的 `次数`；
- 遍历 `scores` 数组，对于每个分数 `s`，`prefix[s]++`；
- 遍历 `prefix`，计算前缀和；
- 然后我们就可以实现 O(1) 时间的：
  - 询问第 `mi` 位同学的分数能超过班上百分之几的人
  - 通过 `scores[mi]` 找到这位同学的分数 `s`
  - 通过 `prefix[s]` 找到不超过分数 `s` 的人数
  - 算数学吧

## 代码

JavaScript Code

```js
/**
 * @param {number[]} scores 全班同学的分数
 * @param {number} mi 第 mi 个同学
 * @return {number} 第 mi 个同学的分数能超过班级百分之几的人
 */
var test = function (scores, mi) {
  // 下标是分数，值是“有多少人是这个分数”
  const prefix = Array(151).fill(0)

  // 先遍历 scores 数组，统计每个分数的人数
  scores.forEach((s) => prefix[s]++)

  // 计算前缀和
  // 下标是分数，值是“有多少人不超过这个分数 <=”
  for (let i = 1; i < prefix.length; i++) {
    prefix[i] += prefix[i - 1]
  }

  // 第 mi 个同学的分数
  const score = scores[mi - 1]

  const p = (prefix[score] / scores.length) * 100
  return p.toFixed(6) + '%'
}
```

## 输入输出

```js
const __main__ = function () {
  const readline = require('readline')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  console.log('******输入******')
  rl.prompt()
  const inputs = []
  rl.on('line', (line) => inputs.push(line))

  rl.on('close', () => {
    const [n, m] = inputs[0].split(' ') // n 个同学， m 次询问
    const scores = inputs[1].split(' ').slice(0, n) // 全班同学的分数
    const asks = inputs[2].split(' ').slice(0, m) // 每次询问的是第几位同学

    console.log('\n******输出******')
    asks.forEach((mi) => {
      const p = test(scores, mi)
      console.log(p)
    })
  })
}
```

# 560.和为 K 的子数组

https://leetcode-cn.com/problems/subarray-sum-equals-k/

### 题目描述

```
给定一个整数数组和一个整数 k，你需要找到该数组中和为 k 的连续的子数组的个数。

示例 1 :

输入:nums = [1,1,1], k = 2
输出: 2 , [1,1] 与 [1,1] 为两种不同的情况。
说明 :

数组的长度为 [1, 20,000]。
数组中元素的范围是 [-1000, 1000] ，且整数 k 的范围是 [-1e7, 1e7]。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/subarray-sum-equals-k
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

### 思路

比较直白的想法是，先构建前缀和数组 `prefix`，然后在这个数组中找到所有满足条件的 `[i, j]` 区间，也就是 `prefix[j] - prefix[i]` 等于 K，但这样找得两层循环了，时间复杂度比较高。

有没有只需要遍历一遍数组的方法呢，其实只要算一点点数学就好了：

- 我们要找的一段区间 `[i, j]` 需要满足 `prefix[j] - prefix[i] == k` (i < j)。
- 也就是当我们在遍历到 `j` 这个位置的时候，只要往 `j` 的左边去找到有没有 `prefix[i]` 等于 `prefix[j] - k` 就行，满足条件的 `prefix[i]` 可能有一个或多个哦。
- 在遍历到 `j` 之前，我们已经遍历过 `i` 了 (i < j)，所以我们只需要在遍历到 `i` 的时候用一个哈希表把 `prefix[i]` 存起来，就能实现 O(1) 时间的查找。

其实我们连 `prefix` 数组都不需要，因为我们在算出一个前缀和的时候，就已经把它存到哈希表里面去了。所以可以只用一个变量 `prefix` 来计算前缀和，在遍历 `nums` 数组的过程中不断更新 `prefix`，同时检查 `map[prefix - k]` 是否在之前出现过。

### 复杂度分析

- 时间复杂度：O(n), n 为数组长度，只扫描了一次数组。
- 空间复杂度：O(n), n 为数组长度，使用了一个哈希表来存每个前缀和出现的次数。

### 代码

JavaScript Code

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  const map = {}
  let count = 0

  let prefix = 0
  map[prefix] = 1

  for (let i = 0; i < nums.length; i++) {
    prefix += nums[i]
    if (prefix - k in map) {
      count += map[prefix - k]
    }
    prefix in map || (map[prefix] = 0)
    map[prefix]++
  }
  return count
}
```

# 1371.每个元音包含偶数次的最长子字符串

https://leetcode-cn.com/problems/find-the-longest-substring-containing-vowels-in-even-counts/

### 题目描述

```
给你一个字符串 s ，请你返回满足以下条件的最长子字符串的长度：每个元音字母，即 'a'，'e'，'i'，'o'，'u' ，在子字符串中都恰好出现了偶数次。

 

示例 1：

输入：s = "eleetminicoworoep"
输出：13
解释：最长子字符串是 "leetminicowor" ，它包含 e，i，o 各 2 个，以及 0 个 a，u 。
示例 2：

输入：s = "leetcodeisgreat"
输出：5
解释：最长子字符串是 "leetc" ，其中包含 2 个 e 。
示例 3：

输入：s = "bcbcbc"
输出：6
解释：这个示例中，字符串 "bcbcbc" 本身就是最长的，因为所有的元音 a，e，i，o，u 都出现了 0 次。
 

提示：

1 <= s.length <= 5 x 10^5
s 只包含小写英文字母。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/find-the-longest-substring-containing-vowels-in-even-counts
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

### 思路

**暴力法**

我以前做的时候就是直接用暴力的，先假设满足条件的最长子字符串长度是 `s.length`，然后不断将这个长度减一，然后枚举所有可能的子字符串，分别检查它们是否包含偶数次数的元音字母。

**前缀和+状态压缩**

[官方题解](https://leetcode-cn.com/problems/find-the-longest-substring-containing-vowels-in-even-counts/solution/mei-ge-yuan-yin-bao-han-ou-shu-ci-de-zui-chang-z-2/)讲得很清楚，连我都看懂了呢。

### 代码

**暴力**

JavaScript Code

```js
/**
 * @param {string} s
 * @return {number}
 */
var findTheLongestSubstring = function (s) {
  const vowels = ['a', 'e', 'i', 'o', 'u']
  const hasEvenVowels = (s) => !vowels.some((v) => (s.match(new RegExp(v, 'g')) || []).length % 2 !== 0)

  for (let subStrLen = s.length; subStrLen >= 0; subStrLen--) {
    let remove = s.length - subStrLen + 1

    for (let start = 0; start < remove; start++) {
      let subStr = s.slice(start, start + subStrLen)
      if (hasEvenVowels(subStr)) {
        return subStrLen
      }
    }
  }
}
```

**前缀和+状态压缩**

JavaScript Code

```js
/**
 * @param {string} s
 * @return {number}
 */
var findTheLongestSubstring = function (s) {
  // [00000, 11111]
  // 用 5 位二进制数来分别表示 5 个元音字母出现次数的奇偶性
  const pos = Array(32).fill(-1)
  pos[0] = 0

  let status = 0,
    ans = 0
  for (let i = 0; i < s.length; i++) {
    switch (s[i]) {
      case 'a':
        status ^= 1 << 0
        break
      case 'e':
        status ^= 1 << 1
        break
      case 'i':
        status ^= 1 << 2
        break
      case 'o':
        status ^= 1 << 3
        break
      case 'u':
        status ^= 1 << 4
        break
      default:
        break
    }
    // 如果相同的奇偶性出现过，更新 ans
    if (pos[status] > -1) {
      ans = Math.max(ans, i - pos[status] + 1)
    }
    // 否则记录当前下标 +1
    else {
      pos[status] = i + 1
    }
  }
  return ans
}
```

**官方题解**

https://github.com/leetcode-pp/91alg-1/issues/64#issuecomment-655858014
