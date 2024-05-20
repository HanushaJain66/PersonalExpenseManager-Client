import React, { useEffect } from 'react'
import "./Addacc.css";
import './profile.css';
import BalanceBar from './BalanceBar';
import './Record.css'
import './RecordForm.css'
import sub from './img/submit.png'
import { useState } from 'react';
import {toast} from "react-toastify"
import axios from 'axios';



const Addacc = () => {

  const [AccountData, setAccountData] = useState({
    accountName: "",
    description: "",
    balance: "",
    AccountType: ""
});


  const[UserData,setUserData]=useState({
    ID: '',
    Name: '',
    Email: '',
    Phone: '',
    Proff: ''
  })

  const [accountNames, setAccountNames] = useState([]);


const handleAccountData=(e)=>{
  setAccountData({ ...AccountData, [e.target.name]: e.target.value });
}


const handleAccount=async()=>{
  try{
    const email=localStorage.getItem("auth");
    const Accountresponse=await axios.post('http://localhost:5000/eco/addacc',{
      email: email,
      accountName: AccountData.accountName,
      description: AccountData.description,
      AccountType: AccountData.AccountType,      
      balance: AccountData.balance
    });

    if(Accountresponse === 200)
      {
        toast.success("Account added successfully");
        // window.location.href("")
      }
     else{
      toast.error("Unknown error accured");
     }

  }
  catch(error){
    console.log(error);
    toast.error(error);

  }
}


useEffect(() => {
  const getUserInfo = async () => {
    try {
      const email = localStorage.getItem('auth');
      const Userresponse = await axios.post('http://localhost:5000/eco/getuser', { email });
      // console.log(Userresponse);
      if (Userresponse.data.success) {
        const { user } = Userresponse.data;
        setUserData({
          ID: user._id,
          Name: user.name,
          Email: user.email,
          Phone: user.phone,
          Proff: user.Profession
        });
      } else {
        toast.error('Please login');
      }
    } catch (error) {
      console.log(error);
      toast.error('Unknown error occurred while fetching user data');
    }
  };

  const fetchAccountNames = async () => {
    try {
      const response = await axios.get('http://localhost:5000/eco/allAccountNames');
      console.log(response.data); // Check the response data structure
      if (response.data.success) {
        setAccountNames(response.data.accountNames);
      } else {
        toast.error('Failed to fetch account names');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error occurred while fetching account names');
    }
  };

  getUserInfo();
  fetchAccountNames();
}, []);




  return (
    <>
      <div id='add-ac-box'>
        <div id='add-ac-title'>Add Account</div>
        <div id='add-ac-form'>
          <>
            <div className='record-form'>
              <input required type='text' name='accountName' className='form-field' placeholder='Account Name' onChange={handleAccountData}></input>
              <input required type='text' name='description' className='form-field' placeholder='Description' onChange={handleAccountData}></input>
              <input required type='text' name='AccountType' className='form-field' placeholder='type' onChange={handleAccountData}></input>
              <input type='text' name='balance' className='form-field' placeholder='balance' onChange={handleAccountData}></input>
              <button className='record-btn' placeholder='Recieved From' value='Submit' onClick={handleAccount}><img width='40px' src={sub}/></button>
            </div>
            {/* <div className='remark' style={{ color: (result === 'Enter proper data') ? 'red' : '#6cc9ff' }}></div> */}
          </>
        </div>
      </div>
      <div id='add-ac-box'>
      <div id='add-ac-title'>Set Default Account</div>
        <div id='add-ac-form'>
          <div className='record-form'>
            <select required name='account' className='form-field'>
              <option className='option' value=''>
                Select an Account
              </option>
              {accountNames.map((name) => (
                <option key={name} value={name} className='option'>
                  {name}
                </option>
              ))}
              </select>
              <button className='record-btn' placeholder='Recieved From' value='Submit'><img width='40px'  /></button>
            </div>
        </div>
      </div>


      <BalanceBar />

      <div id='profile-box'>
        <div id='profile-title'>User Profile</div>
        <div id='user-data'>
          <div className='profile-row'>
            <label htmlFor='id'>User ID:</label>
            <input type='text' id='id' value={UserData.ID} readOnly />
          </div>
          <div className='profile-row'>
            <label htmlFor='name'>User Name:</label>
            <input type='text' id='name' value={UserData.Name} readOnly />
          </div>
          <div className='profile-row'>
            <label htmlFor='email'>Email:</label>
            <input type='text' id='email' value={UserData.Email} readOnly />
          </div>
          <div className='profile-row'>
            <label htmlFor='mobile'>Mobile:</label>
            <input type='text' id='mobile' value={UserData.Phone} readOnly />
          </div>
          <div className='profile-row'>
            <label htmlFor='proff'>Profession:</label>
            <input type='text' id='proff' value={UserData.Proff} readOnly />
          </div>
        </div>
      </div>

    
    </>
  )
}

export default Addacc
