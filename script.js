document.addEventListener("DOMContentLoaded", () => {
    const frameCount = 382;
    const frame = document.getElementById('frame');
    const context = frame.getContext('2d');

    const images = [];
    const imageSeq = {
        frame: 0
    };

    context.imageSmoothingEnabled = false; // Disable image smoothing

    function loadImages() {
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = `frames/frame_${String(i).padStart(4, '0')}.jpeg`;
            images.push(img);
        }
    }

    loadImages();

    // Load the first image to set the canvas size
    images[0].onload = () => {
        frame.width = images[0].width;
        frame.height = images[0].height;
        render(); // Render the first frame after setting canvas size
    };

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
});
