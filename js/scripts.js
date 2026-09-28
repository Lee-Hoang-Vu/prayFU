// Hiệu ứng hoa rơi
function startSakuraEffect() {
    // Tạo hiệu ứng hoa rơi
    new Sakura('body', {
        colors: [
            {
                gradientColorStart: 'rgba(255, 183, 197, 0.9)',
                gradientColorEnd: 'rgba(255, 197, 208, 0.9)',
                gradientColorDegree: 120,
            },
            {
                gradientColorStart: 'rgba(255,189,189)',
                gradientColorEnd: 'rgba(227,170,181)',
                gradientColorDegree: 120,
            },
            {
                gradientColorStart: 'rgba(212,152,163)',
                gradientColorEnd: 'rgba(242,185,196)',
                gradientColorDegree: 120,
            },
        ],
        delay: 200,
    });
}

// Tạo chữ bay khắp màn hình
function createFlyingText(email, wish) {
    // Xóa nội dung cũ (nếu có)
    const container = document.getElementById('dynamic-text-container');
    container.innerHTML = ''; // Xóa tất cả nội dung bên trong container

    // Tạo nội dung mới
    const message = `Điều khấn ${wish} của ${email} đã được gửi đến Thần Cóc!`;
    const textElement = document.createElement('div'); // Tạo thẻ <div>
    textElement.innerText = message; // Gán nội dung
    textElement.className = 'flying-text'; // Thêm class CSS
    container.appendChild(textElement); // Chèn vào container

    // Tự động xóa dòng chữ sau 60 giây để tránh tràn bộ nhớ
    setTimeout(() => {
        textElement.remove();
    }, 60000);
}


// Xử lý sự kiện gửi form
document.getElementById('wishForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Ngăn reload trang

    const emailInput = document.getElementById('email').value.trim();
    const wishInput = document.getElementById('wish').value.trim();
    const allowedDomains = ["@fpt.edu.vn", "@gmail.com"];
    const isValidEmail = allowedDomains.some(domain => emailInput.endsWith(domain));

    if (!isValidEmail) {
        alert("Email phải có đuôi @fpt.edu.vn hoặc @gmail.com !");
        return;
    }

    // Ẩn form
    const form = document.getElementById('wishForm');
    form.classList.add('hidden');

    // Phát nhạc
    const prayMusic = document.getElementById('prayMusic');
    prayMusic.play();

    // Chạy hiệu ứng hoa rơi và tạo chữ bay
    document.body.style.backgroundColor = '#33FFFF'; // Đổi sang màu khác
    startSakuraEffect();
    createFlyingText(emailInput, wishInput);

    // Đặt thời gian hiển thị lại form sau 60 giây
    setTimeout(() => {
        form.classList.remove('hidden'); // Hiện lại form
    }, 60000); // 60 giây (60000ms)

    // Xóa nội dung form
    document.getElementById('wishForm').reset();
});

