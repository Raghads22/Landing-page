document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar__list');
    const sections = document.querySelectorAll('section');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const header = document.querySelector('header');


    // Build the nav
    sections.forEach(section => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = section.dataset.nav;
        a.href = `#${section.id}`;
        a.classList.add('menu__link');
        a.setAttribute('aria-label', section.dataset.nav);
        li.appendChild(a);
        navbar.appendChild(li);
    });


    // Scroll to section on link click
    navbar.addEventListener('click', (event) => {
        event.preventDefault();
        if (event.target.tagName === 'A') {
            const sectionId = event.target.getAttribute('href').substring(1);
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });


    // Set sections as active
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                document.querySelector(`a[href="#${entry.target.id}"]`).classList.add('active');
            } else {
                entry.target.classList.remove('active');
                document.querySelector(`a[href="#${entry.target.id}"]`).classList.remove('active');
            }
        });
    }, {
        threshold: 0.6
    });

    sections.forEach(section => observer.observe(section));


    // Show/Hide scroll to top button and change header background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollToTopBtn.style.display = 'block';
            header.classList.add('scrolled');
        } else {
            scrollToTopBtn.style.display = 'none';
            header.classList.remove('scrolled');
        }
    });

    
    // Scroll to top
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
