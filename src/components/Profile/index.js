"use client";
import LoginModal from "@/components/Login/LoginModal";
import AstrologerProfile from "@/components/Profile/AstrologerProfile"
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

function Profile() {
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
        <AstrologerProfile/>):(
                showModal && <LoginModal />
              )}
        </>
    )
}

export default Profile;