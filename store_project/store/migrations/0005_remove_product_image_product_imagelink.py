# Generated by Django 4.2.3 on 2023-08-22 21:54

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0004_rename_title_categorie_category_product_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='image',
        ),
        migrations.AddField(
            model_name='product',
            name='imageLink',
            field=models.TextField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]