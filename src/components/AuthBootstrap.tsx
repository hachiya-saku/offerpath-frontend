import { useEffect, useRef, type ReactNode } from "react";
import { refreshTokenAPI } from "@/api/auth";
import { getUserProfileAPI } from "@/api/users";
import { clearCredentials, setCredentials } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type AuthBootstrapProps = {
  children: ReactNode;
};

export function AuthBootstrap({ children }: AuthBootstrapProps) {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector((state) => state.auth.isInitialized);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current || isInitialized) return;
    hasStarted.current = true;

    const restoreSession = async () => {
      try {
        const refreshResponse = await refreshTokenAPI();
        const accessToken = refreshResponse.data.accessToken;

        const profileResponse = await getUserProfileAPI(accessToken);

        dispatch(setCredentials({ accessToken, user: profileResponse.data }));
      } catch {
        dispatch(clearCredentials());
      }
    };

    void restoreSession();
  }, [dispatch, isInitialized]);

  if (!isInitialized) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#0c0b0e]">
        <strong className="animate-pulse text-sm text-[#b9a2ed]">
          OfferPath
        </strong>
      </div>
    );
  }

  return children;
}
