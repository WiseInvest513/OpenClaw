"use client";

import { useEffect, useState } from "react";

type TypingEffectProps = {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterTyping?: number;
  pauseAfterDeleting?: number;
  className?: string;
  gradient?: boolean;
};

export function TypingEffect({
  texts,
  typingSpeed = 120,
  deletingSpeed = 60,
  pauseAfterTyping = 1500,
  pauseAfterDeleting = 500,
  className = "",
  gradient = false,
}: TypingEffectProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const text = texts[phraseIndex] ?? texts[0];

  useEffect(() => {
    if (isPaused) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayed.length < text.length) {
            setDisplayed(text.slice(0, displayed.length + 1));
          } else {
            setIsPaused(true);
            setTimeout(() => {
              setIsDeleting(true);
              setIsPaused(false);
            }, pauseAfterTyping);
          }
        } else {
          if (displayed.length > 0) {
            setDisplayed(text.slice(0, displayed.length - 1));
          } else {
            setIsPaused(true);
            setTimeout(() => {
              setPhraseIndex((prev) => (prev + 1) % texts.length);
              setIsDeleting(false);
              setIsPaused(false);
            }, pauseAfterDeleting);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, isPaused, text, texts, typingSpeed, deletingSpeed, pauseAfterTyping, pauseAfterDeleting]);

  const gradientClass = "bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500";

  return (
    <span className={[gradient ? gradientClass : "", className].filter(Boolean).join(" ")}>
      {displayed}
      <span className={`animate-pulse ${gradient ? "text-amber-500" : ""}`} aria-hidden>|</span>
    </span>
  );
}
