import {getSession, session} from "next-auth/client";

import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import { useEffect, useState } from "react";

function UserProfile() {
  // Redirect away if NOT auth

  async function changePasswordHandler(passwordData){
 const responce = await fetch(`/api/user/change-password`,{
      method:"PATCH",
      body:JSON.stringify(passwordData),
      headers:{
        'Content-Type':"application/json"
      }
    });

    const data = await responce.json()
    console.log(data)

  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm  onChangePassword={changePasswordHandler}/>
    </section>
  );
}

export default UserProfile;
