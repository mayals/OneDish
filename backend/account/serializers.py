from django.contrib.auth import authenticate
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.auth.password_validation import validate_password
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_str, smart_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.urls import reverse
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from . models import UserModel, ClientProfile, AdminProfile, OneTimePassword
from . utils import send_normal_email





###################################### Authentication-proccess  ####################################################

######## User with user serializer ( user register ) ####################################################
##################################### user Register (for  client and admin profile)###########################################333
class ClientProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientProfile 
        exclude = ['user']
    
    def validate_phone_number(value):
        if not value :
            raise serializers.ValidationError("phone_number field is required")
        return value
      
class AdminProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminProfile 
        exclude = ['user']
    
    def validate_phone_number(value):
        if not value :
            raise serializers.ValidationError("phone_number field is required")
        return value    
    
# create User with Clint
class RegisteUserProfileSerializer(serializers.ModelSerializer):
    password       = serializers.CharField(max_length=68, min_length=6, write_only=True)
    password2      = serializers.CharField(max_length=68, min_length=6, write_only=True)
    profile        = serializers.SerializerMethodField()
    
    class Meta:
        model = UserModel
        fields = ['id', 'email', 'first_name', 'last_name', 'is_verifiedEmail', 'is_superuser ', 'is_client', 'is_active', 'is_staff', 'role']
        extra_kwargs = {'password': {'write_only': True}}
        read_only_fields = ['id', 'is_verifiedEmail', 'is_verifiedEmail', 'is_superuser ', 'is_client', 'is_active', 'is_staff', 'role'] 
    
    def get_profile(self, obj): # obj is user object
        if obj.is_client:
            try:
                cp = obj.profile   # client_profile from Model ClientProfile related name='client_profile' , it is object created by signal
                return ClientProfileSerializer(cp).data
            except ClientProfile.DoesNotExist:
                return None
        
        if obj.is_superuser:
            try:
                ap = obj.profile   # admin_profile from Model AdminProfile related name='admin_profile' , it is object created by signal
                return AdminProfileSerializer(ap).data
            except AdminProfile.DoesNotExist:
                return None
    
    def validate(self, attrs):
        password  = attrs.get('password')
        password2 = attrs.get('password2')
        if password | password2 ==  "" :
            raise serializers.ValidationError("The password field is required")
        if password != password2:
            raise serializers.ValidationError("Passwords do not match")
        return attrs

    def validate_email(self, value):
        """
        Validate that the email is  not empty and value is unique.
        """
        if value is None:
            raise serializers.ValidationError("The Email field is required")  
        if UserModel.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value
        

    def validate_first_name(self, value):
        """
        Validate that the first_name is  not empty.
        """
        if value is None:
            raise serializers.ValidationError("The First Name field is required") 
        return value

    def validate_last_name(self, value):
        """
        Validate that the last_name is  not empty.
        """
        if value is None:
            raise serializers.ValidationError("The Last Name field is required") 
        return value
     
    def create(self, validated_data):
        print('validated_data',validated_data)
        valid_profile_data = validated_data.pop('profile',None) # pop client_profile_data from validated_data
        
        user = UserModel.objects.create_user(
                                    email=validated_data['email'],
                                    first_name=validated_data['first_name'],
                                    last_name=validated_data['last_name'],
                                    password=validated_data['password'],
        )
        if valid_profile_data:
            if user.is_client:
                ClientProfile.objects.create(user=user, **valid_profile_data)
            if user.is_superuser:
                AdminProfile.objects.create(user=user, **valid_profile_data)
        return user




### OTP-for verified email ###########
class OneTimePasswordSerializer(serializers.ModelSerializer):
    otp = serializers.CharField(max_length=6, write_only=True)

    class Meta:
        model=OneTimePassword
        fields = ['otp']
    
    def validate_otp(self, value):
        if value is None:
            raise serializers.ValidationError("The otp field is required") 
        return value
    



