# Generated by Django 4.1.5 on 2023-02-20 14:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0003_alter_post_message"),
    ]

    operations = [
        migrations.AlterField(
            model_name="post",
            name="owner",
            field=models.CharField(db_index=True, max_length=50, null=True),
        ),
    ]
