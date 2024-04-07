from rest_framework.routers import DefaultRouter
from .views import EmpleadoViewSet

router = DefaultRouter()

router.register('empleados', EmpleadoViewSet, basename='empleado')

urlpatterns = router.urls
