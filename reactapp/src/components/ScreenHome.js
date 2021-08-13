import React, {useState, useEffect} from 'react';
import {Input,Button} from 'antd';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';


function ScreenHome(props) {

        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [userName, setUserName] = useState("")

        const [signInEmail, setSignInEmail] = useState("")
        const [signInPassword, setSignInPassword] = useState("")
        const [isConnected, setIsConnected] = useState(false)
        console.log("état isConnected", isConnected)

        const onChangeSignInEmail = (evt) =>{
                console.log("signin email:", evt.target.value)
                setSignInEmail(evt.target.value)
        }

        const onChangeSignInPassword = (evt) =>{
                console.log("signin password:", evt.target.value)
                setSignInPassword(evt.target.value)
        }


        const onChangeEmail = (evt) =>{
                console.log("changement email:", evt.target.value)
                setEmail(evt.target.value)
        }
        const onChangePassword = (evt) =>{
                console.log("changement password:", evt.target.value)
                setPassword(evt.target.value)
                
        }
        const onChangeUserName = (evt) =>{
                console.log("changement username:", evt.target.value)
                setUserName(evt.target.value)
                
        }
        const handleClickSignIn = async () =>{
                console.log("click détecté signin", signInEmail)
                console.log ("click détecté signin", signInPassword)
                const rawResponse = await fetch("/sign-in", {
                        method:'POST',
                        headers: {'Content-Type':'application/x-www-form-urlencoded'},
                        body: `email=${signInEmail}&password=${signInPassword}`
                });
                const response = await rawResponse.json();
                console.log ("résultat du POST signin parsé:", response) 
                const token = response.user.token 
                console.log("récup token signin:", token) 
                if (response.result){
                        props.addToken(token)
                        console.log("test d'exécution setIsConnected depuis signin")
                        setIsConnected(true)         
                }
        }


        const handleClick = async () =>{
                console.log("click détecté", email)
                console.log ("click détecté", password)
                console.log ("click détecté", userName)
                const rawResponse = await fetch("/sign-up", {
                        method: 'POST',
                        headers: {'Content-Type':'application/x-www-form-urlencoded'},
                        body: `email=${email}&password=${password}&username=${userName}`
                });
                const response = await rawResponse.json();
                console.log ("résultat du POST signup parsé:", response) 
                const token = response.user.token 
                console.log("récup token signup:", token)
                if (response.result){
                        props.addToken(token)
                        console.log("test d'exécution setIsConnected depuis signup")
                        setIsConnected(true)         
                }
                
        }
       if(isConnected){
               return(
                       <Redirect to="/screensource" />
               )
       } 

  return (
    <div className="Login-page" >

          {/* SIGN-IN */}

          <div className="Sign">
                  <Input className="Login-input" placeholder="Enter your email" onChange={(evt)=> onChangeSignInEmail(evt)} value={signInEmail}/>
                  <Input.Password className="Login-input" placeholder="password" onChange={(evt)=> onChangeSignInPassword(evt)} value={signInPassword} />
                  <button style={{width:'80px'}} type="primary" onClick={() => handleClickSignIn()} >Sign-in</button>

          </div>

          {/* SIGN-UP */}

          <div className="Sign">
                  <Input className="Login-input" placeholder="Enter your username" onChange={(evt)=>onChangeUserName(evt)} value={userName}/>
                  <Input className="Login-input" placeholder="Enter your email" onChange={(evt)=>onChangeEmail(evt)} value={email}/>
                  <Input.Password className="Login-input" placeholder="password" onChange={(evt)=>onChangePassword(evt)} value={password}/>
                  <button  style={{width:'80px'}} type="primary" onClick={() => handleClick()}>Sign-up</button>

          </div>

      </div>
  );
}
function mapDispatchToProps(dispatch){
        console.log("mapdispatchtopropssignup:", dispatch)
        return {
                addToken : function(token){
                        console.log("addToken fonctionne")
                        console.log("contenu token", token)
                        dispatch ({type:"addToken", token:token})
                }
        }
}




export default connect(null, mapDispatchToProps) (ScreenHome);
