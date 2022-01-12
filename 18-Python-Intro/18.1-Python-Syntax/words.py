def print_upper_words(words, starts_with={}):
    '''
      Prints each word in all uppercase letters. If starts_with is included, only words
      starting with those letters are printed.

      Input: list of words [, set of accepted starting characters]
      Output: string
    '''
    for word in words:
        if starts_with and word[0].lower() in starts_with:
            word = word.upper()
            print(f'{word}')

        elif not starts_with:
            word = word.upper()
            print(f'{word}')

# print_upper_words(['dog','cat', 'eagle', 'human', 'Elephant'])

print('----- Should be: "HELLO", "HEY", "YO", and "YES"')
print_upper_words(["hello", "hey", "goodbye", "yo", "yes"],
                  starts_with={"h", "y"})
print('----- Should be: "ANIMAL" "ZEBRA" "DOG" "CAT"')
print_upper_words(['animal', 'zebra', 'Dog', 'CAT'])