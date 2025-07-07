const totalSlides = 15;
let currentSlide = 1;
let isFullscreen = false;
let mouseTimer;

// 初始化侧边栏和预览区域
const sidebar = document.getElementById('sidebar');
const preview = document.getElementById('preview');

// 创建当前页码显示
const currentPageDisplay = document.createElement('div');
currentPageDisplay.className = 'thumbnail active';
currentPageDisplay.innerHTML = `第 ${currentSlide} 页`;
sidebar.appendChild(currentPageDisplay);

// 初始化预览
function updatePreview() {
    preview.innerHTML = `<iframe src="page_${currentSlide}.html"></iframe>`;
}

// 更新页码显示
function updateThumbnails() {
    currentPageDisplay.innerHTML = `第 ${currentSlide} 页`;
}

// 全屏控制
function toggleFullscreen() {
    const elem = document.documentElement;
    if (!isFullscreen) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        isFullscreen = true;
        document.body.style.overflow = 'hidden';
        showFullscreenControls();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        isFullscreen = false;
        document.body.style.overflow = '';
        hideFullscreenControls();
    }
}

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