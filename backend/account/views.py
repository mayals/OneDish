# django
from django.contrib.auth import get_user_model, tokens
from django.shortcuts import render, get_object_or_404
from django.http import Http404
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode
# RF
from rest_framework import views, response, permissions, status
# JWT
from rest_framework_simplejwt.tokens import RefreshToken
# local
from .utils import send_generated_otp_to_email
from .models import UserModel, ClientProfile, AdminProfile, OneTimePassword
from .serializers import  (RegisteUserProfileSerializer, OneTimePasswordSerializer, LoginSerializer,LogoutSerializer,
                           UserSerializer, UpdateUserSerializer, UpdateClientProfileSerializer,UpdateAdminProfileSerializer,
                           PasswordResetRequestSerializer, SetNewPasswordSerializer, ChangePasswordSerializer)





###################################### Authentication-proccess  ####################################################333
### Register a new user - client  +  send OTP to email  ###########
class UserProfileRegisterAPIView(views.APIView): 
    queryset = UserModel.objects.all()
    serializer_class = RegisteUserProfileSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = self.queryset
        return queryset
      
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        print('serializer.initial_data=',serializer.initial_data)
        if serializer.is_valid():
            print('valid serializer=',serializer)
            serializer.save()
            user = serializer.data
            print('user=',user)
            
            # send otp to email 
            send_generated_otp_to_email(user.get('email'), request)
            return response.Response({
                'user': user,
                'register_message': 'Thanks for signing up. A passcode has been sent to verify your email.'
            }, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




### OTP-for verified email ###########
class VerifyUserEmail(views.APIView):
    serializer_class = OneTimePasswordSerializer
    permission_classes=[permissions.AllowAny]
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
                otp = serializer.validated_data['otp']
                try:
                    user_pass_obj = get_object_or_404(OneTimePassword,otp=otp)
                    user=user_pass_obj.user
                    if not user.is_verified_email:
                        user.is_verified_email=True
                        user.save()
                        return response.Response({'message':'account email verified successfully'}, status=status.HTTP_200_OK)                                                      
                    return response.Response({'message':'passcode is invalid user is already verified'}, status=status.HTTP_204_NO_CONTENT)
                except OneTimePassword.DoesNotExist:
                    return response.Response({"error": "otp error - passcode is invalid ! please enter valid otp code"}, status=status.HTTP_404_NOT_FOUND)    
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       




### login by email & password to get ACCESS TOKEN + REFRESH TOKEN  ###########
class LoginUserView(views.APIView):
    serializer_class=LoginSerializer
    permission_classes=[permissions.AllowAny]
    
    def post(self, request):
        serializer= self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
           return response.Response(serializer.data, status=status.HTTP_200_OK)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



### logout  ###########
class LogoutApiView(views.APIView):
    serializer_class=LogoutSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        try:
            print('request.data=',request.data)
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            print('token to blacklist=',token)
            token.blacklist()
            return response.Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)
        

#### only testing that user did Authenticated correctly 
class TestingAuthenticatedReq(views.APIView):
    permission_classes=[permissions.IsAuthenticated]

    def get(self, request):
        data={
            'msg':'its works'
        }
        return response.Response(data, status=status.HTTP_200_OK)        
########################################################################################################################





#####################################   UserModel  CRUD  APIView  ############################################################333
#  path('list-user/', views.ListUserAPIView.as_view(), name='list-user'),
# all usetrs list only for admin
class ListUserAPIView(views.APIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
    
    def get(self, request, format=None):
        users = UserModel.objects.all()
        serializer = self.serializer_class(users, many=True)
        return response.Response({
                "all_users_count":users.count(),
                "all_users_data":serializer.data,
                }, status=status.HTTP_200_OK)
        
           
#  UserDetail by id -  by admin only 
#  path('user-detail/<str:id>/', views.UserDetailAPIView.as_view(), name='user-detail'),    
class DetailUserAPIView(views.APIView):
    permission_classes=[permissions.IsAdminUser]
    serializer_class=UserSerializer
    queryset = UserModel.objects.all()
    # lookup_field = "id"
    def get(self,request,*args,**kwargs):
        id = kwargs.get('id')
        print(id)
        user = get_object_or_404(UserModel, id=id)
        serializer = self.serializer_class(user, many=False)
        return response.Response({
                "user" : serializer.data,
                }, status=status.HTTP_200_OK)
 

# update user selected  by id by admin only
class UpdateUserAPIView(views.APIView):
    permission_classes=[permissions.IsAdminUser]
    serializer_class=UpdateUserSerializer
    queryset = UserModel.objects.all()
    
    def get_object(self,id):
        try:
            return UserModel.objects.get(id=id)
        except UserModel.DoesNotExist:
            return response.Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, id, format=None):
        # check permission for the user is admin user 
        if self.request.user.is_superuser == False :
            return response.Response({
                "error" : "Permission Denied",
                }, status=status.HTTP_403_FORBIDDEN)
        
        user = self.get_object(id)
        serializer = self.serializer_class(user, data=request.data)
        print('serializer before validation =',serializer)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_200_OK)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


