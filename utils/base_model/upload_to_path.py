import uuid


def upload_to_folder_path(instance, filename):
    return '{0}/{3}/{1}/{2}'.format(instance.vehicle, instance.folder, filename, instance._meta.db_table)


def upload_to_path(instance, filename):
    return '{0}/{1}/{2}'.format(instance.vehicle, instance._meta.db_table, filename)


def upload_to_import_path(instance, filename):
    return '{0}/{1}/{2}'.format(
        instance.vehicle, instance._meta.db_table, "{}-{}-{}".format(
            instance.import_type, instance.version, filename
        )
    )


def upload_to_folder_path_uuid(instance, filename):
    file_name = uuid.uuid4()
    ext = filename.split('.')[-1]
    return '{0}/{3}/{1}/{2}'.format(
        instance.vehicle, instance.folder, "{}.{}".format(file_name.hex, ext), instance._meta.db_table
    )
