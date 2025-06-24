// Make the text move
var typed = new Typed(".text", {
  strings: ["Lập trình viên Backend", "Sinh Viên", "Lập trình viên Web"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

// The shooting star effect only starts running when scrolling
// to the banner section, and turns off when exiting that area.
document.addEventListener("DOMContentLoaded", () => {
  const bannerSection = document.querySelector("#home");
  const stars = document.querySelectorAll(".shooting-star");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          stars.forEach((star) => star.classList.add("active"));
        } else {
          stars.forEach((star) => star.classList.remove("active"));
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  if (bannerSection) {
    observer.observe(bannerSection);
  }
});

new Swiper(".card-wrapper", {
  loop: true,
  spaceBetween: 30,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  // Pagination bullets
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // Responsive breakpoints
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

