def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?

        >>> same_frequency(551122, 221515)
        True

        >>> same_frequency(321142, 3212215)
        False

        >>> same_frequency(1212, 2211)
        True
    """
    str_num1 = str(num1)
    str_num2 = str(num2)

    num1_xor = int(str_num1[0])
    num2_xor = int(str_num2[0])

    for char in str_num1[1:]:
        num1_xor ^= int(char)

    for char in str_num2[1:]:
        num2_xor ^= int(char)

    return num1_xor == num2_xor