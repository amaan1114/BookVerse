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

  return (
    <div className="container-fluid bg-dark mt-5">
      <div className="row justify-content-center">
    <div className="col-12" style={{color:'white'}}>
      <h1 className="text-center">BookVerse</h1>
    </div>
    <div className="col-12" style={{color:'white'}}>
      <p className="text-center">A place for readers</p>
    </div>

    </div>
    </div>
  )



}

export default SessionChecker