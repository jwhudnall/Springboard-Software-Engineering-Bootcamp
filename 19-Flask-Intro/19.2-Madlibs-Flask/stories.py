"""Madlibs Stories."""


class Story:
    """Madlibs story.

    To  make a story, pass a list of prompts, and the text
    of the template.

        >>> s = Story(["noun", "verb"],
        ...     "I love to {verb} a good {noun}.")

    To generate text from a story, pass in a dictionary-like thing
    of {prompt: answer, promp:answer):

        >>> ans = {"verb": "eat", "noun": "mango"}
        >>> s.generate(ans)
        'I love to eat a good mango.'
    """

    def __init__(self, code, title, words, text):
        """Create story with words and template text."""
        self.code = code
        self.title = title
        self.prompts = words
        self.template = text

    def generate(self, answers):
        """Substitute answers into text."""

        text = self.template

        for (key, val) in answers.items():
            text = text.replace("{" + key + "}", val)

        return text


# Here's a story to get you started


story1 = Story(
    'long-ago',
    'Once Upon a Time',
    ["place", "noun", "verb", "adjective", "plural_noun"],
    """Once upon a time in a long-ago {place}, there lived a
       large {adjective} {noun}. It loved to {verb} {plural_noun}."""
)

story2 = Story(
    'frantic',
    'The Crazy House',
    ['adjective_1', 'adjective_2','type_of_bird', 'room_in_a_house', 'verb_past_tense', 'verb', 'relatives_name', 'noun', 'liquid', 'verb_ends_with_ing', 'part_of_body_plural', 'plural_noun'],
    """It was a {adjective_1}, cold November day. I woke up to the {adjective_2} smell of {type_of_bird} roasting in the {room_in_a_house} downstairs. I {verb_past_tense} down the stairs to see if I could help {verb} the dinner. My mom said, \"See if {relatives_name} needs a fresh {noun}.\" So i carried a tray of glasses full of {liquid} into the {verb_ends_with_ing} room. When I got there, I couldn't believe my {part_of_body_plural}! There were {plural_noun} {verb_ends_with_ing} on the {noun}!"""
)

stories = {s.code: s for s in [story1, story2]}