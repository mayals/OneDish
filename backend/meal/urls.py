from django.urls import path
from meal import views





app_name ='meal'


urlpatterns = [
   
    # Tag
    path('create-tag/',views.CreateTagAPIView.as_view(), name='create-tag'),
    path('list-tag/', views.ListTagAPIView.as_view(), name='list-tag'),
    path('detail-tag/<str:id>/', views.DetailTagAPIView.as_view(), name='detail-tag'), 
    path('update-tag/<str:id>/', views.UpdateTagAPIView.as_view(), name='update-tag'), 
    path('delete-tag/<str:id>/', views.DeleteTagAPIView.as_view(), name='delete-tag'), 
    
    # MainMeal
    path('create-main-meal/', views.CreateMainMealAPIView.as_view(), name='create-main-meal'),
    path('list-main-meal/', views.ListMainMealAPIView.as_view(), name='list-main-meal'),
    path('detail-main-meal/<str:id>/', views.DetailMainMealAPIView.as_view(), name='detail-main-meal'), 
    path('update-main-meal/<str:id>/', views.UpdateMainMealAPIView.as_view(), name='update-main-meal'), 
    path('delete-main-meal/<str:id>/', views.DeleteMainMealAPIView.as_view(), name='delete-main-meal'), 
    
    # SideMeal
    path('create-side-main-meal/', views.CreateSideMealAPIView.as_view(), name='create-side-main-meal'),
    path('list-side-main-meal/', views.ListSideMealAPIView.as_view(), name='list-side-main-meal'),
    path('detail-side-main-meal/<str:id>/', views.DetailSideMealAPIView.as_view(), name='detail-side-main-meal'), 
    path('update-side-main-meal/<str:id>/', views.UpdateSideMealAPIView.as_view(), name='update-side-main-meal'), 
    path('delete-side-main-meal/<str:id>/', views.DeleteSideMealAPIView.as_view(), name='delete-side-main-meal'),
    
    
]