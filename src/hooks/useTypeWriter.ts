import { useEffect, useState, useMemo } from 'react';

async function sleep(millis: number) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

export default function useTypeWriter(typingSpeed: number) {
  const words = useMemo(() => ['a Developer', 'a Creator', 'Creative', 'a Team Member'], []);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentWord = useMemo(() => words[currentWordIndex], [currentWordIndex, words]);

  const [wordPosition, setWordPosition] = useState(0);
  const displayText = useMemo(() => {
    if (wordPosition === currentWord.length) {
      sleep(500).then(() => {
        setCurrentWordIndex(prev => (prev + 1) % words.length);
        setWordPosition(0);
        return;
      });
    }
    return currentWord.substring(0, wordPosition + 1);
  }, [wordPosition, currentWord, words.length]);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setWordPosition(prev => prev + 1);
    }, typingSpeed);

    return () => {
      clearInterval(intervalID);
    }
  }, [typingSpeed]);

  return {
    typedText: displayText
  }
}
