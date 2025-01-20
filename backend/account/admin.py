from django.contrib import admin
from .models import UserModel,OneTimePassword


@admin.register(UserModel)
class UserModelAdmin(admin.ModelAdmin):
    list_display  = ['email', 'first_name', 'last_name']
    list_filter   = ['date_joined', 'is_verifiedEmail']
    search_fields = ['email', 'first_name', 'last_name']


@admin.register(OneTimePassword)
class OneTimePassword(admin.ModelAdmin):
    list_display  = [ 'user', 'otp']
   



