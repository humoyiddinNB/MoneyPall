from django.urls import path
from .views import HomePageView, RegisterView, LoginView, OTPVerifyView, ProfileView, LogoutView, LogoutConfirmView, \
    ProfileUpdateView, DeleteAccountView


urlpatterns = [
    path('', HomePageView.as_view(), name='homepage'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('otp_verify/', OTPVerifyView.as_view(), name='otp_verify'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('logout/confirm/', LogoutConfirmView.as_view(), name='logout_confirm'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/update/', ProfileUpdateView.as_view(), name='profile_update'),
    path('account/delete/', DeleteAccountView.as_view(), name='delete_account'),
]