// Language toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const languageToggle = document.querySelector('.language-toggle');
    const enText = languageToggle.querySelector('.en');
    const npText = languageToggle.querySelector('.np');
    
    // Check for saved language preference
    const savedLang = localStorage.getItem('language') || 'en';
    toggleLanguage(savedLang);
    
    languageToggle.addEventListener('click', () => {
        const currentLang = localStorage.getItem('language') || 'en';
        const newLang = currentLang === 'en' ? 'np' : 'en';
        localStorage.setItem('language', newLang);
        toggleLanguage(newLang);
    });
    
    function toggleLanguage(lang) {
        if (lang === 'np') {
            document.querySelectorAll('.en').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.np').forEach(el => el.style.display = 'block');
            enText.style.display = 'none';
            npText.style.display = 'block';
        } else {
            document.querySelectorAll('.en').forEach(el => el.style.display = 'block');
            document.querySelectorAll('.np').forEach(el => el.style.display = 'none');
            enText.style.display = 'block';
            npText.style.display = 'none';
        }
    }
});