document.addEventListener('DOMContentLoaded', function() {
  const navEl = document.querySelector('.navbar');
  
  function non_scroll(){
    let width= window.innerWidth;
    if ((window.scrollY <= 100 && width >= 1280) || (window.scrollY <= 56 && width < 1280)||window.scrollY===0) {
      navEl.classList.remove('navbar-scrolled');
    }
  }
  non_scroll();
      let userToggler = document.getElementById('user-toggler');
      let navbarToggler = document.getElementById('navbar-toggler');
      let collapsibleNavbar = document.getElementById('collapsibleNavbar');
      let user = document.getElementById('user');
      
      userToggler.addEventListener('click', function () {
          if (collapsibleNavbar.classList.contains('show')) {
              navbarToggler.click();
          }
      });
  
      navbarToggler.addEventListener('click', function () {
          if (user.classList.contains('show')) {
              userToggler.click();
          }
      });
      
  document.getElementById('navbar-toggler').addEventListener('click', function(){
    let width = window.innerWidth;
    if ((window.scrollY <= 100 && width >= 1280) || (window.scrollY <= 56 && width < 1280)){
      if (navEl.classList.contains('navbar-scrolled')) {
        navEl.classList.remove('navbar-scrolled');
      } else {
        navEl.classList.add('navbar-scrolled');
      }
    }
  });
  document.getElementById('user-toggler').addEventListener('click', function(){
    let width = window.innerWidth;
    if ((window.scrollY <= 100 && width >= 1280) || (window.scrollY <= 56 && width < 1280)){
      if (navEl.classList.contains('navbar-scrolled')) {
        navEl.classList.remove('navbar-scrolled');
      } else {
        navEl.classList.add('navbar-scrolled');
      }
    }
  });
  
  window.addEventListener('scroll', () => {
    let width = window.innerWidth;
    let collapsibleNavbar = document.getElementById('collapsibleNavbar');
    let user = document.getElementById('user');
    if ((window.scrollY >= 100 && width >= 1280) || (window.scrollY >= 56 && width < 1280)) {
      navEl.classList.add('navbar-scrolled');
    } else {
      if(!user.classList.contains('show')&&!collapsibleNavbar.classList.contains('show')) {
      navEl.classList.remove('navbar-scrolled');
    }
  }
  });
  });

window.addEventListener('scroll', function() {
    let parallaxHeader = document.querySelector('.parallax-header');
    let cloud_left=this.document.querySelector('.cloud-left');
    let cloud_right=this.document.querySelector('.cloud-right');
    let scrolled = window.scrollY;
    parallaxHeader.style.top = scrolled * 0.5 + 'px';
    cloud_left.style.left = -1 * scrolled * 2 + 'px';
    cloud_left.style.transform= 'translateY('+scrolled * 0.5 + 'px)';
    cloud_right.style.right = -1 * scrolled * 2 + 'px';
    cloud_right.style.transform = 'translateY(' + scrolled * 0.5 + 'px) scaleX(-1)';
});

let elToShow = document.querySelectorAll('.show-on-scroll')

let isElInViewPort = (el) => {
	let rect = el.getBoundingClientRect()
	// some browsers support innerHeight, others support documentElement.clientHeight
	let viewHeight = window.innerHeight || document.documentElement.clientHeight

	return (
		(rect.top <= 0 && rect.bottom >= 0) ||
		(rect.bottom >= viewHeight && rect.top <= viewHeight) ||
		(rect.top >= 0 && rect.bottom <= viewHeight)
	)
}

function loop() {
	elToShow.forEach((item) => {
		if (isElInViewPort(item)) {
			item.classList.add('start')
		} else {
			item.classList.remove('start')
		}
	})
}

window.onscroll = loop

loop()