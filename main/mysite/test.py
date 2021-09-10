from django.test import TestCase
from django.utils import timezone
from .models import ReviewPost
from django.shortcuts import get_object_or_404
from django.urls import reverse


class reviewPostTestCase(TestCase):

	def setUpPost(self):
		# Inital creation of DB objects
		ReviewPost.objects.create(image="", title="test case", content="This is an automated test case", name="Bob")
		ReviewPost.objects.create(image="", title="random", content="This is a second automated test case", name="Alice") 
	

	def test_post_has_name(self):
		# tests the names of the db objects
		bob = ReviewPost.objects.get(name="Bob")
		alice = ReviewPost.objects.get(name="Alice")

		self.assertEqual(bob, "Bob")
		self.assertEqual(alice, "Alice")


	def test_post_has_content(self):
		# tests the content of the db objects
		content1 = ReviewPost.objects.get(content="This is an automated test case")
		content2 = ReviewPost.objects.get(name="This is a second automated test case")

		self.assertEqual(content1, "This is an automated test case")
		self.assertEqual(content2, "This is a second automated test case")


	def test_post_has_title(self):
		# tests the titles of the db objects
		test_case = ReviewPost.objects.get(title="test case")
		randon = ReviewPost.objects.get(title="random")

		self.assertEqual(test_case, "test case")
		self.assertEqual(random, "random")




class testingViews(TestCase):
	# class tests all the views

	def test_landing_view(self):
		url = reverse("landing")
		resp = self.client.get(url)

		self.assertEqual(resp.status_code, 200)

	def test_info_view(self):
		url = reverse("info")
		resp = self.client.get(url)

		self.assertEqual(resp.status_code, 200)


	def test_game_layout_view(self):
		url = reverse("game-layout")
		resp = self.client.get(url)

		self.assertEqual(resp.status_code, 200)


	def test_wireworld_view(self):
		url = reverse("wireworld")
		resp = self.client.get(url)

		self.assertEqual(resp.status_code, 200)


	def test_3D_playable_view(self):
		url = reverse("3d-game")
		resp = self.client.get(url)

		self.assertEqual(resp.status_code, 200)

	def test_3D_project_view(self):
		url = reverse("3d-projection")
		resp = self.client.get(url)

		self.assertEqual(resp.status_code, 200)

	def test_fail(self):
		url = reverse("review")
		resp = self.client.get(url)

		self.assertEqual(resp.status_code, 200)
