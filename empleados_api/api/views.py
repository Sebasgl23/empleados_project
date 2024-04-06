from rest_framework import viewsets
from empleados_api.models import Empleado
from empleados_api.models import Telefono
from empleados_api.models import Email
from empleados_api.api.serializer import EmpleadoSerializer
from empleados_api.api.serializer import TelefonoSerializer
from empleados_api.api.serializer import EmailSerializer

class EmpleadoViewSet(viewsets.ModelViewSet):
  queryset = Empleado.objects.all()
  serializer_class = EmpleadoSerializer

class TelefonoViewSet(viewsets.ModelViewSet):
  queryset = Telefono.objects.all()
  serializer_class = TelefonoSerializer

class EmailViewSet(viewsets.ModelViewSet):
  queryset = Email.objects.all()
  serializer_class = EmailSerializer

