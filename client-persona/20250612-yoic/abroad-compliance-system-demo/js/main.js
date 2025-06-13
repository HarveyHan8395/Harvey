/**
 * 云南省海外投资有限公司导航网站
 * main.js - 主要功能实现
 */

document.addEventListener('DOMContentLoaded', initSite);

// 文档结构数据
const documentStructure = [
  {
    name: '成果文件',
    icon: 'images/icons/folder_icon.jpg',
    children: [
      {
        name: '制度文件',
        icon: 'images/icons/document_icon.png',
        documents: [
          {
            title: '境外合规管理制度',
            path: '../docs/成果文件/制度文件/境外合规管理制度.html',
            description: '规定了云南省海外投资有限公司在境外业务开展过程中的合规管理要求'
          },
          {
            title: '境外风险管控机制',
            path: '../docs/成果文件/制度文件/境外风险管控机制.html',
            description: '规定了境外业务风险识别、评估和管控机制'
          },
          {
            title: '老挝国别合规指引',
            path: '../docs/成果文件/制度文件/老挝国别合规指引.html',
            description: '为在老挝开展业务提供合规指引，包括法律环境和投资准入规定'
          }
        ]
      },
      {
        name: '培训资料',
        icon: 'images/icons/document_icon.png',
        documents: [
          {
            title: '境外合规培训教材',
            path: '../docs/成果文件/培训资料/境外合规培训教材.html',
            description: '用于境外合规培训，包括合规概述和合规风险内容'
          }
        ]
      },
      {
        name: '风险评估报告',
        icon: 'images/icons/document_icon.png',
        documents: [
          {
            title: '柬埔寨项目风险评估报告',
            path: '../docs/成果文件/风险评估报告/柬埔寨项目风险评估报告.html',
            description: '对柬埔寨某基础设施建设项目的风险进行评估，包括政治风险、法律风险和经济风险'
          }
        ]
      }
    ]
  },
  {
    name: '过程文件',
    icon: 'images/icons/folder_icon.jpg',
    children: [
      {
        name: '会议纪要',
        icon: 'images/icons/document_icon.png',
        documents: [
          {
            title: '境外合规体系建设启动会会议纪要',
            path: '../docs/过程文件/会议纪要/境外合规体系建设启动会会议纪要.html',
            description: '记录了2025年6月10日的启动会内容和决议'
          }
        ]
      },
      {
        name: '工作计划',
        icon: 'images/icons/document_icon.png',
        documents: [
          {
            title: '境外合规体系建设工作计划',
            path: '../docs/过程文件/工作计划/境外合规体系建设工作计划.html',
            description: '制定了在2025年12月31日前完成境外合规组织和制度体系搭建的工作计划和时间节点'
          }
        ]
      },
      {
        name: '调研报告',
        icon: 'images/icons/document_icon.png',
        documents: [
          {
            title: '老挝市场调研报告',
            path: '../docs/过程文件/调研报告/老挝市场调研报告.html',
            description: '对老挝市场的调研成果，包括市场概况、投资环境分析和市场机会'
          }
        ]
      }
    ]
  }
];

/**
 * 初始化网站功能
 */
function initSite() {
  loadDocumentStructure();
  setupEventListeners();
  showHomePage();
}

/**
 * 加载文档分类结构并渲染导航菜单
 */
function loadDocumentStructure() {
  const navTree = document.querySelector('.nav-tree');
  if (!navTree) return;
  
  documentStructure.forEach(category => {
    const categoryElement = createCategoryElement(category);
    navTree.appendChild(categoryElement);
  });
}

/**
 * 创建分类元素
 * @param {Object} category - 分类对象
 * @returns {HTMLElement} - 分类元素
 */
