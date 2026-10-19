/**
 * MOHITSINH CHAVDA - PORTFOLIO INTERACTIVITY SCRIPT
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Footer Year
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Mobile Drawer Navigation
  const menuToggle = document.getElementById("menu-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener("click", () => {
      mobileDrawer.classList.toggle("active");
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("active");
      });
    });
  }

  // 3. Dynamic Typewriter Effect
  const titles = [
    "Software Developer",
    "IT Engineering Student (GTU)",
    "Power BI & Data Analytics Intern",
    "Python & Java Builder"
  ];
  
  const typewriter = document.getElementById("typewriter");
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typewriter) return;

    const currentWord = titles[wordIndex];
    if (isDeleting) {
      typewriter.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriter.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 1800; // Pause after word is fully typed
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % titles.length;
      speed = 350; // Pause before typing new word
    }

    setTimeout(typeEffect, speed);
  }
  typeEffect();

  // 4. Navbar Background Blur on Scroll
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.style.borderBottomColor = "rgba(56, 189, 248, 0.2)";
    } else {
      navbar.style.borderBottomColor = "rgba(255, 255, 255, 0.08)";
    }
  });
});

// 5. Copy Email to Clipboard Helper with Toast
function copyEmail(email) {
  navigator.clipboard.writeText(email).then(() => {
    showToast(`Copied ${email} to clipboard!`);
  }).catch(() => {
    showToast("Failed to copy email.");
  });
}

function showToast(message) {
  const toast = document.getElementById("copy-toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3200);
}

// 6. Contact Form Simulation Handler
function handleFormSubmit(e) {
  e.preventDefault();
  const submitBtn = document.getElementById("submit-btn");
  const formToast = document.getElementById("form-toast");
  const form = document.getElementById("contact-form");

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...`;

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fa-regular fa-paper-plane"></i> Send Message`;

    formToast.className = "form-toast success";
    formToast.innerHTML = `<strong>Thank you!</strong> Your message has been sent. Mohitsinh will contact you shortly.`;
    formToast.classList.remove("hidden");

    form.reset();

    setTimeout(() => {
      formToast.classList.add("hidden");
    }, 6000);
  }, 1000);
}