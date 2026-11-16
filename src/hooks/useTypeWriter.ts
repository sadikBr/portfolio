import { useEffect, useState } from "react";

type Options = {
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
};

/**
 * Types each word, pauses, deletes it, then moves to the next one.
 * Respects prefers-reduced-motion by showing the first word statically.
 */
export default function useTypeWriter(
  words: readonly string[],
  { typeSpeed = 80, deleteSpeed = 40, pause = 1600 }: Options = {},
) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || words.length === 0) return;

    const word = words[wordIndex % words.length];
    let delay = deleting ? deleteSpeed : typeSpeed;

    if (!deleting && text === word) delay = pause;

    const timeout = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pause, reducedMotion]);

  return { typedText: reducedMotion ? (words[0] ?? "") : text };
}
