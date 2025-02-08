from rest_framework import response, pagination



class CustomPagination(pagination.PageNumberPagination):
    def get_paginated_response(self, data):

        return response.Response({
            'links': {
                'next'    : self.get_next_link(),
                'previous': self.get_previous_link()    
            },
            'count'  : self.page.paginator.count,
            'results': data
        })