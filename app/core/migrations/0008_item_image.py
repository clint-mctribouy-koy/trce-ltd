# Generated by Django 3.2.16 on 2023-01-13 17:06

import core.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_auto_20230113_1437'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='image',
            field=models.ImageField(null=True, upload_to=core.models.product_image_file_path),
        ),
    ]