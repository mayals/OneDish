from django.apps import AppConfig


class AccountConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'account'
    
    
    
    # Note: signal NOT work without this code :
    def ready(self):
        import account.signals
