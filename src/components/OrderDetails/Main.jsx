"use client"
import OrderHistory from "@/components/OrderDetails/OrderDetails";
import LoginModal from "@/components/Login/LoginModal"; 
import { useAuth } from "@/hooks/useAuth"; 
import { useEffect, useState } from "react";


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
    <OrderHistory/>
  ) : (
    showModal && <LoginModal />
          )}
    </>
  )
}

export default Main;