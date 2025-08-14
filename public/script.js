// شاشة التحميل
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none";
  }, 1500);
});

// التنقل بين الصفحات
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(btn.dataset.page).classList.add("active");
  });
});

// الوضع الليلي/النهاري
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
let theme = localStorage.getItem("theme") || "dark";
setTheme(theme);

themeToggle.addEventListener("click", () => {
  theme = theme === "light" ? "dark" : "light";
  setTheme(theme);
  localStorage.setItem("theme", theme);
});

function setTheme(mode) {
  document.body.style.background = mode === "light"
    ? "linear-gradient(120deg, #f0f0f0, #dcdcdc)"
    : "linear-gradient(120deg, #0f0c29, #302b63, #24243e)";
  themeIcon.src = mode === "light"
    ? "https://img.icons8.com/fluency-systems-regular/24/sun.png"
    : "https://img.icons8.com/fluency-systems-regular/24/moon.png";
}

// تغيير اللغة
const langToggle = document.getElementById("lang-toggle");
let lang = localStorage.getItem("lang") || "en";
setLang(lang);

langToggle.addEventListener("click", () => {
  lang = lang === "en" ? "ar" : "en";
  setLang(lang);
  localStorage.setItem("lang", lang);
});

function setLang(l) {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = el.getAttribute(`data-${l}`);
  });
  document.body.dir = l === "ar" ? "rtl" : "ltr";
}

// زر تحميل Driver Booster
document.querySelector(".download-btn").addEventListener("click", () => {
  const blob = new Blob(["Driver Booster Activation Key: XXXX-XXXX"], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "driver_booster.txt";
  link.click();
});

// زر الرجوع للأعلى
const scrollTopBtn = document.getElementById("scroll-top");
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
});
scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
