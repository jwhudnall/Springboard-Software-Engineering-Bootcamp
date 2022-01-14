"""Word Finder: finds random words from a dictionary."""


class WordFinder:
    """Class info will go here

    >>> wf = WordFinder('words.txt')
    235886 words read

    >>> wf.word_list_len
    235886

    >>> wf.word_list[:5]
    ['A', 'a', 'aa', 'aal', 'aalii']

    """

    def __init__(self, dir):
        """Initializes the WordFinder Class"""
        self.dir = dir
        self.word_list = self.get_words()
        self.word_list_len = len(self.word_list)
        self.print_word_count()

    def print_word_count(self):
        """Prints the number of words read"""
        print(f'{self.word_list_len} words read')

    def get_words(self):
        """Returns the list of lines extracted from the file specified in the dir argument"""
        with open(self.dir) as file:
            words = [line.split('\n')[0] for line in file]
        return words

    def random(self):
        """Extract a random word from the word_list"""
        from random import choice
        return choice(self.word_list)