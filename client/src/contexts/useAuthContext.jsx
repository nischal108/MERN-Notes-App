import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/user/loggedInUserInfo`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
  
          if (!data.error) {
            setUserName(data.fullName);
            setIsAuthenticated(true);
          } else {
            setUserName(null);
            setIsAuthenticated(false);
          }
        } else {
          setUserName(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        setUserName(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ userName, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
