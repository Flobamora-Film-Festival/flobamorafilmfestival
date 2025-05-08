// src/hooks/useAuth.js
const useAuth = () => {
  const token = localStorage.getItem("adminToken");
  return { isAuthenticated: !!token };
};

export default useAuth;
