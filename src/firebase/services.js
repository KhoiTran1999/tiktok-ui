import firebase, { db } from './config';

export const addDocument = (collection, data) => {
    const query = db.collection(collection);
    query.add({
        ...data,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

export async function deleteDocument(collection, docId) {
    const res = await db.collection(collection).doc(docId).delete();
}

export async function updataDocument(collection, docId, field) {
    const collectionRef = db.collection(collection).doc(docId);
    // const res = await collectionRef.update(field);
    const res = await collectionRef.get().then((snapShot) => {
        if (snapShot.exists) {
            collectionRef.update(field);
        } else {
            return true;
        }
    });
    return res;
}
