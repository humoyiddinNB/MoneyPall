from django.shortcuts import render, redirect
from django.views import View
from .forms import RegisterForm, ProfileUpdateForm
from django.contrib.auth import login, logout
from django.contrib import messages
from django.core.mail import send_mail
from .models import EmailOTP, CustomUser
import random
from django.contrib.auth.mixins import LoginRequiredMixin
from income_outcome.models import Income
from django.utils.timezone import now
from datetime import timedelta
from django.db.models import Sum

class HomePageView(View):
    def get(self, request):
        today = now().date()
        start_of_week = today - timedelta(days=today.weekday())
        start_of_month = today.replace(day=1)

        todays_income = Income.objects.filter(date=today).aggregate(Sum('amount'))['amount__sum'] or 0

        weekly_income = Income.objects.filter(date__gte=start_of_week, date__lte=today).aggregate(Sum('amount'))['amount__sum'] or 0

        monthly_income = Income.objects.filter(date__gte=start_of_month, date__lte=today).aggregate(Sum('amount'))['amount__sum'] or 0

        context = {
            'todays_income': todays_income,
            'weekly_income': weekly_income,
            'monthly_income': monthly_income,
        }
        return render(request, 'homepage.html', context)



class RegisterView(View):
    def get(self, request):
        form = RegisterForm
        return render(request, 'register.html', {'form' : form})

    def post(self, request):
        form = RegisterForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('login')
        return render(request, 'register.html', {'form' : form})





class LoginView(View):
    def get(self, request):
        return render(request, 'login.html')

    def post(self, request):
        email = request.POST.get('email')

        user_exists = CustomUser.objects.filter(email=email).exists()

        if not user_exists:
            messages.error(request, "Email not found.")
            return redirect('login')

        code = str(random.randint(100000, 999999))

        EmailOTP.objects.create(email=email, code=code)

        send_mail(
            subject="MoneyPall ga kirish uchun shundan foydalaning",
            message=f"Hi, your OTP is: {code}. It will expire in 5 minutes.",
            from_email="noreply@moneypall.uz",
            recipient_list=[email]
        )

        request.session['otp_email'] = email
        return redirect('otp_verify')



class OTPVerifyView(View):
    def get(self, request):
        if 'otp_email' in request.session:
            return render(request, 'otp_verify.html')
        else:
            messages.error(request, "Session mavjud emas. qayta urining hay.")
            return redirect('login')

    def post(self, request):
        email = request.session.get('otp_email')
        otp_code = request.POST.get('otp_code')

        try:
            otp = EmailOTP.objects.get(email=email, code=otp_code)
        except EmailOTP.DoesNotExist:
            messages.error(request, "OTP xato yoki yaroqsiz.")
            return redirect('otp_verify')

        if otp.is_expired:
            messages.error(request, "OTP vaqti tugadi bro!")
            return redirect('otp_verify')

        if otp.is_confirmed:
            messages.error(request, "OTP oldin foydalanilgan")
            return redirect('otp_verify')

        otp.is_confirmed = True
        otp.save()

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            messages.error(request, "Foydalanuvchi topilmadi")
            return redirect('login')

        login(request, user)
        messages.success(request, "Hush kelibsiz!")
        return redirect('homepage')


class ProfileView(View):
    def get(self, request):
        user = request.user
        return render(request, 'profile.html', {'user' : user})


class LogoutConfirmView(View):
    def get(self, request):
        return render(request, 'logout_confirm.html')

    def post(self, request):
        logout(request)
        return redirect('homepage')


class LogoutView(View):
    def get(self, request):
        logout(request)
        return redirect('homepage')


class ProfileUpdateView(LoginRequiredMixin, View):
    def get(self, request):
        form = ProfileUpdateForm(instance=request.user)
        return render(request, 'profile_update.html', {'form': form})

    def post(self, request):
        form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, "Profil muvaffaqiyatli yangilandi.")
            return redirect('profile')
        return render(request, 'profile_update.html', {'form': form})


class DeleteAccountView(View):
    def get(self, request):
        return render(request, 'delete_account_confirm.html')

    def post(self, request):
        request.user.delete()
        return redirect('homepage')