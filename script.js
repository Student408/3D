document.addEventListener("DOMContentLoaded", () => {
    const frameCount = 382;
    const frame = document.getElementById('frame');
    const context = frame.getContext('2d');
    const loadingContainer = document.getElementById('loading-container');
    const mainContent = document.getElementById('main-content');
    const progressBar = document.getElementById('progress-bar');
    const progressPercentage = document.getElementById('progress-percentage');

    const images = [];
    const imageSeq = {
        frame: 0
    };

    context.imageSmoothingEnabled = false; // Disable image smoothing

    function updateProgress(progress) {
        progressBar.style.width = `${progress}%`;
        progressPercentage.textContent = `${Math.round(progress)}%`;

        // Add a subtle animation effect
        progressBar.style.transition = 'width 0.3s ease-out';
        setTimeout(() => {
            progressBar.style.transition = 'none';
        }, 300);
    }

    function loadImages() {
        let loadedImages = 0;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = `frames/frame_${String(i).padStart(4, '0')}.jpeg`;
            img.onload = () => {
                loadedImages++;
                const progress = (loadedImages / frameCount) * 100;
                updateProgress(progress);

                if (loadedImages === frameCount) {
                    // All images are loaded
                    loadingContainer.style.display = 'none'; // Hide loading container
                    mainContent.style.display = 'block'; // Show main content
                    frame.width = images[0].width;
                    frame.height = images[0].height;
                    render(); // Render the first frame after setting canvas size
                }
            };
            images.push(img);
        }
    }

    loadImages();

    function render() {
        const img = images[Math.round(imageSeq.frame)];
        context.clearRect(0, 0, frame.width, frame.height);
        context.drawImage(img, 0, 0, frame.width, frame.height);
    }

    window.addEventListener('scroll', () => {
        const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
        const scrollFraction = window.scrollY / maxScrollTop;
        const frameIndex = Math.min(
            frameCount - 1,
            Math.ceil(scrollFraction * frameCount)
        );

        imageSeq.frame = frameIndex;
        render();
    });

    // Add a subtle animation to the loading text
    const loadingLabel = document.querySelector('.progress-label');
    setInterval(() => {
        loadingLabel.textContent = loadingLabel.textContent.endsWith('...') 
            ? 'Loading' 
            : loadingLabel.textContent + '.';
    }, 500);
});