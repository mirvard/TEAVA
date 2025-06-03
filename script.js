document.addEventListener('DOMContentLoaded', function() {
    const topBanner = document.getElementById('topBanner');
    const closeBannerBtn = document.getElementById('closeBannerBtn');

    if (closeBannerBtn && topBanner) {
        closeBannerBtn.addEventListener('click', function() {
            topBanner.style.display = 'none';
        });
    }

    // Тут можна додати іншу логіку для хедера,
    // наприклад, зміну стилів при прокрутці сторінки,
    // або логіку для "річного слайдера", якщо він потрібен.
});
