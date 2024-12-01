from django.utils.translation import gettext_lazy as _
from enum import Enum, unique


@unique
class ImportTypes(Enum):
    wire_list = 0
    dtcs = 1
    dtcs_dependencies = 2
    modules = 4
    inlines = 5
    harness_description = 7
    sig_list = 8
    sales_codes = 9
    sales_code_constraints = 10
    device_connections = 12
    power_distributions = 15
    component_list = 16
    connector_layout = 17
    functional_diagram = 18
    stations = 19
    color_list = 20
    faults = 21
    inspection_points = 22
    device_layout = 23


class ImportDependency(Enum):
    wire_list = []
    dtcs = []
    dtcs_dependencies = [ImportTypes.dtcs.name]
    modules = [ImportTypes.wire_list.name]
    inlines = [ImportTypes.wire_list.name]
    harness_description = [ImportTypes.wire_list.name]
    sig_list = [ImportTypes.wire_list.name]
    sales_codes = [ImportTypes.wire_list.name]
    sales_code_constraints = [ImportTypes.wire_list.name, ImportTypes.sales_codes.name]
    device_connections = [ImportTypes.wire_list.name, ImportTypes.component_list.name]
    power_distributions = [ImportTypes.wire_list.name, ImportTypes.component_list.name]
    component_list = [ImportTypes.wire_list.name]
    connector_layout = []
    functional_diagram = [ImportTypes.component_list.name]
    stations = []
    color_list = [ImportTypes.wire_list.name]
    faults = []
    inspection_points = [ImportTypes.component_list.name]
    device_layout = [ImportTypes.component_list.name]


class ImportFileNames(Enum):
    wire_list = 'wirelist'
    harness_description = 'harnessdescription'
    sig_list = 'siglist'
    component_list = 'connectorlist'
    color_list = "colorlist"
    device_layout = "device_layout"


class ImportFileExtension(Enum):
    device_layout = "zip"


SELECT_HELP_TEXT = _("Hold down 'Control', or 'Command' on mac, to select more than one")
