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
const modalGroup = '.modal-container';

const cardAndModalData = [
  /* Card and modal data */
  {
    cardType: 'web',
    cardAndModalOpen: 'web-1',
    cardAndModalImage: 'portfolio-1.jpg',
    cardAndModalTitle: 'Web Development',
    cardSite: 'Food Website',
    modalTitle: 'Web Project 1',
    modalHeader: 'My first awesome website',
    modalText1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur justo fringilla aliquet.',
    modalText2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur justo fringilla aliquet.'
  },
  {
    cardType: 'web',
    cardAndModalOpen: 'web-2',
    cardAndModalImage: 'portfolio-2.jpg',
    cardAndModalTitle: 'Web Development',
    cardSite: 'Skate Website',
    modalTitle: 'Web Project 2',
    modalHeader: 'My first awesome website',
    modalText1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur justo fringilla aliquet.',
    modalText2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur justo fringilla aliquet.'
  },
  {
    cardType: 'web',
    cardAndModalOpen: 'web-3',
    cardAndModalImage: 'portfolio-3.jpg',
    cardAndModalTitle: 'Web Development',
    cardSite: 'Eating Website',
    modalTitle: 'Web Project 3',
    modalHeader: 'My first awesome website',
    modalText1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur justo fringilla aliquet.',
    modalText2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur justo fringilla aliquet.'
  },
  {
    cardType: 'app',
    cardAndModalOpen: 'app-1',
    cardAndModalImage: 'portfolio-4.jpg',
    cardAndModalTitle: 'App Development',
    cardSite: 'Game App',
    modalTitle: 'App Project 1',
    modalHeader: 'My first awesome app',
    modalText1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur justo fringilla aliquet.',
    modalText2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur justo fringilla aliquet.'
  },
  {
    cardType: 'app',
    cardAndModalOpen: 'app-2',
    cardAndModalImage: 'portfolio-5.jpg',
    cardAndModalTitle: 'App Development',
    cardSite: 'Gambling App',
    modalTitle: 'App Project 2',
    modalHeader: 'My first awesome app',
    modalText1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur justo fringilla aliquet.',
    modalText2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur justo fringilla aliquet.'
  },
  {
    cardType: 'app',
    cardAndModalOpen: 'app-3',
    cardAndModalImage: 'portfolio-6.jpg',
    cardAndModalTitle: 'App Development',
    cardSite: 'Money Website',
    modalTitle: 'App Project 3',
    modalHeader: 'My first awesome app',
    modalText1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur justo fringilla aliquet.',
    modalText2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur justo fringilla aliquet.'
  },
  {
    cardType: 'ui',
    cardAndModalOpen: 'ui-1',
    cardAndModalImage: 'portfolio-7.jpg',
    cardAndModalTitle: 'Ui Development',
    cardSite: 'Ui Design',
    modalTitle: 'Ui Project 1',
    modalHeader: 'My first awesome design',
    modalText1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur justo fringilla aliquet.',
    modalText2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur justo fringilla aliquet.'
  },
  {
    cardType: 'ui',
    cardAndModalOpen: 'ui-2',
    cardAndModalImage: 'portfolio-8.jpg',
    cardAndModalTitle: 'Ui Development',
    cardSite: 'Fantastic Design',
    modalTitle: 'Ui Project 2',
    modalHeader: 'My first awesome design',
    modalText1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur justo fringilla aliquet.',
    modalText2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur justo fringilla aliquet.'
  }
];

const cardContainer = document.querySelector(portfolioGrid);
const modalContainer = document.querySelector(modalGroup);

/* Generate cards */
function createCard(cardInfo) {
  const card = document.createElement('div');
  card.classList.add('portfolio-card');
  card.dataset.item = cardInfo.cardType;
  card.dataset.open = cardInfo.cardAndModalOpen;
  
  card.innerHTML = `
  <div class="card-body">
    <img src="./assets/images/${cardInfo.cardAndModalImage}" alt="${cardInfo.cardAndModalTitle}">
    <div class="card-popup-box">
      <div>${cardInfo.cardAndModalTitle}</div>
      <h3>${cardInfo.cardSite}</h3>
    </div>
  </div>
  `;
  return card;
}

/* Generate popup modals */
function createModal(modalInfo) {
  const modal = document.createElement('div');
  modal.id = modalInfo.cardAndModalOpen;
  modal.classList.add('modal');
  modal.dataset.animation = 'slideInOutTop';
  
  modal.innerHTML = `
  <div class="modal-dialog">
    <header class="modal-header">
      <h3>${modalInfo.modalTitle}</h3>
      <i class="fas fa-times" data-close></i>
    </header>
    <div class="modal-body">
      <div class="img-wrapper">
        <img src="./assets/images/${modalInfo.cardAndModalImage}" alt="${modalInfo.cardAndModalTitle}">
      </div>
      <div class="text-wrapper">
        <p><strong>${modalInfo.modalHeader}</strong></p>
        <p>${modalInfo.modalText1}</p>
        <p>${modalInfo.modalText2}</p>
      </div>
    </div>
  </div>
  `
  return modal;
}

/* Make HTML for each card */
cardAndModalData.forEach((item) => {
  const card = createCard(item);
  cardContainer.appendChild(card);
});

/* Make HTML for each card */
cardAndModalData.forEach((item) => {
  const modal = createModal(item);
  modalContainer.appendChild(modal);
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