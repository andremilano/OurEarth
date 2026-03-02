
// ── Navbar scroll ──────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Reading progress bar ───────────────
const progressBar = document.getElementById('readingProgress');
window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min((window.scrollY / docHeight) * 100, 100);
    progressBar.style.width = progress + '%';
}, { passive: true });

// ── Scroll reveal ──────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// ── TOC active state ───────────────────
const headings = document.querySelectorAll('.article-body h2[id]');
const tocLinks = document.querySelectorAll('.toc-link');

const tocObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            tocLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.toc-link[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.5, rootMargin: '-20% 0px -60% 0px' });
headings.forEach(h => tocObserver.observe(h));

// ── Copy link ──────────────────────────
function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        const btn = event.target.closest('.share-btn');
        const original = btn.innerHTML;
        btn.innerHTML = '✅ Tersalin!';
        setTimeout(() => btn.innerHTML = original, 2000);
    });
}

// ── Newsletter form ────────────────────
const nlBtn = document.querySelector('.nl-btn');
const nlInput = document.querySelector('.nl-input-wrap input');
if (nlBtn && nlInput) {
    nlBtn.addEventListener('click', () => {
        if (nlInput.value.includes('@')) {
            nlBtn.textContent = '✅ Terima kasih!';
            nlInput.value = '';
            nlBtn.disabled = true;
            setTimeout(() => {
                nlBtn.textContent = 'Subscribe Gratis';
                nlBtn.disabled = false;
            }, 3000);
        } else {
            nlInput.focus();
            nlInput.style.borderColor = 'rgba(255,200,100,0.8)';
            setTimeout(() => nlInput.style.borderColor = '', 1500);
        }
    });
}
