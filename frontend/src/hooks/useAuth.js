import { useUser } from "../context/UserContext";

export const useAuth = () => {
  return useUser();
};
