// شاشة التحميل
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loading-screen").classList.add("hidden");
        document.getElementById("main-content").classList.remove("hidden");
    }, 1500);
});

// التنقل بين الصفحات
function showSection(id) {
    document.querySelectorAll(".page-section").forEach(s => s.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

// تحميل ملف Driver Booster
function downloadFile() {
    const content = "رابط تحميل Driver Booster: https://example.com/driverbooster";
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "DriverBooster.txt";
    link.click();
}

// وضع ليلي/نهاري
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    if (document.body.classList.contains("light-theme")) {
        document.body.style.background = "#fff";
        document.body.style.color = "#000";
        themeIcon.src = "https://img.icons8.com/fluency-systems-regular/24/sun.png";
    } else {
        document.body.style.background = "#0d0d0d";
        document.body.style.color = "#fff";
        themeIcon.src = "https://img.icons8.com/fluency-systems-regular/24/moon.png";
    }
});

// لغة عربية/إنجليزية
const langToggle = document.getElementById("lang-toggle");
langToggle.addEventListener("click", () => {
    if (langToggle.textContent === "EN") {
        langToggle.textContent = "AR";
        document.getElementById("loading-text").textContent = "Loading data...";
        document.getElementById("site-title").textContent = "Welcome to Night Tools";
        document.getElementById("nav-home").textContent = "Home";
        document.getElementById("nav-tools").textContent = "Tools";
        document.getElementById("nav-activation").textContent = "Activation";
        document.getElementById("nav-about").textContent = "About";
        document.getElementById("home-title").textContent = "Home Page";
        document.getElementById("home-desc").textContent = "Welcome! Choose from the menu.";
        document.getElementById("tools-title").textContent = "Tools and Software";
        document.getElementById("tools-desc").textContent = "Here you will find useful tools.";
        document.getElementById("activation-title").textContent = "Software Activation";
        document.getElementById("driver-desc").textContent = "A program to easily update drivers.";
        document.getElementById("btn-download").textContent = "Get";
        document.getElementById("about-title").textContent = "About the Developer and Website";
        document.getElementById("about-dev").textContent = "A web and app developer offering great tools.";
        document.getElementById("about-site").textContent = "Night Tools provides free professional tools.";
    } else {
        location.reload();
    }
});
