import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, Navigate, useNavigate  } from 'react-router-dom';
import { useEffect, useState } from "react"


function NavBar(){
  var isLoggedIn = localStorage.getItem('isLoggedIn');
  const [Display,SetDisplay] = useState('inline') 
  const [favDis,SetFavdi] = useState('none') 

  function logout(){
    localStorage.setItem('isLoggedIn', 'false');
    
  }
  useEffect(()=>{
    if(isLoggedIn==='true'){
    SetDisplay('none')
    SetFavdi('inline')

  }else{
    SetDisplay('inline')
    SetFavdi('none')
  }

  },[isLoggedIn])
  
  const [query, setQuery] = useState('');
 const navigate = new useNavigate()
  const handleSubmit = (e) => {
    
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };


 
    return(
    
      
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className=" bg-black bg-opacity-50 mb-3">
          <Container fluid>
            <Navbar.Brand ><Link to={'/'} style={{color:'white',textDecoration:'none'}}>BookVerse</Link></Navbar.Brand>
            <Navbar.Toggle className=' bg-light' aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className='bg-black bg-opacity-50'
            >
              <Offcanvas.Header closeButton>
                 
                <Offcanvas.Title style={{color:'white'}} id={`offcanvasNavbarLabel-expand-${expand}`}>
                 <Link to={'/'} style={{color:'white',textDecoration:'none'}}>BookVerse</Link> 
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Link to={'/'} className='m-3' href="#action1" style={{color:'White', textDecoration:'none'}} ><h4>Home</h4></Link>

                  <Link to={'/SignIn'} className='m-3' href="#action1" style={{color:'White', textDecoration:'none' , display:Display}} ><h4>Sign-in</h4></Link>
                  <Link to={'/Signup'} className='m-3' style={{color:'White',textDecoration:'none',display:Display}} ><h4>Join</h4></Link>
                  <Link to={'/'} className='m-3' style={{color:'White',textDecoration:'none',display:favDis}} onClick={logout}><h4>Sign Out</h4></Link>
                  <Link to={'/FavSec'} className='m-3' style={{color:'White',textDecoration:'none', display:favDis}}><h4>My Favorites</h4></Link>
                </Nav>
                <Form  onSubmit={handleSubmit} className="d-flex FormSubmit">
                  <Form.Control

                    type="text"
                    placeholder="Search"
                    className="me-2 SearchForm"
                    aria-label="Search"
                    value={query}
                    name = "q"
                    onChange={(e) => setQuery(e.target.value)}
                   
                  />
                  <Button variant="outline-success" type='submit'>Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    
      
    </>
    )
}
export default NavBar