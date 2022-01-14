def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """
    def is_vowel(char):
        return char in 'aeiouAEIOU'

    vowel_list = [char for char in s if is_vowel(char)]
    result = ''

    for char in s:
        if is_vowel(char):
            result += vowel_list.pop()
        else:
            result += char

    return result