# delete user selected  by id by admin only     
class DeleteUserAPIView(views.APIView):
    permission_classes=[permissions.IsAdminUser]
    serializer_class=UserSerializer
    queryset = UserModel.objects.all()

    def delete(self,request,*args,**kwargs):
        id = kwargs.get('id')
        user = get_object_or_404(UserModel, id=id)
        print(user.email)
        if self.request.user.is_superuser == False :
            return response.Response({
                "error" : "Permission Denied",
                }, status=status.HTTP_403_FORBIDDEN)
        else: 
            user.delete()
            return response.Response({'success' : 'user deleted successfully'},status=status.HTTP_204_NO_CONTENT)
########################################################################################################################
       








# #################################### by request user only ########################################
#path('request-user/', views.RequestUserDetailAPIView.as_view(), name='request-user'),
#   get request user data FOR Navbar in react 
class DetailRequestUserAPIView(views.APIView):
    permission_classes=[permissions.IsAuthenticated]
    serializer_class=UserSerializer
    queryset = UserModel.objects.all()
    # lookup_field = "id"
    def get(self,request,*args,**kwargs):
        try:
            user = get_object_or_404(UserModel, id=request.user.id)
        except UserModel.DoesNotExist:
           return response.Response(status_code=404)    
       
        serializer = self.serializer_class(user, many=False)
        return response.Response(serializer.data, status=status.HTTP_200_OK)


  
    
##############################update profile by request.user only #############33333
# only request user can update his profile(  general for client or admin) 
class UpdateRequestProfileAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def put(self, request, *args, **kwargs):
        user = request.user
        if request.user.is_superuser == True:
                        try:
                            instance_admin_profile = AdminProfile.objects.get(user=request.user)
                            serializer = UpdateAdminProfileSerializer(instance_admin_profile, data=request.data, partial=True)
                        except AdminProfile.DoesNotExist:
                            return response.Response({'error': 'Admin Profile not found'}, status=status.HTTP_404_NOT_FOUND)  
        if request.user.is_client == True:
                        try:
                            instance_client_profile = ClientProfile.objects.get(user=request.user)
                            serializer = UpdateClientProfileSerializer(instance_client_profile, data=request.data, partial=True)
                        except ClientProfile.DoesNotExist:
                            return response.Response({'error': 'Client Profile not found'}, status=status.HTTP_404_NOT_FOUND)                 
                        
        if serializer.is_valid():
            print("Serializer is valid")  # Debugging line
            self.perform_update(serializer,user)
            return response.Response(serializer.data, status=status.HTTP_200_OK)
        print("Serializer errors:", serializer.errors)  # Debugging line
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def perform_update(self,serializer,user):
        # user_data = serializer.validated_data.get('user', {})
        user_data = serializer.validated_data.pop('user',None)
        print('user_data',user_data)
        if user_data:
            print("User data to update:", user_data)  # Debugging line
            for attr, value in user_data.items():
                if attr in ['first_name', 'last_name']:
                    print(f"Updating {attr} to {value}")  # Debugging line
                    setattr(user, attr, value)
            user.save()
        serializer.save()




