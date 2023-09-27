from django.shortcuts import render
from .models import Product, Category, Order
from django.views.generic import ListView, DetailView
from .utils import CategoryMixin

class ProductListView(ListView, CategoryMixin):
    model = Product

    def get_queryset(self):
        search_query = self.request.GET.get('search', None)
        if search_query:
            return self.model.objects.filter(title__icontains=search_query)
        return self.model.objects.all()

class ProductDetailView(DetailView):
    model = Product

class CategoryDetailView(DetailView):
    model = Category

def save_order(request):
    category_list = Category.objects.all()
    order = Order()
    order.name = request.POST['user_name']
    order.email = request.POST['user_email']
    order.product = Product.objects.get(pk=request.POST['product_id'])
    order.save()
    return render(request, 'store/save_order.html', context={
        'order': order,
        'category_list': category_list
    })