from django.contrib import admin
from .models import UserModel, AdminProfile, ClientProfile, OneTimePassword


@admin.register(UserModel)
class UserModelAdmin(admin.ModelAdmin):
    list_display  = ['email', 'first_name', 'last_name']
    list_filter   = ['date_joined', 'is_verifiedEmail']
    search_fields = ['email', 'first_name', 'last_name']




@admin.register(AdminProfile)
class AdminProfileAdmin(admin.ModelAdmin):
    list_display  = ['user', 'profile_picture', 'phone_number', 'country', 'gender']
    list_filter   = ['phone_number']
    search_fields = ['phone_number', 'country', 'gender']




@admin.register(ClientProfile)
class ClientProfileAdmin(admin.ModelAdmin):
    list_display  = ['user', 'profile_picture', 'phone_number', 'country', 'gender']
    list_filter   = ['phone_number']
    search_fields = ['phone_number', 'country', 'gender']

    
    
    
@admin.register(OneTimePassword)
class OneTimePassword(admin.ModelAdmin):
    list_display  = [ 'user', 'otp']
   



