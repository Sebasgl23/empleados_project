from django.db import models
from enum import Enum


class TipoIdentificacion(Enum):
  CEDULA = 'Cedula'
  NIT = 'NIT'

  @classmethod
  def choices(cls):
    return [(key.value, key.name) for key in cls]

class Empleado(models.Model):
  id = models.AutoField(primary_key=True)
  nombre = models.CharField(max_length=50)
  apellidos = models.CharField(max_length=50)
  tipoIdentificacion = models.CharField(max_length=20, choices=TipoIdentificacion.choices())
  fechaIngreso = models.DateField()
  salarioMensual = models.DecimalField(max_digits=10, decimal_places=0)
  cargo = models.CharField(max_length=50)
  departamento = models.CharField(max_length=50)


class TipoTelefono(Enum):
  CELL = 'Celular'
  TEL = 'Telefono'

  @classmethod
  def choices(cls):
    return [(key.value, key.name) for key in cls]

class Telefono(models.Model):
  id = models.AutoField(primary_key=True)
  tipo = models.CharField(max_length=20, choices=TipoTelefono.choices())
  indicativo = models.CharField(max_length=5)
  empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE)

class Email(models.Model):
  id = models.AutoField(primary_key=True)
  email = models.EmailField()
  empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE)
