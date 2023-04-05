import firebase, { db } from './config';
import { storage } from './config';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable, uploadString } from 'firebase/storage';

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

export async function updateDocument(collection, docId, field) {
    const collectionRef = db.collection(collection).doc(docId);
    const res = await collectionRef.get().then((snapShot) => {
        if (snapShot.exists) {
            collectionRef.update(field);
        } else {
            return true;
        }
    });
    return res;
}

export const uploadFile = (
    nameFile,
    file,
    setDownloadURL,
    uploadTaskRef,
    setVideoLink = () => {},
    setPercentageLoading = () => {},
    setIsRunning = () => {},
    setIsSuccessedUpload = () => {},
) => {
    const storageRef = ref(storage, nameFile);
    // Listen for state changes, errors, and completion of the upload.
    uploadTaskRef.current = uploadBytesResumable(storageRef, file);
    uploadTaskRef.current.on(
        'state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setPercentageLoading(progress);
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    setIsRunning(true);
                    break;
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    //User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    //User canceled the upload
                    setIsRunning(false);
                    setVideoLink(null);
                    break;
            }
        },
        () => {
            //Upload completed successfully, now we can get the dowload URL
            getDownloadURL(uploadTaskRef.current.snapshot.ref).then((downloadURL) => {
                setDownloadURL(downloadURL);
                setIsRunning(false);
                setVideoLink(null);
                setIsSuccessedUpload(true);
            });
        },
    );
};

export const uploadPoster = (nameFile, file) => {
    const storageRef = ref(storage, nameFile);
    return uploadString(storageRef, file, 'data_url').then((snapShot) => {
        return getDownloadURL(snapShot.ref);
    });
};

export const deleteFileStorage = (fileURL) => {
    const storageDelete = getStorage();
    const storageDeleteRef = ref(storageDelete, fileURL);
    deleteObject(storageDeleteRef)
        .then(() => {
            console.log('File deleted successfully');
        })
        .catch((error) => {
            console.log(error.message);
        });
};
