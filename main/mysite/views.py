from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.shortcuts import render
from .models import ReviewPost
from .forms import ReviewPostForm


# Views created here

"""
def login_page_view(request):
    	'''
		view dedicated to login users into page.
		Users may want to create an account in order to log highscores data
		'''
    	return render(request, "login.html")
"""

def landing_page_view(request):
    template_name = 'main/threejs-landing.html'
    return render(request, template_name, {})


def game_view(request):
    template_name = 'gameSpace/cube.html'
    return render(request, template_name, {})

def info_view(request):
    template_name = 'gameSpace/2d-index.html'
    return render(request, template_name, {})

def game_layout_view(request):
    template_name = 'main/game-layout.html'
    return render(request, template_name, {})


def wireworld_view(request):
    template_name = 'gameSpace/wireworld.html'
    return render(request, template_name, {})


def game_of_life_3d_view(request):
    template_name = 'gameSpace/game-of-life-3d.html'
    return render(request, template_name, {})

def review_view(request):
    template_name = 'main/review.html'

    #Form used for users to comment on platform
    form = ReviewPostForm(request.POST or None, request.FILES or None)
    if form.is_valid():
        title = form.cleaned_data['title']
        content = form.cleaned_data['content']
        name = form.cleaned_data['name']
        obj = ReviewPost.objects.create(title=title, content=content, name=name)
        obj.save()
        return HttpResponseRedirect(reverse('review'))
    
    objects = ReviewPost.objects.all()
    return render(request, template_name, {'objects': objects, 'form':form})