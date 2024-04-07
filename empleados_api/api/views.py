from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from empleados_api.models import Empleado
from empleados_api.models import Telefono
from empleados_api.models import Email
from empleados_api.api.serializer import EmpleadoSerializer
from empleados_api.api.serializer import TelefonoSerializer
from empleados_api.api.serializer import EmailSerializer
from django.core.mail import send_mail
from rest_framework.response import Response

class EmpleadoViewSet(viewsets.ModelViewSet):
  permission_classes = [IsAuthenticated]
  queryset = Empleado.objects.all()
  serializer_class = EmpleadoSerializer

  def create(self, request):
    serializer = EmpleadoSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      send_mail(
        "Bienvenido a la empresa {} {}!".format(serializer.data['nombre'], serializer.data['apellidos']),
        "Su registro en la plataforma de usuarios de la empresa ha sido exitoso. Bienvenido! Su cargo es {}, en el departamento de {}.".format(serializer.data['cargo'], serializer.data['departamento']),
        None,
        ["sebiisgl@gmail.com"]
      )
      return Response(serializer.data, status=status.HTTP_201_CREATED)
        

class TelefonoViewSet(viewsets.ModelViewSet):
  permission_classes = [IsAuthenticated]
  queryset = Telefono.objects.all()
  serializer_class = TelefonoSerializer

class EmailViewSet(viewsets.ModelViewSet):
  permission_classes = [IsAuthenticated]
  queryset = Email.objects.all()
  serializer_class = EmailSerializer

