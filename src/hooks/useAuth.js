const useAuth = () => {
  const token = localStorage.getItem("adminToken");
  return { isAuthenticated: !!token };
};

export default useAuth;