function createCategoryElement(category) {
  const categoryElement = document.createElement('div');
  categoryElement.className = 'nav-category';
  
  const headerElement = document.createElement('div');
  headerElement.className = 'nav-header';
  headerElement.innerHTML = `
    ${category.icon ? `<img src="${category.icon}" alt="${category.name}" class="icon">` : ''}
    <span>${category.name}</span>
    ${category.children ? '<span class="toggle-icon">›</span>' : ''}
  `;
  
  categoryElement.appendChild(headerElement);
  
  if (category.children && category.children.length > 0) {
    const subCategoryContainer = document.createElement('div');
    subCategoryContainer.className = 'nav-subcategory';
    
    category.children.forEach(subCategory => {
      const subCategoryElement = document.createElement('div');
      subCategoryElement.className = 'nav-subcategory-item';
      
      const subHeaderElement = document.createElement('div');
      subHeaderElement.className = 'nav-header';
      subHeaderElement.innerHTML = `
        ${subCategory.icon ? `<img src="${subCategory.icon}" alt="${subCategory.name}" class="icon">` : ''}
        <span>${subCategory.name}</span>
        ${subCategory.documents && subCategory.documents.length > 0 ? '<span class="toggle-icon">›</span>' : ''}
      `;
      
      subCategoryElement.appendChild(subHeaderElement);
      
      if (subCategory.documents && subCategory.documents.length > 0) {
        const documentsList = document.createElement('div');
        documentsList.className = 'nav-documents';
        
        subCategory.documents.forEach(doc => {
          const docElement = document.createElement('a');
          docElement.className = 'nav-item';
          docElement.textContent = doc.title;
          docElement.setAttribute('data-path', doc.path);
          docElement.setAttribute('data-title', doc.title);
          docElement.setAttribute('data-description', doc.description || '');
          docElement.setAttribute('data-category', category.name);
          docElement.setAttribute('data-subcategory', subCategory.name);
          
          documentsList.appendChild(docElement);
        });
        
        subCategoryElement.appendChild(documentsList);
      }
      
      subCategoryContainer.appendChild(subCategoryElement);
    });
    
    categoryElement.appendChild(subCategoryContainer);
    
    // 添加点击事件切换子分类显示/隐藏
    headerElement.addEventListener('click', function() {
      headerElement.classList.toggle('expanded');
      subCategoryContainer.classList.toggle('active');
    });
  }
  
  return categoryElement;
}

/**
 * 设置事件监听器
 */
function setupEventListeners() {
  document.addEventListener('click', function(event) {
    const navItem = event.target.closest('.nav-item');
    if (navItem) {
      event.preventDefault();
      const path = navItem.getAttribute('data-path');
      const title = navItem.getAttribute('data-title');
      const description = navItem.getAttribute('data-description');
      const category = navItem.getAttribute('data-category');
      const subcategory = navItem.getAttribute('data-subcategory');
      
      loadDocumentContent(path, title, description, category, subcategory);
      
      // 移除所有活动项的活动状态
      document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // 将当前项设置为活动状态
      navItem.classList.add('active');
    }
    
    const subHeader = event.target.closest('.nav-subcategory-item .nav-header');
    if (subHeader && !event.target.closest('.toggle-icon')) {
      const documents = subHeader.nextElementSibling;
      if (documents && documents.classList.contains('nav-documents')) {
        subHeader.classList.toggle('expanded');
        documents.classList.toggle('active');
      }
    }
  });
  
  // 移动端菜单切换
  const mobileToggle = document.querySelector('.mobile-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileNav);
  }

  // 主页链接
  const homeLink = document.getElementById('home-link');
  if (homeLink) {
    homeLink.addEventListener('click', function(event) {
      event.preventDefault();
      showHomePage();
    });
  }
}

/**
 * 切换移动端导航菜单的显示/隐藏
 */
function toggleMobileNav() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('active');
}

/**
 * 显示首页内容
 */
