document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const pageLinks = document.querySelectorAll('[data-page]');
    const pageContentContainer = document.getElementById('pageContentContainer');
    
    const pageFileMap = {
        'home': 'home.html',
        'about': 'about.html',
        'features': 'features.html',
        'our-services': 'our_services.html', // Added new page
        'portfolio': 'portfolio.html',       // Added new page
        'feedback': 'feedback.html',         // Added new page
        'contact': 'contact.html'
    };

    async function loadPageContent(pageId) {
        pageContentContainer.innerHTML = ''; 

        const filePath = pageFileMap[pageId];
        if (!filePath) {
            console.error(`No file path found for pageId: ${pageId}`);
            return;
        }

        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const contentHtml = await response.text();
            
            pageContentContainer.innerHTML = contentHtml;
            
            const loadedSection = pageContentContainer.querySelector(`#${pageId}`);
            if (loadedSection) {
                loadedSection.classList.add('active');
            }

        } catch (error) {
            console.error('Error loading page content:', error);
            pageContentContainer.innerHTML = `<p style="text-align: center; color: red;">Failed to load ${pageId} content. Please try again later.</p>`;
        }
        
        window.scrollTo(0, 0);
    }

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            loadPageContent(targetPage);
        });
    });
    
    document.body.addEventListener('click', function(e) {
        const clickedElement = e.target.closest('[data-page]');
        if (clickedElement && !clickedElement.classList.contains('nav-link')) { 
            e.preventDefault();
            const targetPage = clickedElement.getAttribute('data-page');
            
            navLinks.forEach(l => {
                l.classList.remove('active');
                if (l.getAttribute('data-page') === targetPage) {
                    l.classList.add('active');
                }
            });
            
            loadPageContent(targetPage);
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    loadPageContent('home');
});