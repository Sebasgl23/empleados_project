from rest_framework.routers import DefaultRouter
from .views import EmpleadoViewSet
from .views import TelefonoViewSet
from .views import EmailViewSet

router = DefaultRouter()

router.register('empleados', EmpleadoViewSet, basename='empleado')
router.register('telefonos', TelefonoViewSet, basename='telefono')
router.register('emails', EmailViewSet, basename='email')


urlpatterns = router.urls
