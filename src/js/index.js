const icon = '<svg class="icon"><use xlink:href="svg/sprite.svg#tick"></use></svg>';

const priceMonth = ['19', '54', '89'];
const priceYear = ['12', '36', '56'];

const cards = [
  {
    title: 'Starter',
    description: 'Unleash the power of automation.',
    items: ['Multi-step Zaps', '3 Premium Apps', '2 Users team'],
  },
  {
    title: 'Professional',
    description: 'Advanced tools to take your work to the next level.',
    items: [
      'Multi-step Zaps',
      'Unlimited Premium',
      '50 Users team',
      'Shared Workspace',
    ],
  },
  {
    title: 'Company',
    description: 'Automation plus enterprise-grade features.',
    items: [
      'Multi-step Zaps',
      '3 Premium Apps',
      'Unlimited Users Team',
      'Advanced Admin',
      'Custom Data Retention',
    ],
  },
];

const titleElements = document.querySelectorAll('.card__title');
const titleElementsYearly = document.querySelectorAll('.card__title-yearly');
const descriptionElements = document.querySelectorAll('.card__description');
const descriptionElementsYearly = document.querySelectorAll(
  '.card__description-yearly'
);
const listElements = document.querySelectorAll('.card__list');
const listElementsYearly = document.querySelectorAll('.card__list-yearly');
// Tabs
const tabsBtn = document.querySelectorAll('.tabs__nav-btn');
const tabsItems = document.querySelectorAll('.tabs__item');

const onTabClick = (item) => {
  item.addEventListener('click', function () {
    let currentBtn = item;
    let tabId = currentBtn.getAttribute('data-tab');
    let currentTab = document.querySelector(tabId);

    if (!currentBtn.classList.contains('active')) {
      tabsBtn.forEach(function (item) {
        item.classList.remove('btn-active');
      });
      tabsItems.forEach(function (item) {
        item.classList.remove('active');
      });

      currentBtn.classList.add('btn-active');
      currentTab.classList.add('active');

      cards.forEach((card, index) => {
        document.querySelectorAll('.price')[
          index
        ].textContent = `$${priceMonth[index]}`;
        document.querySelectorAll('.price-yearly')[
          index
        ].textContent = `$${priceYear[index]}`;
        titleElements[index].textContent = card.title;
        titleElementsYearly[index].textContent = card.title;
        descriptionElements[index].textContent = card.description;
        descriptionElementsYearly[index].textContent = card.description;

        listElements[index].innerHTML = '';
        listElementsYearly[index].innerHTML = '';

        card.items.forEach((item) => {
          const listItem = document.createElement('li');
          const listItemYearly = document.createElement('li');
          listItem.textContent = item;
          listItemYearly.textContent = item;

          listItem.innerHTML = icon + listItem.innerHTML;
          listItemYearly.innerHTML = icon + listItemYearly.innerHTML;

          listElements[index].appendChild(listItem);
          listElementsYearly[index].appendChild(listItemYearly);
        });
      });
    }
  });
};

tabsBtn.forEach(onTabClick);

document.querySelector('.tabs__nav-btn').click();
