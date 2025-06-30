import { useParams } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
function BookDetails(){
   const { id } = useParams(); 
  const [book, setBook] = useState(null);
  let srcimg=null
      const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("📡 Search API called for query:");
    axios.get(`http://localhost:3000/api/book/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.error('Failed to fetch book:', err));

  }, [id]);

   if (!book) {return(
         <div className="container bg-transparent d-flex justify-content-center align-items-center " style={{width:'100vw', height:'100vh', color:'white'}}>
        <ClipLoader
                        color='white'
                        loading={true}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        
                    />
            </div>        
            );}else{
               <div className="container bg-transparent d-flex justify-content-center align-items-center " style={{width:'100vw', height:'100vh', color:'white'}}>
              <ClipLoader
                        color='white'
                        loading={false}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        
                    />
            </div>      

            }

  if(book.thumbnail?.replace('zoom=1', 'zoom=2')){
    srcimg=book.thumbnail?.replace('zoom=1', 'zoom=2')

  }else{
    srcimg=book.thumbnail;
  }
  console.log(srcimg)
  return (
    <div className="container bg-black bg-opacity-50 d-flex  justify-content-center" style={{width:'100vw'}}>
        
  
    <div className="card bg-transparent mt-5" style={{color:'white', width:'100vw', alignItems:'center', border:'none'}}>
        <img className="card-img-top" src={book.thumbnail?.replace('zoom=1', 'zoom=2')} alt={book.title} style={{width:"20%"}}
         onLoad={(e) => {
            
                if(e.target.naturalHeight==391){
                    e.target.src = book.thumbnail
                }
            }}
            
        />    
            <div className="card-body">
                <h5 className="card-title" style={{textAlign:'center'}}>
                    {book.title}
                </h5>
                <p style={{textAlign:'center'}}><strong>Author(s):</strong> {book.authors.join(', ')}</p>

                <p className="card-text" dangerouslySetInnerHTML={{ __html: book.description }}></p>
            </div>

            
    </div>
    </div>
        

  );
}



export default BookDetails