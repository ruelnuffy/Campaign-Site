import { useEffect, useState } from 'react';

export default function LanguagePill() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,ig,ha,yo,pcm,fr',
          autoDisplay: false,
        },
        'site-translator',
      );
    };

    if (!document.querySelector('script[data-gt-script]')) {
      const s = document.createElement('script');
      s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      s.async = true;
      s.dataset.gtScript = '1';
      document.head.appendChild(s);
    }
  }, []);

  const handleChange = e => {
    const value = e.target.value;
    setLang(value);
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = value;
      combo.dispatchEvent(new Event('change'));
    }
  };

  return (
    <div className="site-language no-print" aria-label="Translate page">
      <div id="site-translator" />
      <select
        id="site-language-choice"
        aria-label="Choose language"
        value={lang}
        onChange={handleChange}
      >
        <option value="en">English</option>
        <option value="ig">Igbo</option>
        <option value="ha">Hausa</option>
        <option value="yo">Yoruba</option>
        <option value="pcm">Pidgin</option>
        <option value="fr">French</option>
      </select>
    </div>
  );
}
