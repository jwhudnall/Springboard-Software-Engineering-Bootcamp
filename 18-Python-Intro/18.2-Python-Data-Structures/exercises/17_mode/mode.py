def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """
    # declare empty seen list
    seen = set()
    max_count_val = 0

    for num in nums:
        if num not in seen and nums.count(num) > max_count_val:
            max_count_val = num
        seen.add(num)

    return max_count_val

