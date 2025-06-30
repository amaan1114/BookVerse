import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import BookSections from './Contents/BookSections'
import NavBar from './Contents/NavBar'
import BookDetails from './Contents/BookDetails';
import Searchsection from './Contents/Searchsection';
import SessionChecker from './Contents/SessionChecker';
import SignUp from './Contents/SignUp';
import SignIn from './Contents/SignIn';
import 'bootstrap-icons/font/bootstrap-icons.css';
import FavSection from './Contents/FavSection';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

function App() {
  // ..
  AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});
return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <NavBar />

        {/* Main content fills available space */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<BookSections />} />
            <Route path="/BookDetails/:id" element={<BookDetails />} />
            <Route path="/search" element={<Searchsection />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/FavSec" element={<FavSection />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer>
          <SessionChecker />
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App