### login by email & password to get ACCESS TOKEN + REFRESH TOKEN  ###########
class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    password=serializers.CharField(max_length=68, min_length=6, write_only=True)
    # read_only fields
    role = serializers.CharField(max_length=100, read_only=True)
    first_name=serializers.CharField(max_length=100, read_only=True)
    last_name=serializers.CharField(max_length=100, read_only=True)
    full_name=serializers.CharField(max_length=255, read_only=True)
    is_verified_email=serializers.BooleanField(read_only=True)
    profile_picture=serializers.ImageField(read_only=True)
    access_token=serializers.CharField(max_length=255, read_only=True)
    refresh_token=serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = UserModel
        fields = ['id','email','password', 'role','first_name', 'last_name', 'full_name', 'is_verified_email', 'profile_picture', 'access_token', 'refresh_token']
        read_only_fields = ['id','role','full_name','first_name','last_name','is_verified_email','profile_picture','access_token', 'refresh_token']
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        request=self.context.get('request')
        user = authenticate(request, email=email, password=password)
        if not user:
            raise AuthenticationFailed("invalid credential try again")
        if not user.is_verified_email:
            raise AuthenticationFailed("Email is not verified")
        tokens=user.tokens()
        
        # only authenticated user with is_verified_email=True will be return
        return {
            'id'                : user.id,
            'role'              : user.role,
            'email'             : user.email,
            'first_name'        : user.first_name,
            'last_name'         : user.last_name,
            'is_verified_email' : user.is_verified_email,
            'full_name'         : user.get_full_name,
            'profile_picture'   : user.get_profile_picture,
            "access_token"      : str(tokens.get('access')),
            "refresh_token"     : str(tokens.get('refresh'))
        }




### logout ###########  used if we want to add token to blacklist using this serializer 
class LogoutSerializer(serializers.Serializer):
    refresh_token = serializers.CharField(
                                    write_only=True,
                                    required=True,
                                    error_messages={
                                        "blank": "Refresh token cannot be empty.",
                                    },
    )

    default_error_messages = {
        'bad_token': 'Token is expired or invalid'
    }

    def validate(self, attrs):
        self.token = attrs.get('refresh_token')
        return attrs

    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            print('token will blacklist inside LogoutUserSerializer=',token)
            token.blacklist()
            return {"message": "You have been logged out successfully."}
        
        except TokenError as e:
            # Log the error if needed
            print(f"TokenError: {str(e)}")
            self.fail('bad_token')
#####################################################################################################################3
    









#####################################   UserModel  CRUD  ############################################################333
##########  update user ptrofile BY REQUEST USER #######################
class UserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = UserModel
        fields = ['id', 'role','first_name', 'last_name','email','is_verified_email','date_joined','last_login', 'profile','full_name']
        read_only_fields = ['id','is_verified_email', 'date_joined', 'last_login',
                           'is_superuser', 'is_active', 'is_staff','is_client', 'is_employee','full_name'
                           ]  

    def get_full_name(self, obj):
        return f"{obj.first_name.title()} {obj.last_name.title()}"
   
    def get_profile(self, obj):  # obj is the user object
        if obj.is_client:
            try:  
                # print(f"Fetching client profile for user: {obj.id}")
                return ClientProfileSerializer(obj.clientprofile).data 
            except(ClientProfile.DoesNotExist):
                print(f"Profile does not exist for user")
                return None

        
        if obj.is_superuser:
            try:
                # print(f"Fetching employee profile for user: {obj.id}")
                return AdminProfileSerializer(obj.adminprofile).data
            except(AdminProfile.DoesNotExist):
                print(f"Profile does not exist for user: {obj.id}")
                return None
        
    
        
#  we will use this user serializer in project reviews list page 
class SimplifiedUserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()

    class Meta:
        model =  UserModel
        fields = ['id', 'email', 'full_name', 'profile']

    def get_profile(self, obj):
        return UserSerializer.get_profile(self, obj)  # Reuse the logic from UserSerializer

    def get_full_name(self, obj):
        return UserSerializer.get_full_name(self, obj)
    
        
            
        
        
        
##########  update user ptrofile BY REQUEST USER #######################
class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['first_name', 'last_name', 'is_verified_email']
        read_only_fields = ('is_superuser', 'is_active', 'is_staff','role',)

        def update(self, instance, validated_data): # work ok 
            instance.first_name = validated_data.get('first_name', instance.first_name)
            instance.last_name  = validated_data.get('last_name', instance.last_name)
            instance.is_verified_email  = validated_data.get('is_verified_email', instance.is_verified_email)
            instance.save()
            user = UserModel(instance)
            user.save()
            # return user  
            return super().update(instance, validated_data)  
      
 
           

