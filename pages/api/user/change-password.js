import {getSession} from "next-auth/client"
import {connectToDatabase} from "../../../lib/db"
import {verifyPassword, hashPassword} from "../../../lib/auth"

export default async function handler(req,res){

    if(req.method !== 'PATCH'){
        return
    }

    const session = await getSession({req:req});

    if(!session){
        res.status(401).json({message:'Not authenticated'})
        return
    }

    const userEmail = session.user.email;
    const oldPasword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

   const client = await connectToDatabase()

   const userCollection = client.db().collection('users');

   const user = await userCollection.findOne({email:userEmail});

   if(!user){
    res.status(404).json({message:'User not found'})
    client.close();
    return;
   }

   const currentPassword = user.password;

   const passwordAreEqual = await verifyPassword(oldPasword, currentPassword)

   if(!passwordAreEqual){
    res.status(403).json({message:'Invalid password'});
    client.close()
    return;
   }

   const hashedPassword = await hashPassword(newPassword)

  const result = await userCollection.findOneAndUpdate(
    {email:userEmail},
    {$set:{password:hashedPassword}}
    );

    client.close()

    res.status(200).json({message:"password updated"})
}