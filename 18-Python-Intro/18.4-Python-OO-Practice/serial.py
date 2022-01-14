"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.

    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start=1):
        """Initializes the serial generator, starting at the specified start value"""
        self.start = start
        self.val = start

    def generate(self):
        """Returns and increments the current self.val"""
        self.val += 1
        return self.val - 1

    def reset(self):
        """Resets the self.val to the original value"""
        self.val = self.start