class UpdateClientProfileSerializer(serializers.ModelSerializer):
    user = UpdateUserSerializer(required=True,many=False)
    class Meta:
        model = ClientProfile
        fields = ['user', 'date_of_birth','gender','phone_number','country', 'address','profile_picture']  # replace 'other_profile_fields' with actual fields from EmployeeProfile model

    def update(self, instance, validated_data):
        print('validated_data',validated_data)
        user_data = validated_data.pop('user', None)
        if user_data:
            user = instance.user
            for attr, value in user_data.items():
                if attr in ['first_name', 'last_name']:
                    setattr(user, attr, value)
            user.save()
        return super().update(instance, validated_data)       
       
       


class UpdateAdminProfileSerializer(serializers.ModelSerializer):
    user = UpdateUserSerializer(required=True)
    class Meta:
        model = AdminProfile
        fields = ['user', 'date_of_birth','gender','phone_number','country', 'address','profile_picture']  # replace 'other_profile_fields' with actual fields from EmployeeProfile model

    def update(self, instance, validated_data): # Update AdminProfile fields + User fields
        print('validated_data',validated_data)
        user_data = validated_data.pop('user', None)
        # updae User fields -- not work because user data_data = None !
        if user_data:
            user = instance.user
            for attr, value in user_data.items():
                if attr in ['first_name', 'last_name']:
                    setattr(user, attr, value)
            user.save()
        return super().update(instance, validated_data)


###########################################################################################################################







###################################### Forget password Services  ####################################################333
### 1- Password Reset Request ###########
class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        fields = ['email']

    def validate(self, attrs):   
        email = attrs.get('email')
        if UserModel.objects.filter(email=email).exists():
            user= UserModel.objects.get(email=email)
            uidb64=urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            request=self.context.get('request')
            current_site=get_current_site(request).domain
            relative_link =reverse('accounts:password-reset-confirm', kwargs={'uidb64':uidb64, 'token':token})
            # print('relative_link',relative_link)
            abslink=f"http://{current_site}{relative_link}"
            # print('abslink',abslink)
            email_body=f"Hi {user.first_name} use the link below to reset your password {abslink}"
            data={
                'email_body':email_body, 
                'email_subject':"Reset your Password", 
                'to_email':user.email
                }
            send_normal_email(data)

        return super().validate(attrs)

    
### 2- password reset confirm ###### no need serializer
    
### 3- Set New Password ###########   
class SetNewPasswordSerializer(serializers.Serializer):
    password=serializers.CharField(max_length=100, min_length=6, write_only=True)
    confirm_password=serializers.CharField(max_length=100, min_length=6, write_only=True)
    uidb64=serializers.CharField(min_length=1, write_only=True)
    token=serializers.CharField(min_length=3, write_only=True)

    class Meta:
        fields = ['password', 'confirm_password', 'uidb64', 'token']

    def validate(self, attrs):
        try:
            token=attrs.get('token')
            uidb64=attrs.get('uidb64')
            password=attrs.get('password')
            confirm_password=attrs.get('confirm_password')
            user_id=force_str(urlsafe_base64_decode(uidb64))
            user=UserModel.objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed("reset link is invalid or has expired", 401)
            if password != confirm_password:
                raise AuthenticationFailed("passwords do not match")
            user.set_password(password)
            user.save()
            return user
        
        except Exception as e:
            return AuthenticationFailed("link is invalid or has expired")




    

###################################### Change password Services  ####################################################333
### Change Password ###########    
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    
    def validate_old_password(self, value):
        user = self.context['request'].user
        # Check if the old password matches the current password of the user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password does not match.")
        return value
    
    def validate_new_password(self, value):
        # Validate the password meets strength requirements
        validate_password(value)
        return value
    
    def validate(self, data):
        old_password = data.get('old_password')
        new_password = data.get('new_password')

        if old_password and new_password and old_password == new_password:
            raise serializers.ValidationError("New password cannot be the same as old password.")
        return data
    
    
    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user