const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 3000;
const cors = require('cors')
const axios = require('axios')
const encrypt = require('mongoose-encryption')
require('dotenv').config();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err))

const apiKey = process.env.BOOK_API;
//DataBase Model
const tryschema = new mongoose.Schema({
    name: String,
    Fav:[String],
    email:String,
    pass:String

})


 const secret = "thisislittlesecret"
tryschema.plugin(encrypt,{secret:secret,
    encryptedFields:["pass"]
})



const Person = mongoose.model('Person', tryschema);



 //SignIn Post Request
app.post('/SignIn',async(req,res)=>{
 const {emailS,passwordS} = req.body
 const user = await Person.findOne({email:emailS.toLowerCase().trim()}); 
 if(!user){res.status(404).json({ message: 'User not found' })
  console.log('not success') 
}else if(passwordS!=user.pass){
console.log('not success')
    res.status(401).json({ message: 'Incorrect Password' })

 }else{
  console.log('Success')
  res.status(200).json({ message: 'Succesfull' })
 }
})



//SignUp Post Request
 app.post('/SignUp',async(req,res)=>{
  name1 = req.body.Name
  email = req.body.email.toLowerCase().trim();
  password = req.body.password
  const user = await Person.findOne({email:email}); 

  
  if(!user){
        try{
      p = new Person({name:name1,
        pass:password,
        email:email,
      })
      await p.save()

    console.log('Successfull') 
    res.status(200).json({ message: 'Signup successful' })
    }catch(error){
      console.log('Not Successful')
      res.status(500).json({ message: 'Signup not successful' })
    }

  }else{
    res.status(401).json({message:'User Already Exist'})
  }

 
 })





 //Favorite Book addition
 app.post('/favS', async(req,res)=>{
  email = req.body.mail
  favId = req.body.favid
  
  const user = await Person.findOne({email:email});
  const favitem = await Person.findOne({ email: email, Fav: favId });
  if(user && !favitem ){
    await Person.updateOne({email},{$push:{Fav:favId}});
    res.send(200)
    
  }else if(user && favitem){
    await Person.updateOne({email},{$pull:{Fav:favId}});
   res.send(200)
   

  }


 })



 //Returnning fav book arrays.
app.get('/favS',async(req,res)=>{

  email = req.query.emailG

  if(email){
      const user = await Person.findOne({ email });

    return res.status(200).json({favList:user.Fav})
  }



})

 //Book Section 
app.get('/api/search', async(req, res) => {
  const {q='fiction',startIndex=0, maxResults=7} = req.query;

  try{
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params:{
            q,
            startIndex,
            maxResults,
            key:apiKey 
        }
    });
    const books=(response.data.items ||[]).map(item=>({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || ['Unknown'],
      description: item.volumeInfo.description || '',
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
      rating: item.volumeInfo?.averageRating != null ? item.volumeInfo.averageRating + '/5' : 'No rating',
      ratingCount:item.volumeInfo?.ratingsCount?? '0'
    }))
    res.json(books)
  }catch(err){
    console.error(err);
    res.status(500).json({error:'Failed to fetch books'});
  }
});




//Google Api
app.get('/api/book/:id', async(req, res) => {
  const {id} = req.params;
  

  try{
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`, {
        params:{
            key:apiKey  
        }
    });
    const item = response.data;
    const books={
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || ['Unknown'],
      description: item.volumeInfo.description || '',
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
      rating: item.volumeInfo?.averageRating != null ? item.volumeInfo.averageRating + '/5' : 'No rating',
      ratingCount:item.volumeInfo?.ratingsCount?? '0'
    }
    res.json(books)
  }catch(err){
    console.error(err);
    res.status(500).json({error:'Failed to fetch books'});
  }
});



//Search Request
app.post('/search', async(req, res) => {
  const {q='fiction',startIndex=0,maxResults=30} = req.body;

  try{
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params:{
            q,
            startIndex,
            maxResults,
            key:apiKey 
        }
    });
    const books=(response.data.items ||[]).map(item=>({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || ['Unknown'],
      description: item.volumeInfo.description || '',
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
      rating: item.volumeInfo?.averageRating != null ? item.volumeInfo.averageRating + '/5' : 'No rating',
      ratingCount:item.volumeInfo?.ratingsCount?? '0'

    }))
    res.json(books)
  }catch(err){
    console.error(err);
    res.status(500).json({error:'Failed to fetch books'});
  }
});





//Fav Book Section
app.get('/FavSec', async (req, res) => {
  const email = req.query.emailF;

  try {
    const user = await Person.findOne({ email });

    if (!user || !user.Fav || user.Fav.length === 0) {
      return res.json([]); // Return empty array if no favorites
    }



    // Fetch all books in parallel using their volume IDs
    const bookData = await Promise.all(
      user.Fav.map(async (id) => {
        try {
          const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`
          );

          const item = response.data;

          return {
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || ['Unknown'],
            description: item.volumeInfo.description || '',
            thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
            rating: item.volumeInfo?.averageRating != null ? item.volumeInfo.averageRating + '/5' : 'No rating',
            ratingCount:item.volumeInfo?.ratingsCount?? '0'
          };
        } catch (err) {
          console.warn(`Failed to fetch book with ID ${id}`);
          return null; // Skip this book if fetch fails
        }
      })
    );

    // Filter out any null results (failed fetches)
    const filteredBooks = bookData.filter((book) => book !== null);

    res.json(filteredBooks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});




//Listening
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})