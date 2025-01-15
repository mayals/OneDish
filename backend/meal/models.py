from django.db import models
from django.utils.text import slugify
from django.urls import reverse



class Tag(models.Model):
    id   = models.AutoField(primary_key=True, unique=True, editable=False)
    name = models.CharField(max_length=100, unique=True, null=True, blank=False)
    slug = models.SlugField(max_length=120, blank=True, null=True)
     
    def save(self, *args, **kwargs):
        self.slug = slugify(str(self.name))
        super().save(*args, **kwargs)   # Call the "real" save() method. 
    
    def get_absolute_url(self):
        return reverse('tag-detail', kwargs = {'slug':self.slug})
    
    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name',)
        verbose_name = 'Tag'
        verbose_name_plural = 'Tags'






class MainMeal(models.Model):
    # Unique identifier for the meal
    id = models.AutoField(primary_key=True, unique=True, editable=False)

    # Name of the meal
    name = models.CharField(max_length=255, unique=True, null=True, blank=False)

    # Detailed description of the meal
    descriptions = models.TextField(blank=True, null=True)

    # Price of the meal in USD (or preferred currency)
    price = models.DecimalField(default=00.00,max_digits=10, decimal_places=2, null=True, blank=True)

    # Discount on the meal (percentage or amount)
    discount = models.DecimalField(default=00.00,max_digits=10, decimal_places=2, null=True, blank=True)

    # Size of the meal (e.g., small, medium, large)
    size = models.CharField(max_length=50, unique=True, blank=True, null=True)

    # Cuisine type (e.g., Italian, Mexican, etc.)
    cuisine = models.CharField(max_length=50, unique=True, blank=True, null=True)

    # Calories per serving
    calories_per_serving = models.IntegerField(default=0)

    # Image URL for the meal
    image = models.ImageField(upload_to = "meal/main-meal/%Y/%m/%d/", blank=True, null=True)

    # Average rating
    rating = models.FloatField(default=0.0)

    # Number of reviews
    review_count = models.PositiveIntegerField(default=0)

    # Tags (e.g., keywords related to the meal)
    tags = models.ManyToManyField(Tag, blank=False)

    def __str__(self):
        return self.name




class SideMeal(models.Model):
    # Unique identifier for the meal
    id = models.AutoField(primary_key=True, unique=True, editable=False)

    # Name of the meal
    name = models.CharField(max_length=255, unique=True, null=True, blank=False)

    # Detailed description of the meal
    descriptions = models.TextField(blank=True, null=True)

    # Price of the meal in USD (or preferred currency)
    price = models.DecimalField(default=00.00,max_digits=10, decimal_places=2, null=True, blank=True)

    # Discount on the meal (percentage or amount)
    discount = models.DecimalField(default=00.00,max_digits=10, decimal_places=2, null=True, blank=True)

    # Size of the meal (e.g., small, medium, large)
    size = models.CharField(max_length=50, unique=True, blank=True, null=True)

    # Cuisine type (e.g., Italian, Mexican, etc.)
    cuisine = models.CharField(max_length=50, unique=True, blank=True, null=True)

    # Calories per serving
    calories_per_serving = models.IntegerField(default=0)

    # Image URL for the meal
    image = models.ImageField(upload_to = "meal/main-meal/%Y/%m/%d/", blank=True, null=True)

    # Average rating
    rating = models.FloatField(default=0.0)

    # Number of reviews
    review_count = models.PositiveIntegerField(default=0)

    # Tags (e.g., keywords related to the meal)
    tags = models.ManyToManyField(Tag, blank=False)

    def __str__(self):
        return self.name

