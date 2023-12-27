import NextAuth from "next-auth";
import  Provider  from "next-auth/providers";
import {connectToDatabase} from "../../../lib/db"
import { verifyPassword } from "../../../lib/auth";

export default NextAuth({

    session:{
        jwt:true
    },
    providers:[
        Provider.Credentials({
        async  authorize(credentials){
          const client = await  connectToDatabase();

          const userCollection = client.db().collection('users');

        const user = await  userCollection.findOne({email:credentials.email});
        // console.log(user);

        if(!user){
            client.close();
            throw new Error('No User found!');
        }
//   console.log(credentials)
        const isValid = await verifyPassword(credentials.password, user.password);
       

        if(!isValid){
            client.close();
            throw new Error ('Could not log you in!')
        }
        client.close();
       
        return {email:user.email};
          
          }
        })
    ]
    
});