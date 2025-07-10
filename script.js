// Landing Page JavaScript for "10 Formas de Generar dinero desde casa"

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar notificaciones de compras
    initPurchaseNotifications();
    // Initialize countdown timer
    initCountdown();
    
    // Initialize EmailJS
    initEmailJS();
    
    // Track page view with Meta Pixel
    fbq('track', 'PageView');
    
    // Track CTA button clicks with Meta Pixel
    trackCTAClicks();
    
    // Initialize stock counter
    initStockCounter();
});

// Countdown Timer Function
function initCountdown() {
    // Set the countdown date (24 hours from now)
    const countdownDate = new Date();
    countdownDate.setHours(countdownDate.getHours() + 24);
    
    // Update the countdown every second
    const countdownTimer = setInterval(function() {
        // Get current date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the countdown date
        const distance = countdownDate - now;
        
        // Time calculations for hours, minutes and seconds
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;
        
        // If the countdown is finished, display expired message
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById("countdown").innerHTML = "¡OFERTA EXPIRADA!";
        }
    }, 1000);
}

// EmailJS Initialization
function initEmailJS() {
    // Initialize EmailJS with your user ID
    // Replace "user_your_emailjs_userid" with your actual EmailJS user ID
    emailjs.init("user_your_emailjs_userid");
    
    // Add event listeners to purchase buttons to send notification
    const purchaseButtons = document.querySelectorAll('.btn-cta, .btn-cta-large');
    
    purchaseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track purchase click with Meta Pixel
            fbq('track', 'InitiateCheckout');
            
            // You can also send an email notification when someone clicks the purchase button
            // Uncomment the following code to enable email notifications
            /*
            emailjs.send("default_service", "purchase_click_template", {
                product_name: "10 Formas de Generar dinero desde casa",
                click_time: new Date().toString()
            }).then(
                function(response) {
                    console.log("Email notification sent successfully", response);
                },
                function(error) {
                    console.log("Failed to send email notification", error);
                }
            );
            */
        });
    });
}

// Track CTA Button Clicks with Meta Pixel
function trackCTAClicks() {
    const ctaButtons = document.querySelectorAll('.btn-cta, .btn-cta-large');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Track the click event with Facebook Pixel
            fbq('track', 'Lead');
        });
    });
}

// Stock Counter Function - Creates urgency with decreasing stock
function initStockCounter() {
    const stockCountElement = document.getElementById('stock-count');
    
    if (stockCountElement) {
        // Get current stock from localStorage or set default
        let currentStock = localStorage.getItem('ebookStock');
        
        if (!currentStock) {
            // Initial stock count
            currentStock = 13;
            localStorage.setItem('ebookStock', currentStock);
        }
        
        // Display current stock
        stockCountElement.textContent = currentStock;
        
        // Decrease stock randomly when user interacts with the page
        document.addEventListener('click', function() {
            // 10% chance to decrease stock on click
            if (Math.random() < 0.1 && currentStock > 1) {
                currentStock--;
                localStorage.setItem('ebookStock', currentStock);
                stockCountElement.textContent = currentStock;
                
                // Add animation to highlight the change
                stockCountElement.classList.add('highlight');
                setTimeout(() => {
                    stockCountElement.classList.remove('highlight');
                }, 500);
            }
        });
    }
}

// Función para generar y mostrar notificaciones de compras recientes
function initPurchaseNotifications() {
    const purchaseNotificationsContainer = document.getElementById('purchase-notifications');
    
    // Datos de ejemplo para las notificaciones (nombres y ubicaciones)
    const purchaseData = [
        { name: 'María G.', location: 'Madrid', timeAgo: '2 minutos' },
        { name: 'Carlos R.', location: 'Ciudad de México', timeAgo: '5 minutos' },
        { name: 'Laura S.', location: 'Buenos Aires', timeAgo: '7 minutos' },
        { name: 'Roberto M.', location: 'Lima', timeAgo: '12 minutos' },
        { name: 'Ana P.', location: 'Bogotá', timeAgo: '15 minutos' },
        { name: 'Juan D.', location: 'Santiago', timeAgo: '18 minutos' },
        { name: 'Sofía L.', location: 'Barcelona', timeAgo: '21 minutos' },
        { name: 'Miguel A.', location: 'Guadalajara', timeAgo: '25 minutos' },
        { name: 'Lucía V.', location: 'Sevilla', timeAgo: '28 minutos' },
        { name: 'Diego F.', location: 'Monterrey', timeAgo: '32 minutos' }
    ];
    
    // Función para crear una notificación
    function createNotification(data) {
        const notification = document.createElement('div');
        notification.className = 'purchase-notification';
        
        const initials = data.name.split(' ').map(name => name[0]).join('');
        
        notification.innerHTML = `
            <div class="notification-avatar">${initials}</div>
            <div class="notification-content">
                <p><span class="notification-name">${data.name}</span> de ${data.location} acaba de comprar "10 Formas de Generar dinero desde casa"</p>
                <p class="notification-time">Hace ${data.timeAgo}</p>
            </div>
            <button class="notification-close">&times;</button>
        `;
        
        // Añadir evento para cerrar la notificación
        notification.querySelector('.notification-close').addEventListener('click', function() {
            notification.style.animation = 'slideOut 0.5s forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        });
        
        return notification;
    }
    
    // Función para mostrar una notificación aleatoria
    function showRandomNotification() {
        // Seleccionar datos aleatorios
        const randomData = purchaseData[Math.floor(Math.random() * purchaseData.length)];
        
        // Crear y añadir la notificación
        const notification = createNotification(randomData);
        purchaseNotificationsContainer.appendChild(notification);
        
        // Eliminar la notificación después de 6 segundos (1s más que la animación)
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 6000);
    }
    
    // Mostrar primera notificación después de 3 segundos
    setTimeout(showRandomNotification, 3000);
    
    // Mostrar notificaciones aleatorias cada 15-40 segundos
    setInterval(() => {
        const randomDelay = Math.floor(Math.random() * (40000 - 15000)) + 15000;
        setTimeout(showRandomNotification, randomDelay);
    }, 10000);
}

// Function to handle form submissions (if you add a form later)
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Track form submission with Meta Pixel
    fbq('track', 'CompleteRegistration');
    
    // Get form data
    const form = event.target;
    const formData = new FormData(form);
    const formObject = {};
    
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Send form data via EmailJS
    emailjs.send("default_service", "form_submission_template", formObject)
        .then(
            function(response) {
                console.log("Form submitted successfully", response);
                // Show success message
                alert("¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.");
                form.reset();
            },
            function(error) {
                console.log("Failed to submit form", error);
                // Show error message
                alert("Hubo un problema al enviar el formulario. Por favor, intenta nuevamente.");
            }
        );
}
