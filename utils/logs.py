import logging


class LoggingHandler(object):
    name = "logs.py"

    def __init__(self, *args, **kwargs):
        self.log = logging.getLogger(self.name)
