document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    const navItems = document.querySelectorAll('.nav-menu li');
    const sections = document.querySelectorAll('.game-section');
    
    // Vérifie le thème stocké ou la préférence système
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    
    // Applique le thème au chargement
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Gestion du clic sur le toggle
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Animation GSAP pour un effet smooth
        gsap.fromTo("body", 
            { backgroundColor: currentTheme === 'dark' ? '#1a1a2e' : '#f0f0f0' },
            { backgroundColor: newTheme === 'dark' ? '#1a1a2e' : '#f0f0f0', duration: 0.5 }
        );
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            icon.classList.replace('fa-sun', 'fa-moon');
            icon.style.color = '#ffcc00'; // Jaune pour la lune
        } else {
            icon.classList.replace('fa-moon', 'fa-sun');
            icon.style.color = '#ff9900'; // Orange pour le soleil
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
                    card.style.display = 'flex'; // or 'block' depending on your layout
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Navigation cliquable
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            
            // Retirer la classe active de tous les éléments
            navItems.forEach(navItem => navItem.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Ajouter la classe active à l'élément cliqué
            item.classList.add('active');
            document.getElementById(sectionId).classList.add('active');
            
            // Scroll vers la section
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll event pour mettre à jour la navigation
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

    // Initialiser ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animations pour chaque section
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