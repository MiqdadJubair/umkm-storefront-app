// src/context/StoreNameContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase'; // Ensure this path is correct for your project
  
// Create the context
const StoreNameContext = createContext(null);

// Custom hook to consume the context
export const useStoreName = () => {
  const context = useContext(StoreNameContext);
  if (!context) {
    // This check helps ensure the hook is used within the Provider
    throw new Error('useStoreName must be used within a StoreNameProvider');
  }
  return context;
};

// Provider component that fetches and provides the store name
export function StoreNameProvider({ children }) {
  const [storeName, setStoreName] = useState('UMKM'); // Default name if not fetched
  const [loadingStoreName, setLoadingStoreName] = useState(true); // To indicate loading state

  useEffect(() => {
    const fetchStoreName = async () => {
      try {
        const storeDocRef = doc(db, 'storeSettings', 'general'); // Using your confirmed 'general' ID
        const storeDocSnap = await getDoc(storeDocRef);

        if (storeDocSnap.exists()) {
          const fetchedName = storeDocSnap.data().name;
          if (fetchedName && typeof fetchedName === 'string' && fetchedName.trim() !== '') {
            setStoreName(fetchedName.trim());
          } else {
            console.warn("Firestore document 'general' found, but 'name' field is empty or invalid. Using default 'UMKM'.");
          }
        } else {
          console.warn("Firestore document 'general' not found in 'storeSettings' collection. Using default 'UMKM'.");
        }
      } catch (err) {
        console.error("ERROR: Failed to fetch store name from Firestore:", err);
        // Fallback to default on error
      } finally {
        setLoadingStoreName(false); // Finished loading, regardless of success or failure
      }
    };

    fetchStoreName();
  }, []); // Empty dependency array means this runs only once on mount

  return (
    <StoreNameContext.Provider value={{ storeName, loadingStoreName }}>
      {children}
    </StoreNameContext.Provider>
  );
}
