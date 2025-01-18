from django.contrib import admin
from django.contrib import admin
from .models import  Tag, MainMeal, SideMeal
 
 
 
@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display  = ['id', 'name']
    list_filter   = ['name']
    search_fields = ['name']
    
    
@admin.register(MainMeal)
class MainMealAdmin(admin.ModelAdmin):
    list_display  =  ['id', 'name', 'price', 'rating', 'discount']
    list_filter   =  ['name', 'price']
    search_fields = ("name",)
      
      
      
@admin.register(SideMeal)
class SideMealAdmin(admin.ModelAdmin):
    list_display  =  ['id', 'name', 'price', 'rating', 'discount']
    list_filter   =  ['name', 'price']
    search_fields = ("name",)



