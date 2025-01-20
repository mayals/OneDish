from django.core.mail import EmailMessage
from django.conf import settings
from .models import UserModel, OneTimePassword
from django.contrib.sites.shortcuts import get_current_site
import random

#  email verify code ####
def send_generated_otp_to_email(email, request): 
    subject = "One time passcode for Email verification"
    otp=random.randint(1000, 9999) 
    current_site=get_current_site(request).domain
    user = UserModel.objects.get(email=email)
    email_body=f"Hi {user.first_name} thanks for signing up on {current_site},please verify your email with the one time passcode:\n \n {otp}"
    from_email=settings.EMAIL_HOST
    otp_obj=OneTimePassword.objects.create(user=user, otp=otp)
    #send the email 
    d_email=EmailMessage(subject=subject, body=email_body, from_email=from_email, to=[user.email])
    d_email.send()


def send_normal_email(data):
    email=EmailMessage(
                        subject    =data['email_subject'],
                        body       =data['email_body'],
                        from_email =settings.EMAIL_HOST_USER,
                        to         =[data['to_email']]
    )
    email.send()