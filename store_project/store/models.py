from django.db import models
from django.shortcuts import reverse

# Create your models here.
class Category(models.Model):
    title = models.CharField(max_length=150, db_index=True)

    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('category_detail_url', kwargs={'pk': self.pk})
    
class Product(models.Model):
    title = models.CharField(max_length=255, db_index=True)
    price = models.IntegerField()
    info = models.TextField()
    image = models.ImageField(upload_to='images/', default='images/default.png')
    categories = models.ManyToManyField(Category, blank=True, related_name='products')
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('product_detail_url', kwargs={'pk': self.pk})
    
class Order(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    product = models.ForeignKey(Product, on_delete=models.PROTECT)

    def __str__(self):
        return self.name