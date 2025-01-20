from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views



app_name ='account'

urlpatterns = [
    
    # Authentication-proccess
    #path('register/', RegisterView.as_view(), name='register'),
    path('register/', views.UserProfileRegisterAPIView.as_view(), name='register'),
    path('resend-otp/<str:email>/', views.ResendOTPToEmail, name='resend-otp'),
    path('verify-email/', views.VerifyUserEmail.as_view(), name='verify-email'),
    
    path('login/', views.LoginUserView.as_view(), name='login-user'),# path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  #jwt views classTokenRefreshView
    path('logout/', views.LogoutApiView.as_view(), name='logout'),
    path('testing/', views.TestingAuthenticatedReq.as_view(), name='just-for-testing'),
    
    
    #  for admin only
    #  user
    path('list-user/', views.ListUserAPIView.as_view(), name='list-user'),
    path('user-detail/<str:id>/', views.DetailUserAPIView.as_view(), name='user-detail'),
    path('user-update/<str:id>/', views.UpdateUserAPIView.as_view(), name='user-update'),
    path('user-delete/<str:id>/', views.DeleteUserAPIView.as_view(), name='user-delete'),
   
    
    #  for request user only
    path('request-user/', views.DetailRequestUserAPIView.as_view(), name='request-user'),
    path('update-user-profile/', views.UpdateRequestProfileAPIView.as_view(), name='update-user-profile'), # general any type of user client or admin 
    # path('update-admin-profile/', views.UpdateRequestAdminProfileAPIView.as_view(), name='update-user-profile'),
    # path('update-client-profile/', views.UpdateRequestClientProfileAPIView.as_view(), name='update-user-profile'),



    
    
    # Forget-password
    path('password-reset-request/', views.PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('password-reset-confirm/<uidb64>/<token>/', views.PasswordResetConfirm.as_view(), name='password-reset-confirm'),
    path('set-new-password/', views.SetNewPasswordView.as_view(), name='set-new-password'),
    # Change-password
    path('change-password/', views.ChangePasswordView.as_view(), name='change-password'),
    ]