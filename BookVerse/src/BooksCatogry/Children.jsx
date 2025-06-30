import { useState } from "react"
import axios from 'axios'
import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from "react-router-dom";


function Children({genre, title}){
    const [books, setBooks] = useState([]);
    
    
   let Genre = "Children"
const navigate = useNavigate()

const [favlist,setFavList]=useState([]);


const sendFav =  localStorage.getItem('email');
    var isLoggedIn = localStorage.getItem('isLoggedIn');


   //Favrouit Book 
 async function fav(favTitle) {
  console.log('clicked');

  if (isLoggedIn !== 'true') {
    navigate('/SignIn');
    return;
  }

  try {
    // 🔁 Toggle favorite first
    
    await axios.post('https://bookverse-y7oz.onrender.com/favS', {
      mail: sendFav.toLowerCase(),
      favid: favTitle
    });

    // 🔁 Then fetch updated list
    const res = await axios.get('https://bookverse-y7oz.onrender.com/favS', {
      params: { emailG: sendFav.toLowerCase() }
    });

        
    const updatedFavList = res.data.favList;
    setFavList(updatedFavList); // This schedules the state update

   

  } catch (err) {
    console.error('Error toggling or fetching favorites:', err);
  }
}




useEffect(() => {
  if(isLoggedIn==='true'){
    getfav();
  }else{
    setFavList([])
  }
   // 🔁 Called only once when the component loads
}, []);



useEffect(() => {
  if(isLoggedIn==='true'){
    getfav();
  }else{
    setFavList([])
  }
   // 🔁 Called only once when the component loads
}, [isLoggedIn]);


//getting fav book
async function getfav() {
   const res = await axios.get('https://bookverse-y7oz.onrender.com/favS', {
      params: { emailG: sendFav.toLowerCase() }
    });

        
    const updatedFavList = res.data.favList;
    setFavList(updatedFavList); // This schedules the state update

    
}




  

    useEffect(()=>{
        axios.get(`https://bookverse-y7oz.onrender.com/api/search?q=${Genre}&maxResults=20`)
        .then(res=>setBooks(res.data))
        .catch(err=>console.error(err));

    },[Genre])


    


    //Detail of book

    function toDetail(title){
       navigate(`/BookDetails/${title}`);
    }







    //Book
     return (
 <>
     
     <div className="container bg-transparent rounded-top-3 mt-5" style={{color:"white"}}>
        <h1>👶 Children</h1>
     </div>
  <div
    style={{
      display: 'flex',
      gap: '1rem',
      padding: '1rem',
      overflowX: 'auto',
      minHeight: '100%',
      color:"white",
      scrollBehavior:'smooth',
      scrollbarWidth:'none',
      msOverflowStyle:'none'
      
    }}
    className="container bg-black bg-opacity-50"
    
  >
  

    {books.map((book) => (
      <Card style={{ width: '10rem', flex: '0 0 auto'}}  key={book.id} data-aos="zoom-in-right" >
        <Card.Img
        
          variant="top"
          src={book.thumbnail||"/fallback.png"}
          alt={book.title}
          style={{ height: '10rem', objectFit: 'cover' ,cursor:'pointer'}}
          onClick={()=>toDetail(book.id)}
          
        />
        <Card.Body onClick={()=>toDetail(book.id)} style={{cursor:'pointer'}}>
          <Card.Title style={{ fontSize: '1rem' }}>{book.title}</Card.Title>
          <Card.Text style={{ fontSize: '0.75rem' }}>
            {book.description?.substring(0, 50)}...
            <br />
            <strong>{book.authors.join(', ')}</strong>
          </Card.Text>
        </Card.Body>
         <Card.Footer style={{cursor:'pointer'}}>
          <p style={{fontSize:'0.7rem'}}>Ratings: <strong>{book.rating}</strong></p>
          <p style={{fontSize:'0.7rem'}}>Rating count: <strong>{book.ratingCount}</strong></p>
          
          <i 
            className={`bi ${favlist.includes(book.id) ? 'bi-heart-fill' : 'bi-heart'} book`}
          id={book.id} onClick={()=>fav(book.id)} style={{cursor:'pointer'}} ></i>


        </Card.Footer>
      </Card>

    ))}
  </div>

</>

  );

}
  export default Children