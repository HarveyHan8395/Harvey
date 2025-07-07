const totalSlides = 15;
let currentSlide = 1;
let isFullscreen = false;
let mouseTimer;

// 生成缩略图
const sidebar = document.getElementById('sidebar');
const preview = document.getElementById('preview');

for (let i = 1; i <= totalSlides; i++) {
    const thumb = document.createElement('div');
    thumb.innerHTML = `第 ${i} 页`;
    thumb.className = 'thumbnail';
    thumb.setAttribute('data-slide', i);
    sidebar.appendChild(thumb);

    thumb.addEventListener('click', () => {
        currentSlide = i;
        updatePreview();
        updateThumbnails();
    });
}

// 初始化预览
function updatePreview() {
    preview.innerHTML = `<iframe src="page_${currentSlide}.html"></iframe>`;
}

// 更新缩略图状态
function updateThumbnails() {
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.toggle('active', parseInt(thumb.getAttribute('data-slide')) === currentSlide);
    });
}

// 全屏控制
function toggleFullscreen() {
    if (!isFullscreen) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

document.addEventListener('fullscreenchange', () => {
    isFullscreen = !!document.fullscreenElement;
    if (isFullscreen) {
        document.getElementById('main-content').classList.add('fullscreen');
        updatePreview();
        showFullscreenControls();
    } else {
        document.getElementById('main-content').classList.remove('fullscreen');
        updatePreview();
        hideFullscreenControls();
    }
});

// 显示/隐藏全屏控制按钮
function showFullscreenControls() {
    document.querySelectorAll('.fullscreen-controls').forEach(control => {
        control.style.display = 'block';
        setTimeout(() => control.style.opacity = '1', 0);
    });
}

function hideFullscreenControls() {
    document.querySelectorAll('.fullscreen-controls').forEach(control => {
        control.style.opacity = '0';
        setTimeout(() => control.style.display = 'none', 300);
    });
}

// 切换幻灯片
function nextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        updatePreview();
        updateThumbnails();
    }
}

function previousSlide() {
    if (currentSlide > 1) {
        currentSlide--;
        updatePreview();
        updateThumbnails();
    }
}

// 事件监听
document.getElementById('play-button').addEventListener('click', () => {
    toggleFullscreen();
});

document.addEventListener('keydown', (e) => {
    if (isFullscreen) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            nextSlide();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            previousSlide();
        } else if (e.key === 'Escape') {
            toggleFullscreen();
        }
    }
});

document.addEventListener('mousemove', () => {
    if (isFullscreen) {
        showFullscreenControls();
        clearTimeout(mouseTimer);
        mouseTimer = setTimeout(hideFullscreenControls, 3000);
    }
});

// 初始化显示第一页
updatePreview();
updateThumbnails();