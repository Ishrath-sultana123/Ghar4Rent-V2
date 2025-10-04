function renderRentCards(list) {
    const container = document.getElementById('rentPropertyList');
    if (!container) return;
    container.innerHTML = '';
    if (list.length === 0) {
        container.innerHTML = '<p>No properties found.</p>';
        return;
    }
    list.forEach(prop => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `<a href="property-details.html?id=${prop.id}"><img src='${prop.img}' alt='${prop.title}' class='property-img'><h3>${prop.title}</h3><p class='location'>${prop.location}</p><p class='price'>₹${prop.price.toLocaleString()}/month</p><p>${prop.details}</p></a>`;
        container.appendChild(card);
    });
}

function renderBuyCards(list) {
    const container = document.getElementById('buyPropertyList');
    if (!container) return;
    container.innerHTML = '';
    if (list.length === 0) {
        container.innerHTML = '<p>No properties found.</p>';
        return;
    }
    list.forEach(prop => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `<a href="property-details.html?id=${prop.id}"><img src='${prop.img}' alt='${prop.title}' class='property-img'><h3>${prop.title}</h3><p class='location'>${prop.location}</p><p class='price'>₹${(prop.price/100000).toFixed(2)} Lakh</p><p>${prop.details}</p></a>`;
        container.appendChild(card);
    });
}

function renderNewProjects(list) {
    const container = document.getElementById('newProjectsList');
    if (!container) return;
    container.innerHTML = '';
    if (list.length === 0) {
        container.innerHTML = '<p>No new projects found.</p>';
        return;
    }
    list.forEach(prop => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `<a href="property-details.html?id=${prop.id}"><img src='${prop.img}' alt='${prop.title}' class='property-img'><h3>${prop.title}</h3><p class='location'>${prop.location}</p><p class='price'>${prop.price.toLocaleString()}</p><p>${prop.details}</p></a>`;
        container.appendChild(card);
    });
}

// Function to toggle service dropdown
function toggleServiceDropdown(id) {
    const el = document.getElementById(id);
    if (el) {
        el.style.display = (el.style.display === 'block') ? 'none' : 'block';
    }
}

// Initialize AOS library
AOS.init({ once: true });

// Testimonials slider
let testimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
if (testimonials.length > 0) {
    testimonials[0].classList.add('active');
    setInterval(() => {
        testimonials.forEach((t) => t.classList.remove('active'));
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        testimonials[testimonialIndex].classList.add('active');
    }, 3500);
}

document.addEventListener('DOMContentLoaded', () => {
    // Check if properties array exists
    if (typeof properties !== 'undefined') {
        const rentProperties = properties.filter(p => p.status === 'rent');
        const buyProperties = properties.filter(p => p.status === 'buy');
        const newProjects = properties.slice(-3);

        if (document.getElementById('rentPropertyList')) {
            renderRentCards(rentProperties.slice(0, 3));
        }
        if (document.getElementById('buyPropertyList')) {
            renderBuyCards(buyProperties.slice(0, 3));
        }
        if (document.getElementById('newProjectsList')) {
            renderNewProjects(newProjects);
        }
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const contactResponse = document.getElementById('contactResponse');
            if (contactResponse) {
                contactResponse.textContent = 'Thank you for contacting us! We will get back to you soon.';
            }
            this.reset();
        });
    }

    // Go to top button logic
    const goToTopBtn = document.getElementById("goToTopBtn");
    const header = document.querySelector('header');

    if (goToTopBtn) {
        window.onscroll = function() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                goToTopBtn.style.display = "block";
            } else {
                goToTopBtn.style.display = "none";
            }

            if (header) {
                if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                    header.classList.add("scrolled");
                } else {
                    header.classList.remove("scrolled");
                }
            }
        };

        goToTopBtn.addEventListener('click', () => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        });
    }

    // Animated counters
    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const increment = Math.ceil(target / 60);
        function update() {
            count += increment;
            if (count > target) count = target;
            counter.textContent = count;
            if (count < target) requestAnimationFrame(update);
        }
        update();
    }
    document.querySelectorAll('.counter').forEach(animateCounter);

    // Ensure header is not transparent
    if (header) {
        header.classList.remove('transparent');
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
    }
});