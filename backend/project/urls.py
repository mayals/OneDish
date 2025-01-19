from django.urls import path,include


from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('meal/', include('meal.urls')),           # meal application url
    path('account/', include('account.urls')),     # account application url
]
