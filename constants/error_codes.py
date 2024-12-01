from enum import Enum


class InvalidPayload(Enum):
    code = "INVALID_PAYLOAD"
    msg = "Invalid payload given to endpoint"


class ImportFileTypeError(Enum):
    code = "IMPORT_FILE_TYPE_NOT_FOUND"
    msg = "Error while getting file types"


class ImportFileUploadError(Enum):
    code = "INVALID_IMPORT_FILE_TYPE"
    msg = "Please give valid import file type"


class InvalidMakeDetailsError(Enum):
    code = "INVALID_MAKE_DETAILS"
    msg = "Please give valid vehicle make"
