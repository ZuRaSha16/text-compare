export type Lang = "ka" | "en";

export const translations = {
  ka: {
    // Sidebar nav
    spellcheck: "მართლმწერი",
    compare: "ტექსტის შედარება",
    voiceToText: "ხმა → ტექსტი",
    textToVoice: "ტექსტი → ხმა",
    pdf: "PDF კონვერტაცია",

    // App header
    keepFormat: "ფორმატის შენარჩუნება",
    newSession: "ახლის გახსნა",

    // Loading
    converting: "Converting...Thank you for your patience",

    // Compare button
    compare_btn: "შედარება",

    // Stats bar
    comparisonDone: "■ შედარება დასრულდა",
    deleted: "წაიშალა",
    added: "დაემატა",

    // TextPanel
    placeholder: "დაიწყე წერა...",

    // ComingSoon
    comingSoon: "დაემატება მალე",

    // Language options
    georgian: "ქართული",
    english: "English",
  },
  en: {
    // Sidebar nav
    spellcheck: "Spell Check",
    compare: "Text Comparison",
    voiceToText: "Voice → Text",
    textToVoice: "Text → Voice",
    pdf: "PDF Conversion",

    // App header
    keepFormat: "Preserve Formatting",
    newSession: "New Session",

    // Loading
    converting: "Converting... Thank you for your patience",

    // Compare button
    compare_btn: "Compare",

    // Stats bar
    comparisonDone: "■ Comparison Complete",
    deleted: "Deleted",
    added: "Added",

    // TextPanel
    placeholder: "Start typing...",

    // ComingSoon
    comingSoon: "Coming Soon",

    // Language options
    georgian: "ქართული",
    english: "English",
  },
} as const;

export type Translations = {
  [K in keyof typeof translations.ka]: string;
};
