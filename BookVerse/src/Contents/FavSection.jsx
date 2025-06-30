import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Card from 'react-bootstrap/esm/Card';
import { ClipLoader } from "react-spinners";
function FavSection(){
    const sendFav =  localStorage.getItem('email');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);
    const [favlist,setFavList]=useState([]);
    const navigate = useNavigate()
    function toDetail(id){
        navigate(`/BookDetails/${id}`)

        
    }

   //Favrouit Book 
 async function fav(favTitle) {
  console.log('clicked');

  
  

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
    getfav(); // 🔁 Called only once when the component loads
  }else{
    setFavList([])
  }
}, []);

//getting fav book
async function getfav() {
   const res = await axios.get('https://bookverse-y7oz.onrender.com/favS', {
      params: { emailG: sendFav.toLowerCase() }
    });

        
    const updatedFavList = res.data.favList;
    setFavList(updatedFavList); // This schedules the state update

    
}




    
    useEffect(()=>{
        axios.get('https://bookverse-y7oz.onrender.com/FavSec',{
            params:{
                emailF:sendFav.toLowerCase()
            }

        }).then((res) => {
                setBooks(res.data);
        }).catch(console.error)
        
        .finally(() => setLoading(false));


    },[favlist])

    if (loading) return(
         <div className="container bg-transparent d-flex justify-content-center align-items-center " style={{width:'100vw', height:'100vh', color:'white'}}>
        <ClipLoader
                        color='white'
                        loading={loading}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        
                    />
            </div>        
    );




    return (

        
         <div className="container bg-black bg-opacity-50" style={{width:'100vw', color:'white'}}>
            <h1>Favorites</h1>

            {books.length===0?(<p>No results Found.</p>):(
                
                    books.map((book)=>(
                        <div key={book.id} className="card m-3 bg-white rounded-5 "   style={{flexDirection:'row', alignItems:'center'}} data-aos="zoom-in-right">
                        <img src={book.thumbnail||"/fallback.png"} className="card-img-top rounded-5" alt="..." style={{width:'20%' ,height:'20%',cursor:'pointer'}} onClick={()=>toDetail(book.id)}/>
                        <div className="card-body" style={{color:'black'}}>
                            <h5 className="card-title" style={{cursor:'pointer'}} onClick={()=>toDetail(book.id)}>{book.title}</h5>
                            <p className="card-text"><strong>Authors: {book.authors.join(', ')}</strong></p>
                            <p className='card-text' dangerouslySetInnerHTML={{ __html:book.description?.substring(0, 100)+'...' }}></p>
                            <p style={{fontSize:'0.7rem'}}>Ratings: <strong>{book.rating}</strong></p>
                            <p style={{fontSize:'0.7rem'}}>Rating count: <strong>{book.ratingCount}</strong></p>
          
                        </div>
                         <div className='card-Header'>
                            <i 
                                className={`bi ${favlist.includes(book.id) ? 'bi-heart-fill' : 'bi-heart'} book m-3`}
                                onClick={()=>fav(book.id)} style={{cursor:'pointer'}}></i>

                        </div>
                        </div>
                    ))
                
            )}
         </div>
        
   
    )
}

export default FavSection