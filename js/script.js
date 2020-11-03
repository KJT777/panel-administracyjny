/* global Chart */
{
  ('use strict');
  const MOBILE_BREAKPOINT = 768;

  const select = {
    hamburgerMenu: '#hamburger-menu',
    sidebarLinksTexts: '#sidebar-links li span',
    wallet: '.wallet',
    iconArrowDown: '.icon-arrow-down',
    mainWrapper: '.main-content-wrapper',
    sidebar: '.sidebar',
    sidebarLinks: '#sidebar-links li',
    allSections: '.main-content-wrapper section',
    detailsTable: '#details',
    pagination: '.pages',
    topBar: '.top-bar',
    payoutTable: '#payout',
  };

  const classNames = {
    active: 'active',
    iconArrowUp: 'icon-arrow-up',
    hideText: 'hide-text',
  };

  const walletDrop = function () {
    const wallet = document.querySelector(select.wallet);
    const arrow = wallet.querySelector(select.iconArrowDown);

    wallet.addEventListener('click', function (event) {
      event.preventDefault();

      wallet.classList.toggle(classNames.active);
      arrow.classList.toggle(classNames.iconArrowUp);
    });
  };

  walletDrop();

  const hambMenuAction = function () {
    const hambMenu = document.querySelector(select.hamburgerMenu);
    const sidebar = document.querySelector(select.sidebar);
    const mainWrapper = document.querySelector(select.mainWrapper);
    const topBar = document.querySelector(select.topBar);

    hambMenu.addEventListener('click', function (event) {
      event.preventDefault();

      if (window.innerWidth > MOBILE_BREAKPOINT) {
        sidebar.classList.toggle(classNames.hideText);
        mainWrapper.classList.toggle(classNames.hideText);
      } else {
        sidebar.classList.toggle(classNames.active);
        topBar.classList.toggle(classNames.active);
      }
    });
  };

  hambMenuAction();

  const sidebarLinksAction = function () {
    const sidebarLinks = document.querySelectorAll(select.sidebarLinks);

    for (let link of sidebarLinks) {
      /* add event listener to all links */
      link.addEventListener('click', function (event) {
        event.preventDefault();

        /* Hide menu on mobile after link clicked */
        hideMenuOnMobile();

        /* clear 'active' class in all links */
        for (let link of sidebarLinks) {
          link.classList.remove(classNames.active);
        }

        const clickedElement = this;

        /* get href of clicked link */
        const id = clickedElement
          .querySelector('a')
          .getAttribute('href')
          .replace('#', '');

        const sections = document.querySelectorAll(select.allSections);

        /* clear class 'active' from all sections */
        for (let section of sections) {
          section.classList.remove(classNames.active);
        }

        /* find section with id === clicked element href and add 'active' class to it */
        document.getElementById(id).classList.add(classNames.active);

        /* if 'General' clicked show also 'Links' section */
        if (id === 'general') {
          document.getElementById('links').classList.add(classNames.active);
        }

        /* add 'active' class to clicked link */
        clickedElement.classList.add(classNames.active);
      });
    }
  };

  sidebarLinksAction();

  const hideMenuOnMobile = function () {
    const sidebar = document.querySelector(select.sidebar);
    const topBar = document.querySelector(select.topBar);

    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      sidebar.classList.remove(classNames.active);
      topBar.classList.remove(classNames.active);
    }
  };

  const detailsTable = document.querySelector(select.detailsTable);
  const payoutTable = document.querySelector(select.payoutTable);

  const pagination = function (table, itemsPerPage = 10) {
    /* Select all data from tbody of table */
    const dataTable = Array.from(table.querySelectorAll('tbody tr'));

    let currentPage = 0;

    const renderPage = function (page) {
      const tableBeg = page * itemsPerPage;

      const tableSlice = dataTable.slice(tableBeg, tableBeg + itemsPerPage);

      const tbody = table.querySelector('tbody');

      tbody.innerHTML = '';

      tableSlice.forEach(function (tr) {
        tbody.appendChild(tr);
      });

      currentPage = page;
    };

    renderPage(0);

    /* Count number of pages */
    const pageNumbers = Math.ceil(dataTable.length / itemsPerPage);

    /* Select div to put page numbers */
    const pagination = table.querySelector(select.pagination);

    /* Create 'a' element for each page and set href attribute to number of page */
    for (let i = 1; i <= pageNumbers; i++) {
      const newPage = document.createElement('a');
      newPage.innerText = i;
      newPage.setAttribute('href', i);

      /* Append page number to div with page numbers */
      pagination.appendChild(newPage);

      newPage.addEventListener('click', function (event) {
        event.preventDefault();
        renderPage(i - 1);
      });
    }

    table.querySelector('.less').addEventListener('click', function (event) {
      event.preventDefault();
      if (currentPage > 0) {
        renderPage(currentPage - 1);
      }
    });

    table.querySelector('.more').addEventListener('click', function (event) {
      event.preventDefault();
      if (currentPage < pageNumbers - 1) {
        renderPage(currentPage + 1);
      }
    });
  };

  pagination(detailsTable, 8);
  pagination(payoutTable, 8);

  function closeModal() {
    document.getElementById('overlay').classList.remove('show');
  }

  document
    .querySelectorAll('#overlay .js--close-modal')
    .forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        event.preventDefault();
        closeModal();
      });
    });

  document
    .querySelector('#overlay')
    .addEventListener('click', function (event) {
      if (event.target === this) {
        closeModal();
      }
    });

  document.addEventListener('keyup', function (event) {
    if (event.keyCode === 27) {
      closeModal();
    }
  });

  function openModal(modal) {
    document.querySelectorAll('#overlay > *').forEach(function (modal) {
      modal.classList.remove('show');
    });
    document.querySelector('#overlay').classList.add('show');
    document.querySelector(modal).classList.add('show');
  }

  document.querySelector('#quit').addEventListener('click', function (event) {
    event.preventDefault();
    openModal('#quit-modal');
  });

  const ctx = document.getElementById('myChart').getContext('2d');

  // eslint-disable-next-line 
  const chart = new Chart(ctx, {
    // 1
    type: 'bar',

    data: {
      // 2
      labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
      // 3
      datasets: [
        {
          // 4
          label: 'Signups',
          // 5
          backgroundColor: '#8DBEC8',
          borderColor: '#8DBEC8',
          // 6
          data: [52, 51, 41, 94, 26, 6, 72, 9, 21, 88],
        },
        {
          label: 'FTD',
          backgroundColor: '#F29E4E',
          borderColor: '#F29E4E',
          data: [6, 72, 1, 0, 47, 11, 50, 44, 63, 76],
        },
        {
          label: 'Earned',
          backgroundColor: '#71B374',
          borderColor: '#71B374',
          data: [59, 49, 68, 90, 67, 41, 13, 38, 48, 48],
          // 7
          hidden: true,
        },
      ],
    },
    options: {
      legend: {
        labels: {
          padding: 50,
          usePointStyle: true,
          backgroundColor: '#F5F5F2',
        },
      },
    },
  });
}