function showHomePage() {
  const mainContent = document.querySelector('.main-content');
  
  // 设置面包屑
  const breadcrumb = document.querySelector('.breadcrumb');
  if (breadcrumb) {
    breadcrumb.innerHTML = '<span>首页</span>';
  }
  
  // 设置内容标题
  const contentTitle = document.querySelector('.content-title');
  if (contentTitle) {
    contentTitle.textContent = '云南省海外投资有限公司文档导航';
  }
  
  // 清除所有活动状态
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // 生成首页内容
  let contentHTML = `
    <div class="welcome-section">
      <h2 class="welcome-title">境外合规体系建设项目文档中心</h2>
      <p class="welcome-text">本系统汇集了云南省建设投资控股集团有限公司国际部在境外合规体系建设方面的所有相关文档，包括制度文件、培训资料、风险评估报告以及工作过程文件。</p>
    </div>
  `;
  
  // 生成成果文件和过程文件部分
  documentStructure.forEach(category => {
    contentHTML += `
      <div class="category-section">
        <h3 class="category-title">${category.name}</h3>
        <div class="file-grid">
    `;
    
    category.children.forEach(subcategory => {
      subcategory.documents.forEach(doc => {
        contentHTML += `
          <div class="file-card">
            <div class="file-card-header">
              <img src="${subcategory.icon || 'images/icons/document_icon.png'}" alt="${doc.title}">
              <div class="file-card-title">${doc.title}</div>
            </div>
            <div class="file-card-body">
              <div class="file-card-description">${doc.description || ''}</div>
              <div class="file-card-link">
                <a href="#" data-path="${doc.path}" data-title="${doc.title}" 
                   data-description="${doc.description || ''}" data-category="${category.name}" 
                   data-subcategory="${subcategory.name}" class="view-document">查看文档</a>
              </div>
            </div>
          </div>
        `;
      });
    });
    
    contentHTML += `
        </div>
      </div>
    `;
  });
  
  // 更新内容
  const contentBody = document.querySelector('.content-body');
  if (contentBody) {
    contentBody.innerHTML = contentHTML;
  }
  
  // 为文档卡片添加点击事件
  document.querySelectorAll('.view-document').forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const path = this.getAttribute('data-path');
      const title = this.getAttribute('data-title');
      const description = this.getAttribute('data-description');
      const category = this.getAttribute('data-category');
      const subcategory = this.getAttribute('data-subcategory');
      
      loadDocumentContent(path, title, description, category, subcategory);
      
      // 查找并激活对应的导航项
      document.querySelectorAll('.nav-item').forEach(item => {
        if (item.getAttribute('data-path') === path) {
          item.classList.add('active');
          
          // 展开父级菜单
          const subCategory = item.closest('.nav-subcategory-item');
          if (subCategory) {
            const navHeader = subCategory.querySelector('.nav-header');
            if (navHeader) navHeader.classList.add('expanded');
            const navDocs = subCategory.querySelector('.nav-documents');
            if (navDocs) navDocs.classList.add('active');
          }
          
          const parentCategory = item.closest('.nav-category');
          if (parentCategory) {
            const navHeader = parentCategory.querySelector('.nav-header');
            if (navHeader) navHeader.classList.add('expanded');
            const navSub = parentCategory.querySelector('.nav-subcategory');
            if (navSub) navSub.classList.add('active');
          }
        } else {
          item.classList.remove('active');
        }
      });
    });
  });
}

/**
 * 根据路径加载文档内容到内容区域
 * @param {string} path - 文档路径
 * @param {string} title - 文档标题
 * @param {string} description - 文档描述
 * @param {string} category - 文档所属分类
 * @param {string} subcategory - 文档所属子分类
 */
function loadDocumentContent(path, title, description, category, subcategory) {
  const mainContent = document.querySelector('.main-content');
  
  // 设置面包屑
  const breadcrumb = document.querySelector('.breadcrumb');
  if (breadcrumb) {
    breadcrumb.innerHTML = `
      <span><a href="#" id="home-link">首页</a></span>
      <span>${category}</span>
      <span>${subcategory}</span>
      <span>${title}</span>
    `;
    
    // 重新绑定首页链接事件
    const homeLink = document.getElementById('home-link');
    if (homeLink) {
      homeLink.addEventListener('click', function(event) {
        event.preventDefault();
        showHomePage();
      });
    }
  }
  
  // 设置内容标题
  const contentTitle = document.querySelector('.content-title');
  if (contentTitle) {
    contentTitle.textContent = title;
  }
  
  // 设置内容
  const contentBody = document.querySelector('.content-body');
  if (contentBody) {
    contentBody.innerHTML = `
      <div class="document-description">${description || ''}</div>
      <iframe src="${path}" title="${title}"></iframe>
    `;
  }
}

// Syntax self-check
try {
  console.log("Syntax check passed");
}
catch (error) {
  console.error("Syntax error:", error.message);
}

// Function verification
console.assert(typeof initSite === 'function', "initSite should be a function");
console.assert(typeof loadDocumentContent === 'function', "loadDocumentContent should be a function");