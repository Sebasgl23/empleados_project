from rest_framework import serializers

from empleados_api.models import Empleado
from empleados_api.models import Telefono
from empleados_api.models import Email


class TelefonoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Telefono
    fields = '__all__'

class EmailSerializer(serializers.ModelSerializer):
  class Meta:
    model = Email
    fields = '__all__'

class EmpleadoSerializer(serializers.ModelSerializer):
    
    telefono_numero = serializers.CharField(write_only=True)
    telefono_tipo = serializers.CharField(write_only=True)
    telefono_indicativo = serializers.CharField(write_only=True)
    email = serializers.CharField(write_only=True)
    empleado_telefono = serializers.SerializerMethodField(method_name='get_telefono')
    empleado_email = serializers.SerializerMethodField(method_name='get_email')
    class Meta:
      model = Empleado
      fields = ['id', 'nombre', 'apellidos', 'tipoIdentificacion', 'fechaIngreso', 'salarioMensual', 'cargo', 'departamento', 'telefono_numero', 'telefono_tipo', 'telefono_indicativo', 'email', 'empleado_telefono', 'empleado_email']

    def get_telefono(self, obj):
      telefono = obj.telefono_set.first()
      return TelefonoSerializer(telefono).data
    
    def get_email(self, obj):
      email = obj.email_set.first()
      return EmailSerializer(email).data

    def create(self, validated_data):

      telefono_numero = validated_data.pop('telefono_numero')
      telefono_tipo = validated_data.pop('telefono_tipo')
      telefono_indicativo = validated_data.pop('telefono_indicativo')
      email = validated_data.pop('email')
      empleado = Empleado.objects.create(**validated_data)
      Telefono.objects.create(empleado=empleado, numero=telefono_numero, tipo=telefono_tipo, indicativo=telefono_indicativo)
      Email.objects.create(empleado=empleado, email=email)
      return empleado
    
    def update(self, instance, validated_data):

      telefono_numero = validated_data.pop('telefono_numero')
      telefono_tipo = validated_data.pop('telefono_tipo')
      telefono_indicativo = validated_data.pop('telefono_indicativo')
      email = validated_data.pop('email')
      instance.nombre = validated_data.get('nombre', instance.nombre)
      instance.apellidos = validated_data.get('apellidos', instance.apellidos)
      instance.tipoIdentificacion = validated_data.get('tipoIdentificacion', instance.tipoIdentificacion)
      instance.fechaIngreso = validated_data.get('fechaIngreso', instance.fechaIngreso)
      instance.salarioMensual = validated_data.get('salarioMensual', instance.salarioMensual)
      instance.cargo = validated_data.get('cargo', instance.cargo)
      instance.departamento = validated_data.get('departamento', instance.departamento)
      instance.save()
      telefono = instance.telefono_set.first()
      if not telefono: 
        telefono = Telefono()
        telefono.empleado = instance
      telefono.numero = telefono_numero
      telefono.tipo = telefono_tipo
      telefono.indicativo = telefono_indicativo
      telefono.save()
      user_email = instance.email_set.first()
      if not user_email: 
        user_email = Email()
        user_email.empleado = instance
      user_email.email = email
      user_email.save()
      return instance
    
