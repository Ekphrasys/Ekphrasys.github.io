document.addEventListener('DOMContentLoaded', function() {
    // Select elements
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    const navItems = document.querySelectorAll('.nav-menu li');
    const sections = document.querySelectorAll('.game-section');
    
    // Check stored theme or system preference
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    
    // Apply theme on load
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Handle toggle click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // GSAP animation for smooth effect
        gsap.fromTo("body", 
            { backgroundColor: currentTheme === 'dark' ? '#1a1a2e' : '#f0f0f0' },
            { backgroundColor: newTheme === 'dark' ? '#1a1a2e' : '#f0f0f0', duration: 0.5 }
        );
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            icon.classList.replace('fa-sun', 'fa-moon');
            icon.style.color = '#ffcc00'; // Yellow for moon
        } else {
            icon.classList.replace('fa-moon', 'fa-sun');
            icon.style.color = '#ff9900'; // Orange for sun
        }
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const cardTags = card.getAttribute('data-tags').split(' ');
                
                if (filterValue === 'all' || cardTags.includes(filterValue)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Clickable navigation
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            document.getElementById(sectionId).classList.add('active');
            
            // Scroll to section
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll event to update navigation
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 100) && window.scrollY < (sectionTop + sectionHeight - 100)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === currentSection) {
                item.classList.add('active');
            }
        });
    });

    // Initialize ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animations for each section
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8
        });
    });
});

// Clone nav for mobile
const desktopNav = document.querySelector('.nav-container');
const mobileNav = desktopNav.cloneNode(true);
mobileNav.classList.add('mobile-nav');
document.body.appendChild(mobileNav);

// create overlay for mobile menu
const menuOverlay = document.createElement('div');
menuOverlay.className = 'menu-overlay';
document.body.appendChild(menuOverlay);

const menuToggle = document.getElementById('menuToggle');

menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

menuOverlay.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
});

// Close menu when clicking on a menu item
mobileNav.querySelectorAll('.nav-menu li').forEach(item => {
    item.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});