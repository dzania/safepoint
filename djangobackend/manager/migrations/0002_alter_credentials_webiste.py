# Generated by Django 3.2.5 on 2021-07-27 13:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manager', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='credentials',
            name='webiste',
            field=models.TextField(max_length=50),
        ),
    ]
