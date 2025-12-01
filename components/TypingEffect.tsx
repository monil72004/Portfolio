
import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  repeat?: boolean;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ 
  text, 
  speed = 50, 
  delay = 0, 
  className = '',
  repeat = true 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeLoop = () => {
      // Determine typing speed
      // If deleting, go faster (speed / 2). If normal typing, use speed.
      let currentSpeed = isDeleting ? speed / 2 : speed;

      if (!isDeleting) {
        // TYPING FORWARD
        setDisplayedText(text.substring(0, index + 1));
        index++;

        if (index === text.length) {
          // Finished typing line
          if (repeat) {
             isDeleting = true;
             currentSpeed = 2000; // Pause at the end for 2 seconds
          } else {
             return; // Stop if no repeat
          }
        }
      } else {
        // DELETING BACKWARD
        setDisplayedText(text.substring(0, index - 1));
        index--;

        if (index === 0) {
          // Finished deleting
          isDeleting = false;
          currentSpeed = 500; // Small pause before typing again
        }
      }

      timeoutId = setTimeout(typeLoop, currentSpeed);
    };

    // Start the loop
    typeLoop();

    return () => clearTimeout(timeoutId);
  }, [text, speed, started, repeat]);

  return (
    <span className={`${className}`}>
      {displayedText}
      <span className="animate-pulse text-cyber-green">_</span>
    </span>
  );
};

export default TypingEffect;
