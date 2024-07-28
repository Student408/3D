document.querySelector('.cta-btn').addEventListener('click', function() {
    alert('Welcome to Battle Magic!');
});

document.querySelector('.event-rules').addEventListener('click', function() {
    alert('Event rules: [Your rules here]');
});

// Simulating a loading effect for the hero image
window.addEventListener('load', function() {
    document.querySelector('.hero').style.opacity = '0';
    setTimeout(function() {
        document.querySelector('.hero').style.transition = 'opacity 1s';
        document.querySelector('.hero').style.opacity = '1';
    }, 300);
});