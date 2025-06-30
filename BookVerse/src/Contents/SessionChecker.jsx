import { useEffect } from "react";
function SessionChecker(){



  useEffect(() => {
    
    const isSignedIn = localStorage.getItem("isLoggedIn") === "true";
    const sessionActive = sessionStorage.getItem("activeSession") === "true";

    if (isSignedIn && !sessionActive) {
      // Session expired (browser closed)

      localStorage.setItem("isLoggedIn", "false");
    }

    // Set session marker
    sessionStorage.setItem("activeSession", "true");
  }, []);

  return null; // no UI



}

export default SessionChecker