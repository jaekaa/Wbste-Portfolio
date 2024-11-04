document.addEventListener('DOMContentLoaded', function() {
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.documentElement;

    // Check for saved theme preference or use system preference
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark" || (!currentTheme && prefersDarkScheme.matches)) {
        body.setAttribute("data-theme", "dark");
        darkModeToggle.innerHTML = '<i data-lucide="sun"></i>';
    } else {
        body.setAttribute("data-theme", "light");
        darkModeToggle.innerHTML = '<i data-lucide="moon"></i>';
    }

    darkModeToggle.addEventListener("click", () => {
        if (body.getAttribute("data-theme") === "light") {
            body.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            darkModeToggle.innerHTML = '<i data-lucide="sun"></i>';
        } else {
            body.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            darkModeToggle.innerHTML = '<i data-lucide="moon"></i>';
        }
        lucide.createIcons();
    });

    // Make sure to call this after changing the icon
    lucide.createIcons();

    // Tab Navigation
    const navButtons = document.querySelectorAll('.nav-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    function setActiveTab(tabId) {
        navButtons.forEach(button => {
            if (button.getAttribute('data-tab') === tabId) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        tabPanes.forEach(pane => {
            if (pane.id === tabId) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            setActiveTab(tabId);
        });
    });

    // Set initial active tab
    setActiveTab('home');

    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            console.log('Form submitted:', data);
            alert('Message sent successfully!');
            contactForm.reset();
        });
    }

    // Add hover effect for portfolio items
    const portfolioImages = document.querySelectorAll('.portfolio-item');
    portfolioImages.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('.portfolio-info').style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.querySelector('.portfolio-info').style.transform = 'translateY(100%)';
        });
    });
});