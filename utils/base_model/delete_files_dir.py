from django.core.files.storage import default_storage


def delete_svg_file_storage(instance):
    if instance.svg:
        directory_name = "/".join(instance.svg.name.split("/")[:-1])
        instance.svg.delete(instance.svg.name)
        return directory_name


def delete_directory_storage(director_name):
    if director_name:
        try:
            default_storage.delete(director_name)
        except Exception as e:
            print("ERROR in delete_directory_storage - {}".format(str(e)))
