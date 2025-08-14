// شاشة التحميل
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none";
  }, 1500);
});

// تغيير الوضع
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const icon = document.getElementById("theme-icon");
  icon.src = document.body.classList.contains("dark")
    ? "https://img.icons8.com/ios-filled/24/sun--v1.png"
    : "https://img.icons8.com/ios-filled/24/moon-symbol.png";
});

// تغيير اللغة
document.getElementById("lang-toggle").addEventListener("click", () => {
  const currentLang = document.documentElement.lang;
  if (currentLang === "ar") {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    document.getElementById("lang-toggle").textContent = "AR";
    document.getElementById("site-title").textContent = "Night Website";
  } else {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
    document.getElementById("lang-toggle").textContent = "EN";
    document.getElementById("site-title").textContent = "موقع Night";
  }
});

// التنقل بين الصفحات
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
document.getElementById("home-btn").onclick = () => showPage("home-section");
document.getElementById("tools-btn").onclick = () => showPage("tools-section");
document.getElementById("about-btn").onclick = () => showPage("about-section");

// تحميل البرنامج كملف TXT
function downloadDriver() {
  const blob = new Blob(["Driver Booster Download Link"], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "DriverBooster.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
