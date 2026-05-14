/**
 * Ultimate CV Engine - Core Script
 * Version: 1.0.0
 * Description: هذا الملف يدير حالة التطبيق، التحديث اللحظي، وتصدير الـ PDF.
 */

// 1. حالة التطبيق (State Management)
const cvState = {
    personal: { name: "", job: "", email: "", phone: "", summary: "" },
    experience: [], // مصفوفة للخبرات
    skills: [],     // مصفوفة للمهارات
    settings: { themeColor: "#2563eb" }
};

// 2. المكونات الأساسية (Initialization)
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    console.log("CV Engine Initialized...");
});

// 3. تحديث البيانات لحظياً (Live Data Binding)
function initEventListeners() {
    document.getElementById('fullName').addEventListener('input', (e) => {
        cvState.personal.name = e.target.value;
        updatePreview();
    });

    document.getElementById('download-btn').addEventListener('click', exportToPDF);
}

// 4. تحديث لوحة المعاينة (Preview Engine)
function updatePreview() {
    const viewName = document.getElementById('view-name');
    viewName.innerText = cvState.personal.name || "الاسم الكامل";
    
    // هنا سنقوم بإضافة منطق تحديث باقي الحقول ديناميكياً
}

// 5. محرك تصدير الـ PDF (PDF Engine)
async function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const element = document.getElementById('cv-canvas');
    
    // إعدادات احترافية للطباعة
    const canvas = await html2canvas(element, { 
        scale: 2,
        logging: false,
        useCORS: true 
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`CV_${cvState.personal.name || 'Professional'}.pdf`);
}

/**
 * نصيحة للمستقبل: 
 * سنضيف هنا دوال مثل:
 * - addExperienceField() : لإضافة حقول خبرة جديدة
 * - saveToLocalStorage() : لحفظ البيانات
 * - applyTheme() : لتغيير الألوان
 */
