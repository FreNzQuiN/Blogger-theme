window.onload = function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
};
function openNav() {
    document.getElementById("sidebar").style.left = "0"; // Munculkan sidebar
}

function closeNav() {
    document.getElementById("sidebar").style.left = "-250px"; // Sembunyikan sidebar
}

$(window).on('load', function () {
    $('#preloader').fadeOut('slow', function () {
        $(this).remove();
        document.body.style.overflow = 'auto'; // Aktifkan scroll setelah preloader selesai
    });
});
let index = 0;

function moveProjectSlide(direction) {
    const carousel = document.querySelector(".project-carousel");
    const cards = document.querySelectorAll(".project-card");

    const isDesktop = window.innerWidth >= 769;
    const cardWidth = cards[0].offsetWidth;
    const visibleCount = isDesktop ? 2 : 1;
    const maxIndex = cards.length - visibleCount;

    index += direction;

    if (index < 0) {
        index = maxIndex;
    } else if (index > maxIndex) {
        index = 0;
    }

    const shift = index * cardWidth;
    carousel.style.transform = `translateX(-${shift}px)`;
}

// Recalculate on resize
window.addEventListener("resize", () => moveProjectSlide(0));

// --- Kode untuk Sliding Warna Background ---

// 1. Definisikan warna untuk setiap section
const sectionColors = {
    'home': '#ffffff', // Warna awal body
    'design': '#3a113b', // Sedikit lebih gelap dari background design
    'project': '#f0e0ef', // Warna terang yang cocok dengan project
    'review': '#aa6aa0', // Warna yang cocok dengan review
    'contact': '#3a113b'  // Kembali ke warna gelap seperti design
};

// 2. Dapatkan semua elemen section
const sections = document.querySelectorAll('.section, .design, .project-section'); // Sertakan semua class section relevan

// 3. Tambahkan event listener untuk scroll
window.addEventListener('scroll', () => {
    let currentSectionId = 'home'; // Default ke home

    // 4. Cari section yang sedang terlihat di tengah layar
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;

        // Cek apakah bagian tengah layar (window.scrollY + window.innerHeight / 2)
        // berada di dalam batas section ini
        if (window.scrollY + window.innerHeight / 2 >= sectionTop &&
            window.scrollY + window.innerHeight / 2 < sectionBottom) {
            // Ambil ID dari section yang sesuai
            // Perlu penanganan khusus karena section punya class berbeda
            if (section.id) {
                currentSectionId = section.id;
            } else if (section.classList.contains('design')) {
                currentSectionId = 'design'; // Asumsikan class 'design' terkait #design
            } else if (section.classList.contains('project-section')) {
                currentSectionId = 'project'; // Asumsikan class 'project-section' terkait #project
            }
        }
    });

    // 5. Ubah warna background body berdasarkan section yang aktif
    if (sectionColors[currentSectionId]) {
        document.body.style.backgroundColor = sectionColors[currentSectionId];
        document.body.style.color = currentSectionId === 'design' ? '#fff' : '#333'; // Ubah warna teks
    }
});

// --- Akhir Kode untuk Sliding Warna Background ---

const musicToggles = document.querySelectorAll('#toggleAnimation');
const backgroundAudio = document.getElementById('background-audio');
const bgImage = document.querySelector('.bg-image');
const bgImageOverlay = document.querySelector('.bg-image-overlay');

backgroundAudio.volume = 0.8;

musicToggles.forEach(toggle => {
    toggle.addEventListener('change', function () {
        musicToggles.forEach(otherToggle => {
            if (otherToggle !== this) {
                otherToggle.checked = this.checked;
            }
        });
        updateAnimationState(this.checked);
    });
});

function updateAnimationState(isChecked) {
    if (isChecked) {
        bgImageOverlay.animationPlayState = 'running';
        bgImage.style.animationPlayState = 'running';
        backgroundAudio.play();
    } else {
        bgImageOverlay.style.animationPlayState = 'paused';
        bgImage.style.animationPlayState = 'paused';
        backgroundAudio.pause();
    }
}

let idleTimer;

function showBackgroundImage() {
    bgImage.style.zIndex = '10';
    bgImage.style.opacity = '1.0';
    bgImageOverlay.style.zIndex = '11';
    bgImageOverlay.style.opacity = '1.0';
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    bgImage.style.zIndex = '-1';
    bgImage.style.opacity = '0.15';
    bgImageOverlay.style.opacity = '0.0';
    bgImageOverlay.style.zIndex = '-1';
    idleTimer = setTimeout(showBackgroundImage, 6181);
}

// Mulai timer saat halaman dimuat
resetIdleTimer();

// Reset timer pada setiap interaksi pengguna
document.addEventListener('mousemove', resetIdleTimer);
document.addEventListener('mousedown', resetIdleTimer);
document.addEventListener('keydown', resetIdleTimer);
document.addEventListener('touchstart', resetIdleTimer);
document.addEventListener('wheel', resetIdleTimer);