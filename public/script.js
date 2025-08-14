// إظهار المحتوى بعد التحميل
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loading-screen").classList.add("hidden");
        document.getElementById("main-content").classList.remove("hidden");
    }, 2000); // 2 ثانية لعرض التحميل
});

// تبديل الصفحات
function showSection(sectionId) {
    document.querySelectorAll(".page-section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(sectionId).classList.remove("hidden");
}

// تحميل ملف Driver Booster بصيغة txt
function downloadFile() {
    const content = "رابط تحميل Driver Booster: https://example.com/driverbooster";
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "DriverBooster.txt";
    link.click();
}
