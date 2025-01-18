from django.db import models
from django.conf import settings
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from rest_framework_simplejwt.tokens import RefreshToken
import contextlib
import uuid
from phonenumber_field.modelfields import PhoneNumberField




class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True')
        return self.create_user(email, password, **extra_fields)




# https://github.com/django/django/blob/main/django/contrib/auth/models.py#L334
"""https://docs.djangoproject.com/en/4.0/topics/auth/customizing/#substituting-a-custom-user-model"""
class UserModel(AbstractBaseUser, PermissionsMixin):                 
    id               = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  
    username         = None
    email            = models.EmailField(unique = True,  null = True)
    first_name       = models.CharField(max_length = 50, null = True)
    last_name        = models.CharField(max_length = 50 ,null = True) 
    date_joined      = models.DateTimeField(auto_now_add=True)
     # enable_two_factor_authentication = models.BooleanField(null=True, blank=True)
    is_verifiedEmail  = models.BooleanField(default=False)
    is_active         = models.BooleanField(default=True)
    
    is_superuser      = models.BooleanField(default=False)
    is_staff          = models.BooleanField(default=False)
    is_client         = models.BooleanField(default=False)
    role              = models.CharField(max_length=100, verbose_name="Role", blank=True, null=True)
    
    objects = UserManager()

    USERNAME_FIELD  = 'email'   #USERNAME_FIELD the field used as the unique identifier for the user
    REQUIRED_FIELDS = ["first_name", "last_name"]
   
    def __str__(self):
        return self.email
    
    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    class Meta:
        ordering = ('-date_joined',)
        verbose_name = 'UserModel'
        verbose_name_plural = 'UsersModel'

    
    def save(self, *args, **kwargs):
        if self.is_superuser:
            self.is_staff = True
            self.role = "Admin" 
            self.is_verifiedEmail = True 

        else: 
            self.is_staff = False
            self.role = "Client" 
            self.is_verifiedEmail = False 
        return super().save(*args, **kwargs)
    
    
    @property
    def get_profile_picture(self):
        if self.is_client :
            profile_picture = ClientProfile.objects.get(id=self.id).profile_picture
            print('profile_picture',profile_picture)
            return profile_picture
        
        if self.is_superuser :    
            profile_picture = AdminProfile.objects.get(id=self.id).profile_picture
            print('profile_picture',profile_picture)
            return profile_picture
    
    # from rest_framework_simplejwt.tokens import RefreshToken
    def tokens(self):    
        refresh = RefreshToken.for_user(self)
        return {
            "refresh":str(refresh),
            "access" :str(refresh.access_token)
        }




# ################################## OTP  - verifiedEmail #############################################33
# otp need to verify user email 
class OneTimePassword(models.Model):
    id         = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  
    user       = models.OneToOneField(UserModel, on_delete=models.CASCADE)
    otp        = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
     
    def __str__(self):
        return f"{self.user.email} - otp code"






# ################################## PROFILE #######################################################################33
class ClientProfile(models.Model):
    id              = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  
    user            = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='client_profile')
    phone_number    = PhoneNumberField(blank=False, null=True)
    country         = models.CharField(max_length=50, blank=False, null=True)
    address         = models.CharField(max_length=100, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='accounts/client/profile_picture/', blank=True, null=True)
    date_of_birth   = models.DateField(blank=True, null=True)
    gender          = models.CharField(max_length=10, blank=True, null=True)
    created_at      = models.DateTimeField(auto_now_add=True)
    updated_at      = models.DateTimeField(auto_now=True)

    def __str__(self):
        return  self.user.get_full_name
    
    def get_client_full_name(self):
        return f"{self.user.get_full_name}"
    
    def save(self, *args, **kwargs):
        # Set the Employee ID to be the same as the user ID
        self.id = self.user.id  
        # Deletes old profile_picture when making an update to profile_picture
        with contextlib.suppress(Exception):
            old = ClientProfile.objects.get(id=self.id)
            if old.profile_picture != self.profile_picture:
                old.profile_picture.delete(save=False)
        super().save(*args, **kwargs)
    



class AdminProfile(models.Model):
    id              = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  
    user            = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='admin_profile')
    phone_number    = PhoneNumberField(blank=False, null=True)
    country         = models.CharField(max_length=50, blank=True, null=True)
    address         = models.CharField(max_length=100, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='accounts/employee/profile_picture/', blank=True, null=True)
    date_of_birth   = models.DateField(blank=True, null=True)
    gender          = models.CharField(max_length=10, blank=True, null=True)
    created_at      = models.DateTimeField(auto_now_add=True)
    updated_at      = models.DateTimeField(auto_now=True)
   
    def __str__(self):
        return  self.user.get_full_name
    
    def get_client_full_name(self):
        return f"{self.user.get_full_name}"
    
    def save(self, *args, **kwargs):
        # Set the Employee ID to be the same as the user ID
        self.id = self.user.id  
        # Deletes old profile_picture when making an update to profile_picture
        with contextlib.suppress(Exception):
            old = ClientProfile.objects.get(id=self.id)
            if old.profile_picture != self.profile_picture:
                old.profile_picture.delete(save=False)
        super().save(*args, **kwargs) 

