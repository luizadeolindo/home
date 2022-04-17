import { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import apiClient from "../../services/api-client";

type ContextType = { isAuthenticated: boolean | null };

export const VerifyAuth: React.FC = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkIfUserIsAuthenticated = async () => {
      if (localStorage.getItem("access_token")) {
        try {
          const url = `/videos/favoritos`;
          await apiClient.get(url);
          setAuthenticated(true);
        } catch (error) {
          setAuthenticated(false);
        }
      } else {
        setAuthenticated(false);
      }
    };

    checkIfUserIsAuthenticated();
  }, []);

  return <Outlet context={{ isAuthenticated }} />;
};

export function useAuthenticated() {
  return useOutletContext<ContextType>();
}
