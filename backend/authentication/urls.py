from django.conf.urls import url
from .views import AuthRegister, AuthUpdate, ListUsersAPIView
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

urlpatterns = [
    url(r'^login/', obtain_jwt_token),
    url(r'^token-refresh/', refresh_jwt_token),
    url(r'^token-verify/', verify_jwt_token),
    url(r'^register/$', AuthRegister.as_view()),
    url(r'^update/(?P<id>[\w-]+)/$', AuthUpdate.as_view()),
    url(r'^list/', ListUsersAPIView.as_view()),
]