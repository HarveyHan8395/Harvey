// 目录功能JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // 平滑滚动
  const tocLinks = document.querySelectorAll('.toc-list a');
  
  tocLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // 高亮当前章节
  function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id], h1[id]');
    const tocLinks = document.querySelectorAll('.toc-list a');
    
    let currentSection = null;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 找到当前可见的章节
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100) {
        currentSection = section;
      }
    });
    
    // 移除所有active类
    tocLinks.forEach(link => link.classList.remove('active'));
    
    // 为当前章节添加active类
    if (currentSection) {
      const currentLink = document.querySelector(`a[href="#${currentSection.id}"]`);
      if (currentLink) {
        currentLink.classList.add('active');
      }
    }
  }
  
  // 监听滚动事件
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        highlightCurrentSection();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', onScroll);
  
  // 初始化高亮
  highlightCurrentSection();
});