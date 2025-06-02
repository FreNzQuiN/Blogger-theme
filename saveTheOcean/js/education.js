document.addEventListener('DOMContentLoaded', function () {
            const videoLinks = document.querySelectorAll('.video-link');
            const mainVideo = document.getElementById('mainVideo');

            videoLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const videoId = this.dataset.video;
                    mainVideo.src = `https://www.youtube.com/embed/${videoId}`;
                });
            });
        });