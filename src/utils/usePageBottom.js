import { useState, useEffect } from 'react';

export default function usePageBottom() {
  const [bottom, setBottom] = useState(false);

  function handleScroll() {
    const isBottom = (window.innerHeight + document.documentElement.scrollTop) === document.documentElement.offsetHeight;
    setBottom(isBottom);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return bottom;
}
