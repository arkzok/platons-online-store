# Generated by Django 4.2.3 on 2023-08-23 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0006_rename_categorie_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='imageLink',
            field=models.CharField(db_index=True, max_length=150),
        ),
    ]
