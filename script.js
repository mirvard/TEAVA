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

// Чекаємо, поки весь HTML-документ завантажиться
document.addEventListener('DOMContentLoaded', function() {

    // Знаходимо всі елементи з класом 'btn' (наші кнопки)
    const allButtons = document.querySelectorAll('.btn');

    // Проходимось по кожній знайденій кнопці
    allButtons.forEach(button => {
        // Додаємо "слухача подій" на клік
        button.addEventListener('click', function() {
            // При кліку виводимо просте повідомлення
            alert('Ця кнопка поки що в розробці!');
        });
    });

});
