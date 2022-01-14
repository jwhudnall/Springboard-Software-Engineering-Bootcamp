"""Word Finder: finds random words from a dictionary."""


class WordFinder:
    """Accepts a file and creates a wordlist of each line within the file

    >>> wf = WordFinder('words.txt')
    235886 words read

    >>> wf.word_list_len
    235886

    >>> wf.word_list[:5]
    ['A', 'a', 'aa', 'aal', 'aalii']

    >>> wf.random() in wf.word_list
    True

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
                words = [line.rstrip() for line in file]
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


class SpecialWordFinder(WordFinder):
    """Version of WordFinder that ignores blank lines, and lines starting with #.

    >>> swf = SpecialWordFinder('specialwords.txt')
    4 words read

    >>> swf.word_list_len
    4

    >>> swf.word_list[:2]
    ['kale', 'parsnips']

    >>> swf.random() in swf.word_list
    True

    >>> isinstance(swf, WordFinder)
    True

    """

    def __init__(self, dir):
        """Initializes SpecialWordFinder Class via WordFinder"""
        super().__init__(dir)

    def get_words(self):
        """Returns a list of words. Blank lines, and lines starting with # are ignored"""
        try:
            with open(self.dir) as file:
                words = [line.rstrip() for line in file]
                valid_words = [
                    word for word in words if word and not word.startswith('#')]
            return valid_words

        except FileNotFoundError as exc:
            print(f'Looks like you didn\'t specify a valid file. \nExc: {exc}')
