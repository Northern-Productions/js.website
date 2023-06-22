const theme = 'theme';
const dataTheme = 'data-theme';
const themeTab = '.theme-tab';
const switcherBtn = '.switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active'; 

const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';

const dataFilter = '[data-filter]';
const portfolioData = '[data-item]';

const portfolioCardData = [
  {
    cardType: 'web',
    cardImage: 'portfolio-1.jpg',
    cardTitle: 'Web Development',
    cardSite: 'Food Website'
  }
];
const cardContainer = document.getElementById('card-container');

const root = document.documentElement;

/* Theme variables */
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

/* Portfolio */
const filterLink = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);
const searchBox = document.querySelector('#search');

/* Modal */
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

const setActive = (elm, selector) => {
  if (document.querySelector(`${selector}.${active}`) !== null) {
    document.querySelector(`${selector}.${active}`).classList.remove(active);
  }
  elm.classList.add(active);
}

/* Theme logic */
const setTheme = (val) => {
  if (val === dark) {
    root.setAttribute(dataTheme,dark);
    localStorage.setItem(theme, dark);
  } else {
    root.setAttribute(dataTheme, light);
    localStorage.setItem(theme, light);
  }
};

if (currentTheme) {
  root.setAttribute(dataTheme, currentTheme);
  switcher.forEach((btn) => {
    btn.classList.remove(active);
  });

  if (currentTheme === dark) {
    switcher[1].classList.add(active);
  } else {
    switcher[0].classList.add(active);
  }
}

toggleTheme.addEventListener('click', function() {
  const tab = this.parentElement.parentElement;
  if (!tab.classList.includes(open)) {
    tab.classList.add(open);
  } else {
    tab.classList.remove(open);
  }
});

for (const elm of switcher) {
  elm.addEventListener('click', function() {
    const toggle = this.dataset.toggle;
    setActive(elm, switcherBtn);
    setTheme(toggle);
  })
}





/* Cards */
function createPortfolioCard (data) {
  const card = `
    <div class="portfolio-grid" data-item="${data.cardType}">
      <div class="portfolio-card">
        <div class="card-body">
          <img src="./assets/images/${data.cardImage}" alt="${data.cardTitle}">
          <a href="#" class="card-popup-box">
            <div>${data.cardTitle}</div>
            <h3>${data.cardSite}</h3>
          </a>
        </div>
      </div>
    </div>
  `;
  return card;
}

portfolioCardData.forEach((card) => {
  const cardElement = document.createElement('div');
  cardElement.innerHTML = createPortfolioCard(card);
  cardContainer.appendChild(cardElement);
});





searchBox.addEventListener('keyup', (e) => {
  const searchInput = e.target.value.toLowerCase().trim();

  portfolioItems.forEach((card) => {
    if (card.dataset.item.includes(searchInput)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  })
})

for (const link of filterLink) {
  link.addEventListener('click', function() {
    setActive(link, '.filter-link');
    const filter = this.dataset.filter;
    portfolioItems.forEach((card) => {
      if (filter === 'all') {
        card.style.display = 'block';
      } else if (card.dataset.item === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    })
  })
}

//Full site modal "Open buttons"
for (const elm of openModal) {
    elm.addEventListener('click', function() {
        const modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isVisible);
    })
}

for (const elm of closeModal) {
    elm.addEventListener('click', function() {
        this.parentElement.parentElement.classList.remove(isVisible);
    })
}