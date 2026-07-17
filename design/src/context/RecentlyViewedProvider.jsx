import {
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";

import { RecentlyViewedContext } from "./RecentlyViewedContext";
import { AuthContext } from "./AuthContext";

function RecentlyViewedProvider({ children }) {
  const { user } = useContext(AuthContext);

  const storageKey = user
    ? `recent_${user.email}`
    : null;

  const [recent, setRecent] = useState(() => {
    if (!storageKey) return [];

    return (
      JSON.parse(
        localStorage.getItem(storageKey)
      ) || []
    );
  });

  useEffect(() => {
    if (!storageKey) return;

    localStorage.setItem(
      storageKey,
      JSON.stringify(recent)
    );
  }, [recent, storageKey]);

  const addToRecent = useCallback((product) => {
    setRecent((prev) => {
      const filtered = prev.filter(
        (item) => item.id !== product.id
      );

      return [product, ...filtered].slice(0, 8);
    });
  }, []);

  return (
    <RecentlyViewedContext.Provider
      value={{
        recent,
        addToRecent,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export default RecentlyViewedProvider;