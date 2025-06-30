import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { useRef } from 'react';
import { Overlay, Popover, Button, Form } from 'react-bootstrap';

function SignUp(){
    const navigate  = useNavigate()
    const [name,SetName] = useState('');
    const [pass,SetPass] = useState('');
    const [email,SetEmail] = useState('');
    const [showError, setShowError] = useState(false);
    const passwordRef = useRef(null);
    const emailRef = useRef(null);
    const nameRef = useRef(null);
    const [target, setTarget] = useState(null);
    const [error,err] = useState('')


    // password Validator   
function validatePassword(password) {
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#\$%\^\&*\)\(+=._-]/.test(password);

        if (password.length < minLength) {
            return "Password must be at least 8 characters long.";
        }
        if (!hasUppercase) {
            return "Password must include at least one uppercase letter.";
        }
        if (!hasLowercase) {
            return "Password must include at least one lowercase letter.";
        }
        if (!hasNumber) {
            return "Password must include at least one number.";
        }
        if (!hasSpecialChar) {
            return "Password must include at least one special character.";
        }

        return "Valid";
}


//Email Validator
 function ValidateEmail(mail) 
    {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
        return (true)
    }
        
        return (false)
    }





    async function toSignIn(){    
        if(name && name.trim()!==''){
            if(ValidateEmail(email)){
                if(validatePassword(pass)==='Valid'){
             try{
                const res = await axios.post('http://localhost:3000/SignUp', { Name: name ,
                    password:pass,
                    email:email
                })
                    setShowError(false)

                    navigate('/SignIn'); 
                }catch(error){
                    setTarget(emailRef)
                    err('User Already Exist')
                        setShowError(true)

                        setTimeout(() => {
                            setShowError(false);
                        }, 3000); 
                    
                }
                
                }else{
                    setTarget(passwordRef)
                    err(validatePassword(pass))
                    setShowError(true)

                    setTimeout(() => {
                        setShowError(false);
                    }, 3000); 
                }

            }else{
                 setTarget(emailRef)
                    err('Please enter valid email')
                        setShowError(true)

                        setTimeout(() => {
                            setShowError(false);
                        }, 3000); 
                    

            }
            

        }else{
            setTarget(nameRef)
                    err('Please fill this field')
                        setShowError(true)

                        setTimeout(() => {
                            setShowError(false);
                        }, 3000); 
                    

        }
        
       
    }
    return(
         <div className="container bg-transparent  d-flex align-items-center justify-content-center" style={{width:'100vw',height:'100vh'}}>
            <div className="card shadow-md" style={{width:'20rem' ,background:'rgba(0,0,0,0.6)'}}>
            <h1 className="card-header " style={{textAlign:'center',color:'white'}}>Sign Up</h1>
            <div className="card-body ">
                <form id="SingUpForm">
                    <input type="text"  ref={nameRef} className="m-3 p-2 rounded-2"  placeholder="Full Name" style={{backgroundColor:'black', border:'0.1px solid white',outline:'none', color:'white', width:'90%'}} value={name} onChange={(e)=>SetName(e.target.value)} required/>
                    <input type="email" ref = {emailRef} className="m-3 p-2 rounded-2"  placeholder="Email" style={{backgroundColor:'black',  color:'white',border:'0.1px solid white',outline:'none', width:'90%'}} value={email} onChange={(e)=>SetEmail(e.target.value)} required/>
                    <input type="password" ref={passwordRef} className="m-3 p-2 rounded-2"  placeholder="Password" style={{backgroundColor:'black',  color:'white',border:'0.1px solid white',outline:'none', width:'90%'}} value={pass} onChange={(e)=>SetPass(e.target.value)} required/>
                     <Overlay target={target?.current} show={showError} placement="right">
                        {(props) => (
                        <Popover {...props}>
                            <Popover.Body>{error}</Popover.Body>
                        </Popover>
                        )}
                    </Overlay>
                    <button type="button" className="btn m-3" style={{width:'90%',height:'20%',backgroundColor:'#d8b892',color:'black', alignContent:'center'}} onClick={toSignIn}><h3>Sign Up</h3></button>
                </form>
                
            </div>
            </div>

         </div>
        
    )   
}

export default SignUp