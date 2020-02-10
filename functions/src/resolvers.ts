import * as admin from "firebase-admin";
import {ApolloError, ValidationError} from 'apollo-server-cloud-functions';

admin.initializeApp();

const resolverFunctions = {
  User:{
    async notes(user: any) {
      try {
        const userNotes = await admin
          .firestore()
          .collection("notes")
          .where("userId", "==", user.id)
          .get();
          return userNotes.docs.map(note => note.data());
      }
      catch(err){
        throw new ApolloError(err);
      }
    }
  },

  Note: {
      async user(note: any) {
        try{
          const noteAuthor = await admin
          .firestore()
          .doc(`users/${note.userId}`)
          .get();
          return noteAuthor.data();
        }
        catch(err){
          throw new ApolloError(err);
        }
      }
    },

  Query: {
    async notes() {
      const notes = await admin
      .firestore()
      .collection("notes")
      .get();
      return notes.docs.map(note => note.data())
    },
    async user(_: any, args: any){
      try {
        const userObject = await admin
        .firestore()
        .doc(`users/${args.id}`)
        .get()
        console.log(`users/${args.id}`)
        const user = userObject.data();
        return user || new ValidationError("User ID not found")
      }
      catch(err){
        throw new ApolloError(err);
      }
    }
  }
}
  
export default resolverFunctions;
