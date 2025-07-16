import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RedirectPage = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('shortenedURLs')) || [];
    const match = saved.find(entry => entry.shortcode === shortcode);
    if (match) {
      window.location.href = match.original;
    } else {
      alert('Invalid or expired shortcode.');
    }
  }, [shortcode]);

  return <p>Redirecting...</p>;
};

export default RedirectPage;
