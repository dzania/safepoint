# Generated by Django 3.2.5 on 2021-07-27 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manager', '0004_alter_credentials_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='credentials',
            name='password',
            field=models.BinaryField(),
        ),
    ]
