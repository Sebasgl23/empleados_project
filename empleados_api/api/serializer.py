from rest_framework import serializers

from empleados_api.models import Empleado
from empleados_api.models import Telefono
from empleados_api.models import Email

class EmpleadoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Empleado
    fields = '__all__'

class TelefonoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Telefono
    fields = '__all__'

class EmailSerializer(serializers.ModelSerializer):
  class Meta:
    model = Email
    fields = '__all__'

  