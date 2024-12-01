from django.utils.translation import gettext_lazy as _
from enum import Enum, unique


@unique
class Constants(Enum):
    pass


SELECT_HELP_TEXT = _("Hold down 'Control', or 'Command' on mac, to select more than one")
