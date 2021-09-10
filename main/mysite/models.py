#models to go here
from django.db import models
from django.conf import settings
from django.db.models import Q


# Create your models here.

User = settings.AUTH_USER_MODEL


class ReviewPost(models.Model):
    	
	image 			= models.ImageField(upload_to='image/', blank= True, null= True)
	title 			= models.CharField(max_length= 100)
	content 		= models.TextField(null= True, blank= True)
	name      		= models.CharField(null= True, blank= True, max_length= 50)
	timestamp	 	= models.DateTimeField(auto_now_add= True)

	class Meta:
		ordering = ['-timestamp']


