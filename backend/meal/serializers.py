from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from urllib.parse import urlparse
from . models import Tag, MainMeal







class TagSerializer(serializers.ModelSerializer):

    def validate_name(self, value):
        if value is None:
            raise serializers.ValidationError("The tag name's field is required") 
        if Tag.objects.filter(name=value).exists():
            raise serializers.ValidationError("The tag name's must be unique")     
        print(value)
        return  value
      
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']
        extra_kwargs = {
                    'name' : {'required' : True},
                    'id'   : {'read_only': True },
                    'slug' : {'read_only': True },
        }
        
      
      
        
        
class MainMealSerializer(serializers.ModelSerializer):
    id              = serializers.IntegerField(read_only=True)
    name            = serializers.CharField(max_length=200,required=True,validators=[UniqueValidator(queryset=MainMeal.objects.all())] )
    # many to many field
    tags            = TagSerializer(many=True, required=True)  # Nested serialization
    # related_field  read_only
    meal_reviews    = serializers.SerializerMethodField # read_only field from another table Review
    reviews_count   = serializers.SerializerMethodField # read_only field to save reviews_count for instance meal
    average_rating  = serializers.SerializerMethodField # read_only field to save average_rating for instance meal
    
    class Meta:
        model = MainMeal
        fields = ['id', ' name', 'tags',
                  'created_at', 'updated_at', 'bookPrice',
                  'average_rating', 'reviews_count',
                  'meal_reviews' # read_only field from another table Review
                ]
        extra_kwargs = {
                    'id'          : {'read_only': True },
                    'name'       : {'required' : True, 'unique':True},
                    'tags'         : {'required' : True },
                    'image' : {'required' : False},
                    'meal_reviews' : {'read_only': True }, # related_field
        } 

    #book_reviews  related_field  read_only
    # @property
    # def get_meal_reviews(self):
    #     reviews = Review.objects.all().filter(book=self)
    #     return reviews
    
    # @property
    # def get_reviews_count(self):
    #     reviews_count = Review.objects.all().filter(book=self).count()
    #     return reviews_count

    

    # validate_field
    def validate_name(self, value):
        if value is None:
            raise serializers.ValidationError("The Main Meal's name field is required") 
        if MainMeal.objects.filter(name=value).exists():
            raise serializers.ValidationError("The Main Meal's name must be unique")     
        print(value)
        return  value

    
    def validate_tags(self, value):
        if value is None:
            raise serializers.ValidationError("The Main Meal's tags field is required")     
        print(value)
        return  value

    


    def create(self, validated_data):
        return validated_data
    
