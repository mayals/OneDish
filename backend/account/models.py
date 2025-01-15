from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractUser, PermissionsMixin
import uuid



class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save()
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
class UserModel(AbstractUser, PermissionsMixin):
    id               = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)                     
    username         = None
    email            = models.EmailField(unique = True,  null = True)
    first_name       = models.CharField(max_length = 50, null = True)
    last_name        = models.CharField(max_length = 50 ,null = True)
    is_verifiedEmail = models.BooleanField(default=False)
    enable_two_factor_authentication = models.BooleanField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = ["first_name", "last_name"]
   
    def __str__(self):
       return "{}".format(self.email) 
    
    @property
    def get_user_fullname(self):
        return f"{self.first_name} {self.last_name}"
      
    def save(self, *args, **kwargs):
        if self.is_superuser:
            self.is_verified = True 
            self.enable_two_factor_authentication = False
        return super().save(*args, **kwargs)

    class Meta:
        ordering = ('-created_at',)
        verbose_name = 'UserModel'
        verbose_name_plural = 'UsersModel'
