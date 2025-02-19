from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth import get_user_model
from .models import ClientProfile, AdminProfile
#signal-2
# sender   =   get_user_model()            -------- from django.contrib.auth import get_user_model
# receiver =   create_user_profile         --------  to creat new UserProfile in database table for the new registerd user 
@receiver(post_save, sender=get_user_model())
def create_user_extensions(sender, instance, created, **kwargs):
    if created:
            instance_user = instance 
            # create ClientProfile instance
            if instance_user.is_client==True:  
               ClientProfile.objects.create(user=instance_user)  
               instance_user.client_profile.id = instance_user.id
            # create AdminProfile instance 
            if instance_user.is_superuser==True:  
               AdminProfile.objects.create(user=instance_user)
               instance_user.admin_profile.id = instance_user.id
               