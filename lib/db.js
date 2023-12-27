import { MongoClient} from "mongodb"

export async function connectToDatabase(){
    
   const client = await MongoClient.connect('mongodb+srv://akhileshyadav870765:akhi40009@cluster0.xx92lft.mongodb.net/?retryWrites=true&w=majority');

   return client;
}