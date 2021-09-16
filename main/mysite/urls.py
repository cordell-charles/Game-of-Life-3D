"""
mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls import url
from django.contrib.auth import views as auth_views
from .views import (
    landing_page_view,
    game_view,
    review_view,
    about_view,
    wireworld_view,
    game_layout_view,
    game_of_life_3d_projection_view,
    game_of_life_3d_playable_view,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", landing_page_view, name="landing"),
    path("gameOfLife/", game_view, name="game"),
    path("about/", about_view, name="about"),
    path("review/", review_view, name="review"),
    path("game-layout", game_layout_view, name="game-layout"),
    path("wireworld/", wireworld_view, name="wireworld"),
    path("3d-projection/", game_of_life_3d_projection_view, name="3d-projection"),
    path("3d-game/", game_of_life_3d_playable_view, name="3d-game"),
]


if settings.DEBUG:
    from django.conf.urls.static import static

    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
