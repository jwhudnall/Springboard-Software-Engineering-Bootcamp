def valid_parentheses(parens):
    """Are the parentheses validly balanced?

        >>> valid_parentheses("()")
        True

        >>> valid_parentheses("()()")
        True

        >>> valid_parentheses("(()())")
        True

        >>> valid_parentheses(")()")
        False

        >>> valid_parentheses("())")
        False

        >>> valid_parentheses("((())")
        False

        >>> valid_parentheses(")()(")
        False
    """
    stack = []

    for char in parens:
        if char == '(':
            stack.append(char)
        elif char == ')' and stack and stack[-1] == '(':
            stack.pop()
        else:
            return False

    return True if not len(stack) else False