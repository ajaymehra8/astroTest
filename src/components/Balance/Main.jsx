"use client";
import { useEffect, useState } from "react";
import Balance from "@/components/Balance/Balance";
import LoginModal from "@/components/Login/LoginModal"; 
import { useAuth } from "@/hooks/useAuth"; 

function Main() {
  const { isLoggedIn, loading } = useAuth(); 
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      setShowModal(true);
    }
  }, [loading, isLoggedIn]);

  if (loading) return null; 

  return (
    <>

      {isLoggedIn ? (
        <Balance />
      ) : (
        showModal && <LoginModal />
      )}
    </>
  );
}

export default Main;