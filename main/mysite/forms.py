from django import forms
from .models import ReviewPost
from django.forms import ValidationError


class ReviewPostForm(forms.ModelForm):

    content = forms.CharField(widget=forms.Textarea)

    class Meta:
        model = ReviewPost
        fields = ["title", "content", "image", "name"]
