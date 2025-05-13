document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.dashboard-nav .nav-link');
    const sections = document.querySelectorAll('.dashboard-section');

    // Scroll hodisasini boshqarish
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionLeft = section.getBoundingClientRect().left;
            const sectionWidth = section.offsetWidth;
            // Bo‘lim ekranning markazida bo‘lsa
            if (sectionLeft >= -sectionWidth / 2 && sectionLeft <= sectionWidth / 2) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Click hodisasini boshqarish
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', inline: 'start' });
            }

            // Barcha linklardan active class’ni olib tashlash
            navLinks.forEach(l => l.classList.remove('active'));
            // Bosilgan linkka active class’ni qo‘shish
            link.classList.add('active');
        });
    });

    // Sahifa yuklanganda joriy bo‘limni aniqlash
    const initialSection = window.location.hash ? window.location.hash.substring(1) : 'income-section';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${initialSection}`) {
            link.classList.add('active');
        }
    });
});






document.addEventListener('DOMContentLoaded', () => {
    // Language switching
    const languageItems = document.querySelectorAll('.dropdown-item[data-language]');
    const languageText = document.querySelector('.language-text');
    const translatableElements = document.querySelectorAll('[data-en][data-ru][data-uz]');





    // Load Money Bills Lottie Animation
    const moneyBillsContainer = document.querySelector('#moneyBillsAnimation');
    if (moneyBillsContainer) {
        lottie.loadAnimation({
            container: moneyBillsContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://assets.lottiefiles.com/packages/lf20_3k9xMA.json' // Free money bills animation from LottieFiles
        });
    }



    function setLanguage(lang) {
        translatableElements.forEach(element => {
            element.textContent = element.getAttribute(`data-${lang}`);
        });
        languageText.textContent = lang.toUpperCase();
        localStorage.setItem('language', lang);
    }

    languageItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = item.getAttribute('data-language');
            setLanguage(lang);
        });
    });

    // Load saved language
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);

    // Theme toggle
    const themeCheckbox = document.getElementById('checkbox');
    const body = document.body;
    themeCheckbox.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        updateChartsTheme(body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeCheckbox.checked = true;
    }

    // Navbar scroll effect
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Lottie animation (optional for dashboard)
    const heroAnimation = document.getElementById('heroAnimation');
    if (heroAnimation) {
        lottie.loadAnimation({
            container: heroAnimation,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '/static/animations/hero-finance.json'
        });
    }

    // Charts
    const currentTheme = localStorage.getItem('theme') || 'light';
    const textColor = currentTheme === 'dark' ? '#e6e9ef' : '#344054';
    const gridColor = currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    const incomeExpenseChart = new Chart(document.getElementById('incomeExpenseChart'), {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [
                {
                    label: 'Income',
                    data: [3000, 3500, 4000, 3800, 4200],
                    borderColor: '#10ca93',
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Expenses',
                    data: [2000, 2300, 2100, 2500, 2400],
                    borderColor: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.2)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                },
                x: {
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                }
            },
            plugins: {
                legend: {
                    labels: { color: textColor }
                }
            }
        }
    });

    const spendingPieChart = new Chart(document.getElementById('spendingPieChart'), {
        type: 'doughnut',
        data: {
            labels: ['Groceries', 'Rent', 'Entertainment', 'Transport', 'Utilities'],
            datasets: [{
                data: [300, 500, 150, 200, 100],
                backgroundColor: ['#4e6fff', '#ff6b6b', '#36e5d0', '#ffbb33', '#9c6eff'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: textColor }
                }
            }
        }
    });

    // Store charts for theme updates
    window.moneyPallCharts = {
        incomeExpenseChart,
        spendingPieChart
    };

    function updateChartsTheme(theme) {
        const textColor = theme === 'dark' ? '#e6e9ef' : '#344054';
        const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

        incomeExpenseChart.options.scales.y.ticks.color = textColor;
        incomeExpenseChart.options.scales.x.ticks.color = textColor;
        incomeExpenseChart.options.scales.y.grid.color = gridColor;
        incomeExpenseChart.options.scales.x.grid.color = gridColor;
        incomeExpenseChart.options.plugins.legend.labels.color = textColor;
        incomeExpenseChart.update();

        spendingPieChart.options.plugins.legend.labels.color = textColor;
        spendingPieChart.update();
    }

    // Form submissions
    const forms = document.querySelectorAll('#incomeForm, #expenseForm');
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-CSRFToken': formData.get('csrfmiddlewaretoken')
                    }
                });
                if (response.ok) {
                    alert('Transaction added successfully!');
                    form.reset();
                    // Refresh transaction table and charts (placeholder)
                    location.reload(); // Replace with AJAX refresh in production
                } else {
                    alert('Error adding transaction.');
                }
            } catch (error) {
                alert('Network error occurred.');
            }
        });
    });

    // Transaction filters
    const filterType = document.getElementById('filterType');
    const filterCurrency = document.getElementById('filterCurrency');
    const filterDate = document.getElementById('filterDate');
    const applyFilters = document.getElementById('applyFilters');

    applyFilters.addEventListener('click', () => {
        const type = filterType.value;
        const currency = filterCurrency.value;
        const date = filterDate.value;

        // Placeholder for AJAX filtering
        fetch(`/dashboard/filter/?type=${type}&currency=${currency}&date=${date}`)
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById('transactionTable');
                tableBody.innerHTML = '';
                if (data.transactions.length === 0) {
                    tableBody.innerHTML = `
                        <tr>
                            <td colspan="6" class="text-center" 
                                data-en="No transactions found" 
                                data-ru="Транзакции не найдены" 
                                data-uz="Tranzaksiyalar topilmadi">
                                No transactions found
                            </td>
                        </tr>
                    `;
                } else {
                    data.transactions.forEach(tx => {
                        tableBody.innerHTML += `
                            <tr>
                                <td>${tx.date}</td>
                                <td>${tx.type_display}</td>
                                <td>${tx.category_name}</td>
                                <td>${tx.amount}</td>
                                <td>${tx.currency_display}</td>
                                <td>${tx.description || '-'}</td>
                            </tr>
                        `;
                    });
                }
            })
            .catch(() => alert('Error applying filters.'));
    });

    // Scroll animations
    const animatedElements = document.querySelectorAll('.hero-content, .transaction-card, .chart-container, .register-card, .login-card, .otp-verify-card, .profile-card, .logout-confirm-card, .delete-account-card, .edit-profile-card, .dashboard-card');

    // Smooth scroll for dashboard navigation
    document.querySelectorAll('.dashboard-nav .nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });

            // Update active class on click
            document.querySelectorAll('.dashboard-nav .nav-link').forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Update active class on scroll
    const sections = document.querySelectorAll('.dashboard-section');
    const navLinks = document.querySelectorAll('.dashboard-nav .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionLeft = section.getBoundingClientRect().left;
            if (sectionLeft >= -50 && sectionLeft <= 50) { // Ko‘rinadigan bo‘limni aniqlash
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach(element => observer.observe(element));

    // Register form handling
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            // Allow Django to handle form submission; prevent default only if using AJAX
            // Currently, let the form submit normally to match RegisterView
        });

        // Add real-time validation feedback
        const inputs = registerForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.checkValidity()) {
                    input.classList.add('is-valid');
                    input.classList.remove('is-invalid');
                } else {
                    input.classList.add('is-invalid');
                    input.classList.remove('is-valid');
                }
            });
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const emailInput = loginForm.querySelector('#email');
        emailInput.addEventListener('input', () => {
            if (emailInput.checkValidity()) {
                emailInput.classList.add('is-valid');
                emailInput.classList.remove('is-invalid');
            } else {
                emailInput.classList.add('is-invalid');
                emailInput.classList.remove('is-valid');
            }
        });
    }

    const heroAnimationContainer = document.querySelector('.hero-animation-container');
    if (heroAnimationContainer) {
        heroAnimationContainer.addEventListener('mousemove', (e) => {
            const rect = heroAnimationContainer.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const tiltX = (y / rect.height) * 10; // Max 10deg tilt
            const tiltY = -(x / rect.width) * 10;
            heroAnimationContainer.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });

        heroAnimationContainer.addEventListener('mouseleave', () => {
            heroAnimationContainer.style.transform = 'rotateX(0) rotateY(0)';
        });
    }

    const coinContainer = document.querySelector('.coin-stack-container');
    if (coinContainer) {
        for (let i = 0; i < 4; i++) {
            const coin = document.createElement('div');
            coin.classList.add('coin');
            coinContainer.appendChild(coin);
        }
    }
});



