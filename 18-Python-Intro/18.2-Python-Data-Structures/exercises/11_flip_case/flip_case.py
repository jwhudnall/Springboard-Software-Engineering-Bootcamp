def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """

    # isupper() islower()
    result = ''

    for char in phrase:
        if char.lower() == to_swap.lower():
            # add swapped to result
            opposite = char.lower() if char.isupper() else char.upper()
            result += opposite
        else:
            result += char

    return result