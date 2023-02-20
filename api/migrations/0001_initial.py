# Generated by Django 4.1.5 on 2023-01-21 06:33

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Post",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "post_id",
                    models.CharField(
                        default=api.models.generate_post_id,
                        editable=False,
                        max_length=8,
                        unique=True,
                    ),
                ),
                ("message", models.CharField(default="", max_length=256)),
                ("createdAt", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
