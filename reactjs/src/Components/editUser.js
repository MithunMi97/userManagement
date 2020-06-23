import React,{useEffect,useState} from 'react';
import { API } from "../config";
import {TextField,Card,Button} from '@material-ui/core';
import MuiPhoneNumber from 'material-ui-phone-number'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import axios from 'axios';

function submitForm(contentType, data, setResponse) {
  axios({
  url: `${API}/update/`+sessionStorage.getItem("id"),
  method: 'PUT',
  data: data,
  headers: {
  'Content-Type': contentType
  }
  }).then((response) => {
  setResponse(response.data);
  }).catch((error) => {
  setResponse("error");
  })
  window.location.reload(false);
 }
 
 const EditUserDatails = ({handleClose,data}) =>{
  const [feed,setFeed ] = useState([])
  const [username, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [url,setUrl] = useState("")
    useEffect(async() => {
    console.log("hi");
    const response=await fetch(`${API}/displaybyid/`+sessionStorage.getItem("id"));
    const data = await response.json();
    setFeed(data);
setName(data[0]["username"]);
setAddress(data[0]["address"]);
setPhone(data[0]["contact"]);
setEmail(data[0]["email"]);
const imgg=await fetch(`${API}/displayimg/`+data[0]["_id"]);
console.log(imgg[0]);
setUrl(imgg)
},[]) 
 

  function uploadWithFormData(){
      const formData = new FormData();
      formData.append("username", username);
      formData.append("photo", url);
      formData.append("address", address);
      formData.append("contact", contact);
      formData.append("email", email);
      submitForm("multipart/form-data", formData, (msg) => console.log(msg));
  }
 


  return(
      <Card className='' style={{margin:'6% auto',padding:'50px 50px',boxShadow:'1px 1px 5px 5px lightgrey',width:'40%'}}>
          <div className='d-flex'>
          <h5 style={{margin:'10px 0 40px 0',fontWeight:'600'}}>Add New User</h5>
          <CloseIcon style={{marginLeft:'auto',position:"relative", top:'13px',right:'4px',cursor:'pointer'}} onClick={handleClose}/>
          </div>
          
          <form className="" noValidate autoComplete="off">
          <div className="d-flex">
          <Card className="d-flex flex-column" style={{width:'250px',border:'1px solid grey' }}>
          {!url ? (
                  <AccountCircleIcon style={{height:"120px",width:'120px',margin:'10px auto'}}/>
                  ) : (
                  <DoneIcon style={{height:"90px",width:'90px',margin:'10px auto',border:'1px solid #28a745',borderRadius:'50%',padding:'20px',background:'#28a745',color:'#FFFFFF'}} />
              )}
              <Button
                variant="contained"
                component="label"
                style={{width:'80%',margin:'0 auto 20px auto'}}
              >
                Upload
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => setUrl(e.target.files[0])}
                  
                />
              </Button>
              </Card>
             <div className="d-flex flex-column ml-5" style={{width:'100%'}}>
             <TextField 
                  label="Name"
                  className="mt-3 mb-2" variant="outlined" 
                  value={username}
                  onChange={(e) => setName(e.target.value)}
              />
              <TextField 
                  label="Address" 
                  className="mt-4" variant="outlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}    
              />
             </div>
              
          </div>
              <div className="d-flex mt-5">
              <MuiPhoneNumber defaultCountry={'in'} onChange={(contact) => setPhone(contact)} value={contact} style={{margin:"20px 10px 0 0", width:"50%"}} />
              <TextField 
                  label="Email"  
                  variant="outlined" 
                  style={{margin:"0 0 0 10px", width:"50%"}}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />  
              </div>
                             
            
          </form>
          <Button variant="contained" color="primary" style={{color:'#FFFFFF',padding:'10px 15px',margin:'40px 0 0 0',width:'100%'}} 
              onClick={uploadWithFormData}
          >
            Save Changes
          </Button>
         
      </Card>
  )
}
export default EditUserDatails;