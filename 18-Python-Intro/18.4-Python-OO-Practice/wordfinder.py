"""Word Finder: finds random words from a dictionary."""


class WordFinder:
    """Accepts a file and creates a wordlist of each line within the file

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
        self.word_list_len = self.get_list_len()
        self.print_word_count()

    def print_word_count(self):
        """Prints the number of words read"""
        print(f'{self.word_list_len} words read')

    def get_words(self):
        """Returns the list of lines extracted from the file specified in the dir argument"""
        try:
            with open(self.dir) as file:
                words = [line.split('\n')[0] for line in file]
            return words

        except FileNotFoundError as exc:
            print(f'Looks like you didn\'t specify a valid file. \nExc: {exc}')

    def random(self):
        """Extract a random word from the word_list"""
        from random import choice
        return choice(self.word_list)

    def get_list_len(self):
        try:
            return len(self.word_list)
        except TypeError:
            print('Looks like the word list doesn\'t exist')