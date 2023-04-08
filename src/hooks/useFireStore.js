import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { toast } from 'react-toastify';

const useFireStore = (collection, condition, orderBy, sort) => {
    const [document, setDocuments] = useState([]);
    useEffect(() => {
        try {
            let collectionRef = db.collection(collection);
            /**
             * condition
             * {
             *   fieldName: 'abc',
             *   operator: '===, >, in,...'
             *   compareValue: 'adc'
             * }
             */
            if (condition) {
                if (!condition.compareValue || !condition.compareValue.length) {
                    setDocuments([]);
                    return;
                }
                collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.compareValue);
            }
            if (orderBy) {
                collectionRef = collectionRef.orderBy(orderBy, sort);
            }

            //Listening Event onChange
            collectionRef.onSnapshot((snapshot) => {
                const documents = snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    };
                });
                setDocuments(documents);
            });
        } catch (error) {
            toast.error('Error when Listening event onChange of FireStore', {
                position: 'top-center',
                autoClose: 2000,
                theme: 'light',
            });
        }
    }, [collection, condition]);

    return document;
};

export default useFireStore;
