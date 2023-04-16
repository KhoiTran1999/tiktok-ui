import { Timestamp } from 'firebase/firestore';
import { db } from './config';
import { storage } from './config';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable, uploadString } from 'firebase/storage';

export const addDocument = async (collection, data) => {
    await db.collection(collection).add({
        ...data,
        createdAt: Timestamp.fromDate(new Date()),
    });
};

export async function updateDocument(collection, docId, field) {
    try {
        const collectionRef = db.collection(collection).doc(docId);
        await collectionRef.update(field);
    } catch (error) {
        console.log(error);
    }
}

export async function deleteDocument(collection, docId) {
    const res = await db.collection(collection).doc(docId).delete();
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

export const uploadPoster = async (nameFile, file) => {
    const storageRef = ref(storage, nameFile);
    return uploadString(storageRef, file, 'data_url').then((snapShot) => {
        return getDownloadURL(snapShot.ref);
    });
};

export const deleteFileStorage = (fileURL) => {
    const storageDelete = getStorage();
    const storageDeleteRef = ref(storageDelete, fileURL);
    deleteObject(storageDeleteRef);
};

export const handleFollowService = (userLogin, guest) => {
    if (userLogin.followings.includes(guest.uid)) {
        //remove uid into followings of userLogin
        const newFollowings = userLogin.followings.filter((val) => val !== guest.uid);
        updateDocument('userList', userLogin.id, {
            followings: newFollowings,
        });

        //remove uid into followers of Guest
        const newFollowers = guest.followers.filter((val) => val !== userLogin.uid);
        updateDocument('userList', guest.id, {
            followers: newFollowers,
        });

        //unfollow Noti for Guest
        const newFollowersNoti = [
            ...guest.notification.followers,
            {
                photoURL: userLogin.photoURL,
                nickName: userLogin.nickName,
                status: 'unfollow',
                createdAt: Timestamp.fromDate(new Date()),
            },
        ];
        updateDocument('userList', guest.id, {
            'notification.followers': newFollowersNoti,
            'notification.status': true,
        });
    } else {
        //add uid into followings of userLogin
        updateDocument('userList', userLogin.id, {
            followings: [...userLogin.followings, guest.uid],
        });

        //add uid into followers of Guest
        updateDocument('userList', guest.id, {
            followers: [...guest.followers, userLogin.uid],
        });

        //add Noti for Guest
        const newFollowersNoti = [
            ...guest.notification.followers,
            {
                photoURL: userLogin.photoURL,
                nickName: userLogin.nickName,
                status: 'follow',
                createdAt: Timestamp.fromDate(new Date()),
            },
        ];
        updateDocument('userList', guest.id, {
            'notification.followers': newFollowersNoti,
            'notification.status': true,
        });
    }
};
