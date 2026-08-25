"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Language, translations, Translations } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = "thinknao-lang";

function detectFromBrowser(): Language {
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("id")) return "id";
  if (lang.startsWith("zh")) return "zh";
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    // 1. Check saved preference
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved && saved in translations) {
      setLanguageState(saved);
      return;
    }

    // 2. Detect from browser language
    const browserLang = detectFromBrowser();
    setLanguageState(browserLang);

    // 3. Refine with IP geolocation (non-blocking, only if no saved pref)
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data: { country_code?: string }) => {
        // Only apply if user still hasn't manually selected
        if (localStorage.getItem(STORAGE_KEY)) return;
        const country = data.country_code ?? "";
        if (country === "ID") {
          setLanguageState("id");
        } else if (["CN", "TW", "HK", "MO"].includes(country)) {
          setLanguageState("zh");
        }
      })
      .catch(() => {
        // Silently fail — browser detection is already applied
      });
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
