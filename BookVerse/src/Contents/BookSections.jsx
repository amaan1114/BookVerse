import { useState } from "react"
import axios from 'axios'
import { useEffect } from "react";
import Fiction from "../BooksCatogry/Fiction";
import SciFi from "../BooksCatogry/SciFi";
import Drama from "../BooksCatogry/Drama";
import Fantasy from "../BooksCatogry/Fantasy";
import Children from "../BooksCatogry/Children";
function BookSections({genre, title}){
     return (
        <> 
        <Fiction></Fiction>
        <SciFi></SciFi>
        <Drama></Drama>
        <Fantasy></Fantasy>
        <Children></Children>
        </>

  );

}
  export default BookSections