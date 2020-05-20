const aboutToggle = document.getElementById('about-toggle');
const about = document.getElementById('about');
const aboutClose = document.getElementById('about__close');
const footer = document.getElementById('footer');

if (aboutToggle) {
  aboutToggle.onclick = (event) => {
    about.classList.toggle('hidden');
    about.toggleAttribute('aria-hidden');
    if (about.hasAttribute('aria-hidden')) {
      about.setAttribute('aria-hidden', 'true');
    };
  };
  
  aboutClose.onclick = (event) => {
    about.classList.add('hidden');
    about.setAttribute('aria-hidden', 'true');
  };
}

if (footer) {
  console.log(footer);
  
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log(entry);
          entry.target.classList.add('is-active');
        } else {
          entry.target.classList.remove('is-active');
        }
      });
    },
    {
      threshold: .75,
      rootMargin: "0px 0px 0px 0px"
    }
  );
  
  observer.observe(footer);
}