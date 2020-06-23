import { API } from "../config";
import React,{useEffect,useState} from "react";
import { Card, Button,TableBody,TableCell,TableContainer,Paper,TableHead,Table,TableRow, Modal,Backdrop,Popper,Fade} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddUserDatails from './addUser'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EditUserDatails from './editUser'
import axios from 'axios';



const HomePage = () => {
    const [feed,setFeed ] = useState([])
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [placement, setPlacement] = React.useState();
    const [pop, setPop] = React.useState(false);
    const [id, setId] = useState("");
     useEffect(async() => {
      console.log("hi");
      const response=await fetch(`${API}/display/`);
      const data = await response.json();
      setFeed(data);
        console.log(data);
    },[]) 
    

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      window.location.reload(false);

      setOpen(false);
    };
    const handleOpenEdit = () => {
      setOpenEdit(true);
    };
   
    const handleCloseEdit = () => {
      window.location.reload(false);

      setOpenEdit(false);
    };
    const handleClick = (newPlacement,idd) => (event) => {
        setAnchorEl(event.currentTarget);
        setId(idd);
        sessionStorage.setItem('id', idd);
        setPop((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
      };
      const deletee = () => {
        console.log(id);
        axios({
          url: `${API}/remove/`+id,
          method: 'DELETE',
          
          })
          window.location.reload(false);
        
      };
    return(
        <>
            <Card className="shadow">
            <div style={{width:'80%',margin:'3% auto',display:'flex'}}>
                <h3 style={{fontWeight:'600'}}>User Directory</h3>
                <Button variant="contained" color="primary" style={{marginLeft:'auto'}} onClick={handleOpen} className="modal-button"><AddCircleIcon style={{margin:'0 5px 0 0',height:'20px'}} />Add New User</Button>
            </div>
            </Card>
            <Paper style={{width:'80%',margin:'25px auto 25px auto'}} className="shadow">
                <TableContainer className="">
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                            <TableCell>
                             <center> USER NAME</center>
                            </TableCell>
                            <TableCell>
                              ADDRESS
                            </TableCell>
                            <TableCell>
                              CONTACT
                            </TableCell>
                            <TableCell>
                              EMAIL
                            </TableCell>
                            <TableCell>
                              
                            </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {feed.map((data,i) =>{
                                return(
                                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                       

                                        <TableCell>
                                        <img src={`${API}/displayimg/`+data._id} alt=""/>
                                            {data.username}
                                        </TableCell>
                                        <TableCell>
                                            {data.address}
                                        </TableCell>
                                        <TableCell>
                                            {data.contact}
                                        </TableCell>
                                        <TableCell>
                                            {data.email}
                                        </TableCell>
                                        <TableCell>
                                            <MoreHorizIcon style={{cursor:'pointer'}}  onClick={handleClick('bottom-end',data._id)}/>
                                            
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                      </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Modal
              open={open}
              style={{display:'flex',justifyContent:'center',alignItems:'center'}}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                  timeout: 500,
              }}
            >
              <AddUserDatails in={open} handleClose={handleClose}/>
            </Modal>
            <Popper open={pop} anchorEl={anchorEl} placement={placement} transition>
              {({ TransitionProps }) => (
                
                <Fade {...TransitionProps} timeout={350}>
                  <Paper style={{padding:'10px 15px'}}>
                      <p style={{margin:'5px 0',cursor:'pointer'}} onClick={handleOpenEdit}><EditIcon  style={{fontSize:'17px',margin:'0 5px 2px 5px',color:'grey'}}/><span>Edit User Details</span></p>
                      <br/>
                      <p style={{margin:'5px 0',cursor:'pointer'}} onClick={deletee}><DeleteIcon style={{fontSize:'17px',margin:'0 5px 2px 5px',color:'red'}}/><span>Delete User</span></p>
                  </Paper>
                </Fade>
                
              )}
            </Popper>
            <Modal
              open={openEdit}
              style={{display:'flex',justifyContent:'center',alignItems:'center'}}
              onClose={handleCloseEdit}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                  timeout: 500,
              }}
            >
              <EditUserDatails in={open} handleClose={handleCloseEdit}/>
            </Modal>
            
        </>
    )
}

export default HomePage