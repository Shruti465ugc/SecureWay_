import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin(){

const[email,setEmail]=useState("");

const[password,setPassword]=useState("");

const navigate=useNavigate();

const login=async(e)=>{

e.preventDefault();

const res=await fetch(
"https://safepath-hackhazard-project.onrender.com/api/admin-auth/login",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

email,

password

})

}

);

const data=await res.json();

if(!res.ok){

alert(data.message);

return;

}

localStorage.setItem(
"admin",
JSON.stringify(data.admin)
);

localStorage.setItem(
"adminToken",
data.token
);

navigate("/admin");

};

return(

<div className="auth-container">

<div className="auth-card">

<h2>Admin Login</h2>

<form onSubmit={login}>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button>

Login

</button>

</form>

</div>

</div>

);

}

export default AdminLogin;