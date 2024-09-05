let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x'); // Always remove the class on scroll
    navbar.classList.remove('active'); // Always remove the active class on scroll
}

const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'Graphic Designer', 'Tech Enthusiast', 'Web Designer'],
    typeSpeed: 200, 
    backSpeed: 80, 
    backDelay: 1200, 
    loop: true,
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const form = event.target;
    const formData = new FormData(form);
    const loadingBar = document.getElementById('loadingBar');

    // Show loading bar
    loadingBar.style.display = 'block';
    loadingBar.style.width = '0';

    // Gradually increase loading bar width to 90%
    let loadingProgress = 0;
    const loadingInterval = setInterval(() => {
        loadingProgress += 1; // Increase this value to make the loading bar fill faster
        if (loadingProgress <= 70) {
            loadingBar.style.width = `${loadingProgress}%`;
        } else {
            clearInterval(loadingInterval); 
        }
    }, 100); 

    fetch(form.action, {
        method: form.method,
        body: formData,
    })
        .then(response => {
            if (response.ok) {
                document.getElementById('alertSuccess').style.display = 'block';
                document.getElementById('alertFailure').style.display = 'none';
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            document.getElementById('alertFailure').style.display = 'block';
            document.getElementById('alertSuccess').style.display = 'none';
        })
        .finally(() => {
           
            loadingBar.style.width = '100%';

            
            setTimeout(() => {
                loadingBar.style.display = 'none';
                loadingBar.style.width = '0';
            }, 500);
        });
});
