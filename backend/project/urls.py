from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin





urlpatterns = [
    path('admin/', admin.site.urls),
    path('meal/', include('meal.urls')),           # meal application url
    path('account/', include('account.urls')),     # account application url
]


# STATIC 
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    
# MEDIA
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
