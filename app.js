// Load and render stuff from content.json
async function loadContent() {
  try {
    const response = await fetch('/content.json');
    const content = await response.json();
    return content;
  } catch (error) {
    console.error('Error loading content:', error);
    showError();
  }
}

// Show loading state while getting the things from the content file
function showLoading() {
  const root = document.getElementById('root');
  root.innerHTML = `
    <div class="loading-container">
      <div class="spinner-border text-light" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3 text-white">Loading...</p>
    </div>
  `;
}

// Show error state if things failed when being retrieved from the content file
function showError() {
  const root = document.getElementById('root');
  root.innerHTML = `
    <div class="error-container">
      <div class="alert alert-danger">
        Error loading content. Please check that content.json exists.
      </div>
    </div>
  `;
}

// This shows the site
function renderSite(content) {
    // Calculate the current year to shove in the footer for the copyright portion
    const currentYear = new Date().getFullYear();
  
    // Update the page title to be the one from the content file
    document.title = content.siteTitle;
  
    const root = document.getElementById('root');
  
    // Create the header with the background image
    const header = document.createElement('div');
    header.className = 'header-background-image mb-0';
    header.innerHTML = `
        <img src="${content.backgroundImage}" alt="Banner" class="header-img" />
        <header>
        <div class="container header-body-container">
            <h1>${content.siteTitle}</h1>
            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="#${content.about.title}">${content.about.title}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#${content.games.title}">${content.games.title}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#${content.portfolio.title}">${content.portfolio.title}</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        </header>
    `;
  
    // Create the main content container
    const appContainer = document.createElement('div');
    appContainer.className = 'app-container mt-0';
    
    // Create the about section - This iterates through the about list items and the social links
    const aboutSection = document.createElement('div');
    aboutSection.className = 'container about-section';
    aboutSection.innerHTML = `
        <h2 id="${content.about.title}">${content.about.title}</h2>
        <div class="row">
        <div class="col-md-4 text-center mb-4 mb-md-0">
            <div class="profile-container mx-auto">
            <img src="${content.about.profileImage}" alt="Profile" class="profile-image" />
            </div>
        </div>
        <div class="col-md-8">
            <div class="about-text">
            <h3>${content.about.intro}</h3>
            <div class="mx-3">
                <ul>
                ${content.about.list.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            <h3 class="mt-3">Find me on:</h3>
            <div class="mx-3">
                <ul class="social-list">
                ${content.socialLinks.map(social => `
                    <li>
                    <a class="about-social-links" href="${social.url}" target="_blank" rel="noopener noreferrer" aria-label="${social.platform}">
                        <p><i class="${social.icon}"></i> ${social.platform}</p>
                    </a>
                    </li>
                `).join('')}
                </ul>
            </div>
            </div>
        </div>
        </div>
    `;
    
    // Create the games section by iterating through the list from the content file
    const gamesSection = document.createElement('div');
    gamesSection.className = 'container game-section mt-3';
    gamesSection.innerHTML = `
        <h2 id="${content.games.title}">${content.games.title}</h2>
        <div class="row row-cols-1 row-cols-md-3 g-4">
        ${content.games.items.map(item => `
            <div class="col">
            <a href="${item.link}" class="text-decoration-none">
                <div class="card game-card h-100">
                <img src="${item.image}" alt="${item.title}" class="card-img-top" />
                <div class="card-img-overlay game-card-overlay">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                </div>
                </div>
            </a>
            </div>
        `).join('')}
        </div>
    `;
    
    // Create the art portfolio section by iterating through the list from the content file (similar to the games section)
    const portfolioSection = document.createElement('div');
    portfolioSection.className = 'container portfolio-section mt-3';
    portfolioSection.innerHTML = `
        <h2 id="${content.portfolio.title}">${content.portfolio.title}</h2>
        <div class="row row-cols-1 row-cols-md-2 g-4">
        ${content.portfolio.items.map(item => `
            <div class="col">
            <a href="${item.link}" class="text-decoration-none">
                <div class="card portfolio-card h-100">
                <img src="${item.image}" alt="${item.title}" class="card-img-top" />
                <div class="card-img-overlay portfolio-card-overlay">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                </div>
                </div>
            </a>
            </div>
        `).join('')}
        </div>
    `;
    
    // Create the footer. This has the social links again and the copyright portion with the current year and the name from the content file.
    const footer = document.createElement('footer');
    footer.className = 'mt-3';
    footer.innerHTML = `
        <div class="container-fluid footer-bg py-5 text-center">
        <div class="container">
            <div class="row social-links">
            ${content.socialLinks.map(social => `
                <a href="${social.url}" target="_blank" rel="noopener noreferrer" aria-label="${social.platform}">
                <i class="${social.icon}"></i>
                </a>
            `).join('')}
            </div>
            <div class="row">
            <p class="copyright text-secondary">©${currentYear} ${content.footer.copyrightName}. All rights reserved.</p>
            </div>
        </div>
        </div>
    `;
    
    // Append all sections to the main app container thing
    appContainer.appendChild(aboutSection);
    appContainer.appendChild(gamesSection);
    appContainer.appendChild(portfolioSection);
    
    // Just attaches the header, main app, and footer to the website.
    root.innerHTML = '';
    root.appendChild(header);
    root.appendChild(appContainer);
    root.appendChild(footer);
}

// Initializes the site
async function init() {
    showLoading();
    const content = await loadContent();
    
    if (content) {
        renderSite(content);
    }
}

// Run when DOM (the document model that represents the HTML document) is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
