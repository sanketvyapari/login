from django.db import models
from django.utils.translation import gettext_lazy as _


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class VehicleAbstractModel(models.Model):
    vehicle = models.ForeignKey("vehicles.Vehicles", on_delete=models.CASCADE, related_name="vehicle_%(class)ss")

    class Meta:
        abstract = True


class ImportFileAbstractModel(models.Model):
    import_file = models.ForeignKey("import_files.ImportFiles", on_delete=models.CASCADE,
                                    related_name="import_file_%(class)ss", null=True, blank=True)

    class Meta:
        abstract = True


class ParentIdAbstractModel(models.Model):
    parent_id = models.PositiveBigIntegerField(_("%(class) Parent Id"), null=True, blank=True)

    class Meta:
        abstract = True


class VehicleNullAbstractModel(models.Model):
    vehicle = models.ForeignKey(
        "vehicles.Vehicles", on_delete=models.CASCADE, related_name="vehicle_%(class)ss", null=True, blank=True
    )

    class Meta:
        abstract = True


class DefFileAbstractModel(models.Model):
    def_file = models.ForeignKey("plugin.DefPluginFiles", on_delete=models.CASCADE, related_name="def_%(class)ss")
    file_id = models.CharField(_("Def File Id"), null=True, blank=True)

    class Meta:
        abstract = True
