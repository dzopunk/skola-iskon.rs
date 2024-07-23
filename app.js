/////////////////////
//////programs_module///////////
////////////////////

const module = document.querySelectorAll(".program__section_module");

const openModule = function(){
  module.forEach(function (moduleName) {
    const btn = moduleName.querySelector(".program__section_module-name--btn");
  
    btn.addEventListener("click", function () {
      module.forEach(function (item) {
        if (item !== moduleName) {
          item.classList.remove("show-text");
        }
      });
  
      moduleName.classList.toggle("show-text");
    });
  });
}
openModule();


////////////////
/////BIO////////
///////////////

const teachers = document.querySelectorAll(".teachers__card");
teachers.forEach(function (teacher) {
  const btn = teacher.querySelector(".teachers-btn");

  btn.addEventListener("click", function () {
    teachers.forEach(function (item) {
      if (item !== teacher) {
        item.classList.remove("show");
      }
    });

    teacher.classList.toggle("show");
  });
});


//menu////

const toggleBtn = document.querySelector(".header__navbar-menu");
const closeBtn = document.querySelector(".close-btn");
const sidebar = document.querySelector(".sidebar");

if (toggleBtn) {
  toggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("show-sidebar");
  });
}

if (closeBtn) {
  closeBtn.addEventListener("click", function () {
    sidebar.classList.remove("show-sidebar");
  });
}

document.addEventListener("click", function (e) {
  if( !toggleBtn.contains(e.target)){
    sidebar.classList.remove('show-sidebar')
  }
});

/////////////lazy loading//////

document.addEventListener("DOMContentLoaded", function () {
  const lazyloadImages = document.querySelectorAll(".lazy");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function (image) {
      imageObserver.observe(image);
    });
  } else {
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");

    function lazyload() {
      if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }

      lazyloadThrottleTimeout = setTimeout(function () {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function (img) {
          if (img.offsetTop < window.innerHeight + scrollTop) {
            img.src = img.dataset.src;
            img.classList.remove("lazy");
          }
        });
        if (lazyloadImages.length == 0) {
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
});

////////sticky navbar//////

const landing = document.querySelector(".header__sticky");
const navBar = document.querySelector(".navbar__sticky");
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navBar.classList.add("sticky");
  else navBar.classList.remove("sticky");
};
const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.5,
});
observer.observe(landing);


//////mejl
document.forms.contact.addEventListener("submit", function (e) {

  let data = new FormData(e.target);

  let request = new XMLHttpRequest();
  request.open("POST", "mail.php");
  request.send(data);
  request.onload = () => {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";
    document.getElementById("message").value = "Hvala na interesovanju. Vaša poruka je poslata..";

    const myTimeout = setTimeout(function () {
       document.getElementById("message").value = "";
    }, 4000);
  };
  e.preventDefault();
});