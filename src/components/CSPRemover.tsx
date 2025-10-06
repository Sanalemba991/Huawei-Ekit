'use client';

import { useEffect } from 'react';

export default function CSPRemover() {
  useEffect(() => {
    // Remove all CSP headers and meta tags on client side
    const removeCSP = () => {
      // Remove CSP meta tags
      const cspMetas = document.querySelectorAll('meta[http-equiv*="Content-Security-Policy"], meta[http-equiv*="CSP"]');
      cspMetas.forEach(meta => meta.remove());
      
      // Clear CSP from document head if present
      const head = document.head;
      if (head) {
        const allMetas = head.querySelectorAll('meta');
        allMetas.forEach(meta => {
          const httpEquiv = meta.getAttribute('http-equiv');
          if (httpEquiv && httpEquiv.toLowerCase().includes('content-security-policy')) {
            meta.remove();
          }
        });
      }
      
      console.log('CSP removal script executed');
    };

    // Run immediately
    removeCSP();
    
    // Run again after a short delay to catch any dynamically added CSP
    setTimeout(removeCSP, 100);
    setTimeout(removeCSP, 500);
    setTimeout(removeCSP, 1000);
    
  }, []);

  return null;
}