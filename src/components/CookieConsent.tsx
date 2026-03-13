"use client";

import React, { useState, useEffect, useCallback } from "react";

interface CookieConsentProps {
  textColor?: string;
  acceptBtnBg?: string;
  acceptBtnText?: string;
  borderColor?: string;
  privacyPolicyUrl?: string;
}

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  consentGiven: boolean;
}

// Cookie management functions
const setCookie = (name: string, value: string, days: number): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict${
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? ";Secure"
      : ""
  }`;
};

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (const cookie of ca) {
    if (!cookie) continue;
    let c: string = cookie;
    while (c.startsWith(" ")) c = c.substring(1, c.length);
    if (c.startsWith(nameEQ)) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export default function CookieConsent({
  textColor = "#ffffff",
  acceptBtnBg = "#5aae74",
  acceptBtnText = "#000000",
  borderColor = "#ffffff",
  privacyPolicyUrl = "https://privacy-policy-xi-six.vercel.app/",
}: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    consentGiven: false,
  });

  const loadCookies = useCallback((prefs: CookiePreferences): void => {
    if (prefs.analytics) {
      console.log("Analytics cookies enabled");
    }
    if (prefs.marketing) {
      console.log("Marketing cookies enabled");
    }
  }, []);

  useEffect(() => {
    const consent = getCookie("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    } else {
      try {
        const saved = JSON.parse(consent) as CookiePreferences;
        if (saved.consentGiven && (saved.analytics || saved.marketing)) {
          setPreferences(saved);
          loadCookies(saved);
          setShowBanner(false);
        } else {
          setShowBanner(true);
        }
      } catch (e) {
        console.error("Error parsing cookie consent:", e);
        setShowBanner(true);
      }
    }
  }, [loadCookies]);

  const saveConsent = (prefs: CookiePreferences): void => {
    setCookie("cookie-consent", JSON.stringify(prefs), 365);
  };

  const handleAcceptAll = (): void => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      consentGiven: true,
    };
    setPreferences(allAccepted);
    saveConsent(allAccepted);
    loadCookies(allAccepted);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleRejectAll = (): void => {
    const rejected: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      consentGiven: true,
    };
    setPreferences(rejected);
    saveConsent(rejected);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleSavePreferences = (): void => {
    const updatedPrefs = { ...preferences, consentGiven: true };
    setPreferences(updatedPrefs);
    saveConsent(updatedPrefs);
    loadCookies(updatedPrefs);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handlePreferenceChange = (key: keyof CookiePreferences): void => {
    if (key === "necessary" || key === "consentGiven") return;
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed right-0 bottom-0 left-0 z-50">
        <div
          className="w-full backdrop-blur-lg"
          style={{
            background: "rgba(0, 0, 0, 0.7)",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 -8px 32px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 p-3 md:flex-row md:gap-6 md:p-5 md:py-3">
            <p
              className="text-center text-xs leading-tight md:text-left md:text-sm"
              style={{ color: textColor }}
            >
              We use cookies to enhance your experience. Read our{" "}
              <a
                href={privacyPolicyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Privacy Policy
              </a>{" "}
              for more information.
            </p>

            <div className="flex flex-shrink-0 items-center gap-2 md:gap-3">
              <button
                onClick={() => setShowPreferences(true)}
                className="px-3 py-2 text-xs font-medium whitespace-nowrap transition-all duration-200 hover:bg-white/10 md:px-5 md:text-sm"
                style={{
                  backgroundColor: "transparent",
                  color: textColor,
                  border: `2px solid ${borderColor}`,
                }}
              >
                <span className="hidden md:inline">Settings</span>
                <span className="md:hidden">Settings</span>
              </button>
              <button
                onClick={handleRejectAll}
                className="px-3 py-2 text-xs font-medium whitespace-nowrap transition-all duration-200 hover:bg-white/10 md:px-5 md:text-sm"
                style={{
                  backgroundColor: "transparent",
                  color: textColor,
                  border: `2px solid ${borderColor}`,
                }}
              >
                Reject
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-xs font-medium whitespace-nowrap transition-all duration-200 hover:opacity-90 md:px-6 md:text-sm"
                style={{
                  backgroundColor: acceptBtnBg,
                  color: acceptBtnText,
                }}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Popup */}
      {showPreferences && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowPreferences(false)}
        >
          <div
            className="w-full max-w-md backdrop-blur-lg"
            style={{
              background: "rgba(0, 0, 0, 0.85)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6 p-6">
              <div
                className="flex items-center justify-between border-b pb-4"
                style={{ borderColor: `${textColor}33` }}
              >
                <h2
                  className="text-xl font-semibold"
                  style={{ color: textColor }}
                >
                  Cookie Preferences
                </h2>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-2xl transition-opacity hover:opacity-70"
                  style={{ color: textColor }}
                >
                  ×
                </button>
              </div>

              <div className="space-y-3">
                <CookieToggle
                  title="Necessary Cookies"
                  description="Essential for the website to function properly."
                  checked={preferences.necessary}
                  disabled={true}
                  onChange={() => undefined}
                  textColor={textColor}
                  accentColor={acceptBtnBg}
                />
                <CookieToggle
                  title="Analytics Cookies"
                  description="Help us understand how visitors interact with our website."
                  checked={preferences.analytics}
                  onChange={() => handlePreferenceChange("analytics")}
                  textColor={textColor}
                  accentColor={acceptBtnBg}
                />
                <CookieToggle
                  title="Marketing Cookies"
                  description="Used to track visitors across websites."
                  checked={preferences.marketing}
                  onChange={() => handlePreferenceChange("marketing")}
                  textColor={textColor}
                  accentColor={acceptBtnBg}
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 py-3 text-sm font-medium transition-all duration-200 hover:opacity-90"
                  style={{
                    backgroundColor: acceptBtnBg,
                    color: acceptBtnText,
                  }}
                >
                  Save Preferences
                </button>
                <button
                  onClick={handleRejectAll}
                  className="flex-1 py-3 text-sm font-medium transition-all duration-200 hover:bg-white/10"
                  style={{
                    backgroundColor: "transparent",
                    color: textColor,
                    border: `2px solid ${borderColor}`,
                  }}
                >
                  Reject All
                </button>
              </div>

              <div className="text-center">
                <a
                  href={privacyPolicyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline transition-opacity hover:opacity-70"
                  style={{ color: textColor }}
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface CookieToggleProps {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  textColor: string;
  accentColor: string;
}

function CookieToggle({
  title,
  description,
  checked,
  disabled = false,
  onChange,
  textColor,
  accentColor,
}: CookieToggleProps) {
  return (
    <div
      className="border p-4 transition-all duration-200 hover:bg-white/5"
      style={{ borderColor: `${textColor}33` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3
            className="mb-1 text-base font-medium"
            style={{ color: textColor }}
          >
            {title}
          </h3>
          <p className="text-sm opacity-80" style={{ color: textColor }}>
            {description}
          </p>
        </div>
        <label className="relative inline-flex flex-shrink-0 cursor-pointer items-center">
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            className="peer sr-only"
          />
          <div
            className={`peer h-6 w-11 rounded-full transition-all after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-5 ${
              disabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            style={{
              backgroundColor: checked ? accentColor : "#6b7280",
            }}
          ></div>
        </label>
      </div>
    </div>
  );
}
