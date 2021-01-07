/**
 * @description 搜索排序数组
 * @param {number[]} nums
 * @param {number} target
 * @returns {number}
 */
function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] == target) return mid;

    // 搜索区间变为 [mid+1, right]
    if (nums[mid] < target) left = mid + 1;

    // 搜索区间变为 [left, mid - 1]
    if (nums[mid] > target) right = mid - 1;
  }

  return -1;
}

/**
 * @description 在排序数组中寻找最左边的满足条件的值
 * @param {number[]} nums
 * @param {number} target
 */
function binarySearchLeft(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] >= target) right = mid - 1;
    else left = mid + 1;
  }

  // 检查是否越界
  if (left >= nums.length || nums[left] != target) return -1;

  return left;
}

/**
 * @description 在排序数组中寻找最右边的满足条件的值
 * @param {number[]} nums
 * @param {number} target
 * @returns {number}
 */
function binarySearchRight(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] <= target) left = mid + 1;
    else right = mid - 1;
  }

  // 检查是否越界
  if (right < 0 || nums[right] != target) return -1;

  return right;
}

/**
 * @description 在排序数组中寻找最左插入位置
 * @param {number[]} nums
 * @param {number} x
 * @returns {number}
 */
function searchInsertLeft(nums, x) {
  // 题意转换一下，其实就是寻找第一个“大于等于” x 的数字，返回它的下标
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] >= x) right = mid - 1;
    if (nums[mid] < x) left = mid + 1;
  }

  return left;
}

/**
 * @description 在排序数组中寻找最右插入位置
 * @param {number[]} nums
 * @param {number} x
 * @returns {number}
 */
function searchInsertRight(nums, x) {
  // 题意转换一下，其实就是寻找第一个“大于” x 的数字，返回它的下标
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] > x) right = mid - 1;
    if (nums[mid] <= x) left = mid + 1;
  }

  return left;
}

/**
 * @description 搜索旋转排序数组
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchRotate = function (nums, target) {
  let l = 0,
    r = nums.length - 1;
  while (l <= r) {
    const m = l + ((r - l) >> 1);
    if (nums[m] === target) return m;

    // 将重复元素排除在搜索区间外
    while (l < m && nums[l] === nums[m]) {
      l++;
    }

    // m 位于左侧有序部分
    if (nums[l] <= nums[m]) {
      // m 大于 target，并且 target 大于左侧最小值，才缩小右边界
      if (nums[m] > target && target >= nums[l]) r = m - 1;
      else l = m + 1;
    }
    // m 位于右侧有序部分
    else {
      // m 小于 target，并且 target 小于右侧最大值，才缩小左边界
      if (nums[m] < target && target <= nums[r]) l = m + 1;
      else r = m - 1;
    }
  }
  return -1;
};
