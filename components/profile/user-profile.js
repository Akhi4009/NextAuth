import {getSession, session} from "next-auth/client";

import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import { useEffect, useState } from "react";

function UserProfile() {
  // Redirect away if NOT auth

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
