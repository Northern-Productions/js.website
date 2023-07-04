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
const portfolioGrid = '.portfolio-grid';

const cardAndModalData = [
  {
    cardType: 'web',
    cardOpen: 'web-1',
    cardImage: 'portfolio-1.jpg',
    cardTitle: 'Web Development',
    cardSite: 'Food Website'
  },
  {
    cardType: 'web',
    cardOpen: 'web-2',
    cardImage: 'portfolio-2.jpg',
    cardTitle: 'Web Development',
    cardSite: 'Skate Website'
  },
  {
    cardType: 'web',
    cardOpen: 'web-3',
    cardImage: 'portfolio-3.jpg',
    cardTitle: 'Web Development',
    cardSite: 'Eating Website'
  },
  {
    cardType: 'ui',
    cardOpen: 'ui-1',
    cardImage: 'portfolio-4.jpg',
    cardTitle: 'UI Design',
    cardSite: 'Cool Design'
  },
  {
    cardType: 'app',
    cardOpen: 'app-1',
    cardImage: 'portfolio-5.jpg',
    cardTitle: 'App Development',
    cardSite: 'Game App'
  },
  {
    cardType: 'app',
    cardOpen: 'app-2',
    cardImage: 'portfolio-6.jpg',
    cardTitle: 'App Development',
    cardSite: 'Gambling App'
  },
  {
    cardType: 'app',
    cardOpen: 'app-3',
    cardImage: 'portfolio-7.jpg',
    cardTitle: 'App Development',
    cardSite: 'Money Website'
  },
  {
    cardType: 'ui',
    cardOpen: 'ui-2',
    cardImage: 'portfolio-8.jpg',
    cardTitle: 'UI Design',
    cardSite: 'Fantastic Design'
  },
];
const cardContainer = document.querySelector(portfolioGrid);
/* Generate cards */
function createCard(cardInfo) {
  const card = document.createElement('div');
  card.classList.add('portfolio-card');
  card.dataset.item = cardInfo.cardType;
  card.dataset.open = cardInfo.cardOpen;
  
  card.innerHTML = `
  <div class="card-body">
    <img src="./assets/images/${cardInfo.cardImage}" alt="${cardInfo.cardTitle}">
    <div class="card-popup-box">
      <div>${cardInfo.cardTitle}</div>
      <h3>${cardInfo.cardSite}</h3>
    </div>
  </div>
  `;
  return card;
}

/* Generate popup modals */

// Make HTML for each card
cardAndModalData.forEach((item) => {
  const card = createCard(item);
  cardContainer.appendChild(card);
});

const root = document.documentElement;

/* Theme */
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

/* Portfolio */
const filterLink = document.querySelectorAll(dataFilter);
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
  if (!tab.classList.contains(open)) {
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

//Select elements with data-item
const portfolioItems = document.querySelectorAll(portfolioData);

searchBox.addEventListener('keyup', (e) => {
  const searchInput = e.target.value.toLowerCase().trim();

  portfolioItems.forEach((card) => {
    if (card.dataset.item.includes(searchInput)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  })
});

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

//Modal/Full site modal "Open buttons"
for (const elm of openModal) {
    elm.addEventListener('click', function() {
        const modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isVisible);
    })
}

console.log(openModal);

for (const elm of closeModal) {
    elm.addEventListener('click', function() {
        this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    })
}

//Modal
document.addEventListener('click', (e) => {
  if (e.target === document.querySelector('.modal.is-visible')) {
    document.querySelector('.modal.is-visible').classList.remove(isVisible);
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    document.querySelector('.modal.is-visible').classList.remove(isVisible);
  }
});