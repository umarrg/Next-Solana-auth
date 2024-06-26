"use client";
import { useEffect, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const withAuth = (Component: ComponentType) => {
  return (props: any) => {
    // const { data: session, status } = useSession();
    const session = localStorage.getItem("sessionToken");

    const router = useRouter();

    useEffect(() => {
      if (!session) router.push("/");
    }, [session, status]);

    if (session) return <Component {...props} />;
    return null;
  };
};

export default withAuth;
