from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from empleados_api.models import Empleado
from empleados_api.models import Telefono
from empleados_api.models import Email
from empleados_api.api.serializer import EmpleadoSerializer
from django.core.mail import send_mail
from rest_framework.response import Response

class EmpleadoViewSet(viewsets.ModelViewSet):
  permission_classes = [IsAuthenticated]
  queryset = Empleado.objects.all()
  serializer_class = EmpleadoSerializer

  def create(self, request):
    serializer = EmpleadoSerializer(data=request.data)
    if serializer.is_valid():
      empleado = serializer.save()
      send_mail(
        "Bienvenido a la empresa {} {}!".format(serializer.data['nombre'], serializer.data['apellidos']),
        "Su registro en la plataforma de usuarios de la empresa ha sido exitoso. Bienvenido! Su cargo es {}, en el departamento de {}.".format(serializer.data['cargo'], serializer.data['departamento']),
        None,
        [empleado.email_set.first().email],
      )
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

