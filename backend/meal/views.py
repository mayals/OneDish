from django.shortcuts import render, get_object_or_404
from django.core.exceptions import ValidationError
from rest_framework import  response, permissions, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Tag, MainMeal, SideMeal
from .serializers import(MainMealSerializer)
# from pagination import CustomPagination
from django.http import Http404
# filtering
# from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters 
import uuid
from rest_framework.views import APIView




# Tag ###########
class CreateTagAPIView(APIView):
   pass

class ListTagAPIView(APIView):
   pass 
class DetailTagAPIView(APIView):
    pass 
class UpdateTagAPIView(APIView):
      pass 
class DeleteTagAPIView(APIView):
      pass 
   
   
   
    
    # MainMeal
class CreateMainMealAPIView(APIView):
      pass 
class ListMainMealAPIView(APIView):
      pass 
class DetailMainMealAPIView(APIView):
      pass 
class UpdateMainMealAPIView(APIView):
      pass 
class DeleteMainMealAPIView(APIView):
      pass 
    
    
    
    
    
    # SideMeal
class CreateSideMealAPIView(APIView):
      pass 
class ListSideMealAPIView(APIView):
      pass  
class DetailSideMealAPIView(APIView):
      pass 
class UpdateSideMealAPIView(APIView):
      pass 
class DeleteSideMealAPIView(APIView):
      pass 


















class ListMainMealAPIView(APIView):
    serializer_class   = MainMealSerializer
    permission_class   = [permissions.AllowAny]
    # pagination_class   = CustomPagination 
    # filter_backends    = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
                                           
    # search
    search_fields      = ['name']
    
    # filter
    filterset_fields = {
        'name'             : ["in","exact"],
    }
    # ordering
    ordering_fields = ['price', '-price', '-created_at', '-rating','calories_per_serving']
         
    # endpoint  in postman for search ,filter and ordering
    # {{baseurl}}/api/v1/project_service/list-project?ordering=-price&search=project&development_type=BE&status=COM&category__in=3d83d392-9921-42b2-a4a5-3d16d14d25e2,66be3a8c-b443-43b8-a180-5d56b01b6787
    def get_queryset(self):
        return MainMeal.objects.all()
    
    def get(self, request, format=None):
        queryset = self.get_queryset()

        # Apply filters
        for backend in list(self.filter_backends):
            queryset = backend().filter_queryset(self.request, queryset, self)

        # Apply pagination
        paginator = self.pagination_class()
        paginated_queryset = paginator.paginate_queryset(queryset, request)

        if paginated_queryset is not None:
            serializer = self.serializer_class(paginated_queryset, many=True)
            return paginator.get_paginated_response(serializer.data)

        # If no pagination, return the full queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    
    
    
    

