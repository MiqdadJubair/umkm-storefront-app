// src/hooks/usePageTitle.js
import { useEffect } from 'react';
import { useStoreName } from '../context/StoreNameContext.jsx'; // Adjust path as needed

/**
 * Custom hook to set the document title dynamically, including the store name.
 * @param {string} pageSpecificTitle - The title specific to the current page (e.g., "Keranjang", "Detail Produk").
 */
function usePageTitle(pageSpecificTitle) {
  // Get the store name from the global context
  const { storeName } = useStoreName();

  useEffect(() => {
    // Only set the title if storeName is available (meaning it's loaded)
    if (storeName) {
      document.title = `${pageSpecificTitle} - ${storeName} Storefront`;
    }
    // This effect runs whenever pageSpecificTitle or storeName changes
  }, [pageSpecificTitle, storeName]);
}

export default usePageTitle;
