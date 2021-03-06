def repeat(phrase, num):
    """Return phrase, repeated num times.

        >>> repeat('*', 3)
        '***'

        >>> repeat('abc', 2)
        'abcabc'

        >>> repeat('abc', 0)
        ''

    Ignore illegal values of num and return None:

        >>> repeat('abc', -1) is None
        True

        >>> repeat('abc', 'nope') is None
        True
    """
    # handle num < 0 or not int
    # return phrase * num if num >= 0 and isinstance(num, int) else None
    if type(num) != int or num < 0:
        return None
    elif num == 0:
        return ''
    else:
        return phrase * num