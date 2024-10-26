# Generated by Django 5.1.2 on 2024-10-25 14:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('InProgress', 'In Progress'), ('Loss', 'Loss'), ('Won', 'Won')], default='InProgress', max_length=10)),
                ('word', models.CharField(max_length=100)),
                ('word_state', models.CharField(max_length=100)),
                ('incorrect_guesses_made', models.IntegerField(default=0)),
                ('incorrect_guesses_left', models.IntegerField(default=0)),
            ],
        ),
    ]
