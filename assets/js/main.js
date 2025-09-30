/**

*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#navbar');
    if (selectHeader) {
      window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
    }
  }

  document.addEventListener('scroll', toggleScrolled); 
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle - Updated for new navbar
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-menu-toggle');

  function mobileNavToggle() {
    console.log('Mobile nav toggle clicked'); // Debug
    const navbarMenu = document.querySelector('.navbar-menu');
    if (navbarMenu) {
      navbarMenu.classList.toggle('active');
      console.log('Menu active class:', navbarMenu.classList.contains('active')); // Debug
      console.log('Menu computed display:', window.getComputedStyle(navbarMenu).display); // Debug
    }
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.classList.toggle('active');
    }
  }
  
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
    console.log('Mobile menu toggle button found and event listener added'); // Debug
  } else {
    console.log('Mobile menu toggle button not found'); // Debug
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('.navbar-menu a').forEach(navlink => {
    navlink.addEventListener('click', () => {
      const navbarMenu = document.querySelector('.navbar-menu');
      if (navbarMenu && navbarMenu.classList.contains('active')) {
        mobileNavToggle();
      }
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

/**
 * Toggle More Skills Function
 */
function toggleMoreSkills() {
  const hiddenSkills = document.getElementById('hiddenSkills');
  const showMoreBtn = document.getElementById('showMoreBtn');
  const btnText = showMoreBtn.querySelector('span');
  const btnIcon = showMoreBtn.querySelector('i');
  
  if (hiddenSkills.style.display === 'none' || hiddenSkills.style.display === '') {
    // Show hidden skills
    hiddenSkills.style.display = 'grid';
    setTimeout(() => {
      hiddenSkills.classList.add('show');
    }, 10);
    
    // Update button text and icon
    btnText.textContent = 'Ocultar tecnologías';
    btnIcon.className = 'bi bi-dash-circle';
    showMoreBtn.classList.add('expanded');
    
    // Smooth scroll to see the new skills
    setTimeout(() => {
      hiddenSkills.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      });
    }, 300);
    
  } else {
    // Hide skills
    hiddenSkills.classList.remove('show');
    
    // Update button text and icon
    btnText.textContent = 'Ver todas las tecnologías';
    btnIcon.className = 'bi bi-plus-circle';
    showMoreBtn.classList.remove('expanded');
    
    // Hide after animation
    setTimeout(() => {
      hiddenSkills.style.display = 'none';
    }, 500);
  }
}