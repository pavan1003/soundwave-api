import { FieldValue } from "firebase-admin/firestore";
import db from "../config/firebase.js";


const contactCollection = db.collection("contacts");

export async function saveContact(contactData) {
  const newDoc = await contactCollection.add({
    ...contactData,
    createdAt: FieldValue.serverTimestamp(),
  });
  return newDoc.id;
}
