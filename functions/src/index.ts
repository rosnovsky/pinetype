import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const getNoteById = functions.https.onRequest(
  async (request, response) => {
    const noteId = request.query?.noteId || "none";
    try {
      const snapshot = await admin
        .firestore()
        .doc(`notes/${noteId}`)
        .get();
      const data = snapshot.data();
      response.set("Access-Control-Allow-Origin", "*");
      if (request.method === "OPTIONS") {
        response.set("Access-Control-Allow-Methods", "GET");
        response.set("Access-Control-Allow-Headers", "Content-Type");
        response.set("Access-Control-Max-Age", "3600");
        response.status(204).send(data);
      } else {
        throw new Error(
          "Request Headers doesn't fit the server response schema",
        );
      }
    } catch (error) {
      console.log(error);
      response.set("Access-Control-Allow-Origin", "*");
      response.status(500).send(error);
    }
  },
);

export const getAllNotes = functions.https.onRequest(
  async (request, response) => {
    try {
      const snapshot = await admin
        .firestore()
        .collection("/notes")
        .get();
      const data = snapshot.docs;
      response.set("Access-Control-Allow-Origin", "*");
      if (request.method === "OPTIONS") {
        response.set("Access-Control-Allow-Methods", "GET");
        response.set("Access-Control-Allow-Headers", "Content-Type");
        response.set("Access-Control-Max-Age", "3600");
        response.status(204).send(data);
      } else {
        throw new Error(
          "Request Headers doesn't fit the server response schema",
        );
      }
    } catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
  },
);
