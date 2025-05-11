from django.urls import path
from .views import DashboardView, AddIncomeView, AddExpenseView, AddIncomeCategoryView, AddExpenseCategoryView

urlpatterns = [
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('add-income/', AddIncomeView.as_view(), name='add_income'),
    path('add-expense/', AddExpenseView.as_view(), name='add_expense'),
    path('add_income_category/', AddIncomeCategoryView.as_view(), name='add_income_category'),
    path('add_expense_category/', AddExpenseCategoryView.as_view(), name='add_expense_category'),
]