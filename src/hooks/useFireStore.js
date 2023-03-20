import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

const useFireStore = (collection, condition) => {
    const [document, setDocuments] = useState([]);
    useEffect(() => {
        let collectionRef = db.collection(collection).orderBy('createdAt');

        /**
         * condition
         * {
         *   fieldName: 'abc',
         *   operator: '===, >, in,...'
         *   compareValue: 'adc'
         * }
         */
        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) return;
            collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.compareValue);
        }

        //Listening Event onChange
        const unsubcribed = collectionRef.onSnapshot((snapshot) => {
            const documents = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setDocuments(documents);
        });

        return () => {
            unsubcribed();
        };
    }, [collection, condition]);

    return document;
};

export default useFireStore;