# class UpdateRequestClientProfileAPIView(views.APIView):
#     serializer_class = UpdateClientProfileSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     def put(self, request, *args, **kwargs):
#         user = request.user
#         try:
#             instance_profile = ClientProfile.objects.get(user=user)
#         except ClientProfile.DoesNotExist:
#             return response.Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)  
#         serializer = self.serializer_class(instance_profile, data=request.data, partial=True)
#         if serializer.is_valid():
#             print("Serializer is valid")  # Debugging line
#             self.perform_update(serializer,user)
#             return response.Response(serializer.data, status=status.HTTP_200_OK)
#         print("Serializer errors:", serializer.errors)  # Debugging line
#         return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
#     def perform_update(self,serializer,user):
#         # user_data = serializer.validated_data.get('user', {})
#         user_data = serializer.validated_data.pop('user',None)
#         print('user_data',user_data)
#         if user_data:
#             print("User data to update:", user_data)  # Debugging line
#             for attr,value in user_data.items():
#                 if attr in ['first_name', 'last_name']:
#                     print(f"Updating {attr} to {value}")  # Debugging line
#                     setattr(user, attr, value)
#             user.save()
#         serializer.save()



# class UpdateRequestAdminProfileAPIView(views.APIView):
#     serializer_class = UpdateAdminProfileSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     def put(self, request, *args, **kwargs):
#         user = request.user
#         try:
#             instance_profile = AdminProfile.objects.get(user=user)
#         except AdminProfile.DoesNotExist:
#             return response.Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)  
#         serializer = self.serializer_class(instance_profile, data=request.data, partial=True)
#         if serializer.is_valid():
#             print("Serializer is valid")  # Debugging line
#             self.perform_update(serializer,user)
#             return response.Response(serializer.data, status=status.HTTP_200_OK)
#         print("Serializer errors:", serializer.errors)  # Debugging line
#         return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
#     def perform_update(self,serializer,user):
#         # user_data = serializer.validated_data.get('user', {})
#         user_data = serializer.validated_data.pop('user',None)
#         print('user_data',user_data)
#         if user_data:
#             print("User data to update:", user_data)  # Debugging line
#             for attr, value in user_data.items():
#                 if attr in ['first_name', 'last_name']:
#                     print(f"Updating {attr} to {value}")  # Debugging line
#                     setattr(user, attr, value)
#             user.save()
#         serializer.save()



  

###################################### Forget password Services  ####################################################333
### 1- Password Reset Request ###########
class PasswordResetRequestView(views.APIView):
    serializer_class=PasswordResetRequestSerializer
    permission_classes=[permissions.IsAuthenticated]

    def post(self, request):
        serializer=self.serializer_class(data=request.data, context={'request':request})
        if serializer.is_valid():
            return response.Response({'message':'we have sent you a link to reset your password'}, status=status.HTTP_200_OK)
        # return Response({'message':'user with that email does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        return response.Response({'message':'user with that email does not exist'}, status=status.HTTP_400_BAD_REQUEST)



### 2- password reset confirm ###### work  automatically when the user clik the link reached to his email
class PasswordResetConfirm(views.APIView):
    permission_classes=[permissions.IsAuthenticated]

    def get(self, request, uidb64, token):
        try:
            user_id=smart_str(urlsafe_base64_decode(uidb64))
            user=UserModel.objects.get(id=user_id)

            if not tokens.PasswordResetTokenGenerator().check_token(user, token):
                return response.Response({'message':'password reset token is invalid or has expired'}, status=status.HTTP_401_UNAUTHORIZED)
            return response.Response({'success':True, 'message':'credentials is valid', 'uidb64':uidb64, 'token':token}, status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError as identifier:
            return response.Response({'message':'password reset token is invalid or has expired'}, status=status.HTTP_401_UNAUTHORIZED)


### 3- Set New Password ###########  
class SetNewPasswordView(views.APIView):
    serializer_class=SetNewPasswordSerializer
    permission_classes=[permissions.IsAuthenticated]

    def patch(self, request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return response.Response({'success':True, 'message':"password reset is succesful"}, status=status.HTTP_200_OK)



###################################### Change password Services  ####################################################333
### Change Password ###########
class ChangePasswordView(views.APIView):
    serializer_class = ChangePasswordSerializer
    model = get_user_model
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, queryset=None):
        return self.request.user

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return response.Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)

            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return response.Response({"detail": "Password updated successfully."}, status=status.HTTP_200_OK)

        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
    