import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRef } from 'react';
import { Overlay, Popover, Button, Form } from 'react-bootstrap';

function SignIn(){
    const [pass, SetPass] = useState()
    const [mail,SetMail] = useState()
    const navigate = useNavigate()
    const [showError, setShowError] = useState(false);
    const passwordRef = useRef(null);
    const emailRef = useRef(null);
    const nameRef = useRef(null);
    const [target, setTarget] = useState(null);
    const [error,err] = useState('')

//Email Validator
 function ValidateEmail(mail) 
    {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
        return (true)
    }
        
        return (false)
    }



    async function SignIn(){
        if(ValidateEmail(mail)){
             try{
            const res = await axios.post('https://bookverse-y7oz.onrender.com/SignIn',{
            emailS:mail,
            passwordS:pass
            })
                localStorage.setItem('email',mail.toLowerCase().trim())
                localStorage.setItem('isLoggedIn', 'true');
                setShowError(false);
                navigate('/')
                console.log("Success")

                }catch(error)
                {
                     setTarget(passwordRef)
                        setShowError(true)

                        setTimeout(() => {
                            setShowError(false);
                        }, 3000); 
                    err('Password or Email is Incorrect')
                }
        

        }else{
             setTarget(emailRef)
                    err('Enter valid email')
                        setShowError(true)

                        setTimeout(() => {
                            setShowError(false);
                        }, 3000); 


        }

       


    }
    return(
         <div className="container bg-transparent  d-flex align-items-center justify-content-center" style={{width:'100vw',height:'100vh'}}>
            <div className="card shadow-md" style={{width:'20rem' ,background:'rgba(0,0,0,0.6)'}}>
            <h1 className="card-header " ref={passwordRef} style={{textAlign:'center',color:'white'}}>Sign In</h1>
            <div className="card-body " >
                <form action="">
                    <input type="emai" ref={emailRef} className="m-3 p-2 rounded-2" placeholder="Email" style={{backgroundColor:'black',  color:'white',border:'0.1px solid white',outline:'none', width:'90%'}} value={mail} onChange={(e)=>SetMail(e.target.value)} required/>
                    <input type="password"  className="m-3 p-2 rounded-2" placeholder="Password" style={{backgroundColor:'black',  color:'white',border:'0.1px solid white',outline:'none', width:'90%'}} value={pass} onChange={(e)=>SetPass(e.target.value)} required/>
                    <Overlay target={target?.current} show={showError} placement="top">
                                            {(props) => (
                                            <Popover {...props}>
                                                <Popover.Body>{error}</Popover.Body>
                                            </Popover>
                                            )}
                                </Overlay>
                    <button type="button" className="btn m-3" style={{width:'90%',height:'20%',backgroundColor:'#d8b892',color:'black', alignContent:'center'}} onClick={SignIn}><h3>Sign In</h3></button>
                </form>
                 
            </div>
            </div>

         </div>
    )
}
export default SignIn
