from django.shortcuts import render, redirect
from django.views import View
from .models import Income, Expense, IncomeCategory, ExpenseCategory
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import messages
from datetime import datetime, timedelta
from django.utils import timezone
from .forms import IncomeCategoryForm, ExpenseCategoryForm



class DashboardView(LoginRequiredMixin, View):
    def get(self, request):
        user = request.user

        income_categories = IncomeCategory.objects.all()
        expense_categories = ExpenseCategory.objects.all()

        incomes = Income.objects.filter(user=user).order_by('-date')
        expenses = Expense.objects.filter(user=user).order_by('-date')

        today = timezone.now().date()
        week_ago = today - timedelta(days=7)
        month_ago = today - timedelta(days=30)
        year_ago = today - timedelta(days=365)

        total_income = sum(income.amount for income in incomes)
        total_expense = sum(expense.amount for expense in expenses)
        balance = total_income - total_expense

        daily_income = sum(income.amount for income in incomes.filter(date=today))
        daily_expense = sum(expense.amount for expense in expenses.filter(date=today))

        weekly_income = sum(income.amount for income in incomes.filter(date__gte=week_ago))
        weekly_expense = sum(expense.amount for expense in expenses.filter(date__gte=week_ago))

        monthly_incomes = incomes.filter(date__gte=month_ago)
        monthly_expenses = expenses.filter(date__gte=month_ago)
        monthly_income = sum(income.amount for income in monthly_incomes)
        monthly_expense = sum(expense.amount for expense in monthly_expenses)

        yearly_income = sum(income.amount for income in incomes.filter(date__gte=year_ago))
        yearly_expense = sum(expense.amount for expense in expenses.filter(date__gte=year_ago))

        context = {
            'income_categories': income_categories,
            'expense_categories': expense_categories,
            'incomes': incomes,
            'expenses': expenses,
            'total_income': total_income,
            'total_expense': total_expense,
            'balance': balance,
            'daily_income': daily_income,
            'weekly_income': weekly_income,
            'monthly_income': monthly_income,
            'yearly_income': yearly_income,
            'daily_expense': daily_expense,
            'weekly_expense': weekly_expense,
            'monthly_expense': monthly_expense,
            'yearly_expense': yearly_expense,
            'monthly_incomes': monthly_incomes,
            'monthly_expenses': monthly_expenses,
        }

        return render(request, 'dashboard.html', context)


class AddIncomeView(LoginRequiredMixin, View):
    def post(self, request):
        amount = request.POST.get('amount')
        category_id = request.POST.get('category')
        currency = request.POST.get('currency')
        description = request.POST.get('description')
        date = request.POST.get('date') or timezone.now().date()

        category = IncomeCategory.objects.get(id=category_id)
        Income.objects.create(
            user=request.user,
            amount=amount,
            category=category,
            currency=currency,
            description=description,
            date=date
        )
        messages.success(request, "Income added successfully.")
        return redirect('dashboard')


class AddExpenseView(LoginRequiredMixin, View):
    def post(self, request):
        amount = request.POST.get('amount')
        category_id = request.POST.get('category')
        currency = request.POST.get('currency')
        description = request.POST.get('description')
        date = request.POST.get('date') or timezone.now().date()

        category = ExpenseCategory.objects.get(id=category_id)
        Expense.objects.create(
            user=request.user,
            amount=amount,
            category=category,
            currency=currency,
            description=description,
            date=date
        )
        messages.success(request, "Expense added successfully.")
        return redirect('dashboard')




class AddIncomeCategoryView(View):
    def get(self, request):
        form = IncomeCategoryForm()
        return render(request, 'add_income_category.html', {'form': form})

    def post(self, request):
        form = IncomeCategoryForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, "Income kategoriyasi muvaffaqiyatli qo'shildi.")
            return redirect('dashboard')
        return render(request, 'add_income_category.html', {'form': form})


class AddExpenseCategoryView(View):
    def get(self, request):
        form = ExpenseCategoryForm()
        return render(request, 'add_expense_category.html', {'form': form})

    def post(self, request):
        form = ExpenseCategoryForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, "Expense kategoriyasi muvaffaqiyatli qo'shildi.")
            return redirect('dashboard')
        return render(request, 'add_expense_category.html', {'form': form})
