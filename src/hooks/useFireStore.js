import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { db } from '../firebase/config';
import loadingSlice from '../services/loadingSlice';

const useFireStore = (collection, condition, orderBy, sort, setLoading) => {
    const [document, setDocuments] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadingSlice.actions.setLoading(true));
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
        const unsubcribed = collectionRef.onSnapshot((snapshot) => {
            const documents = snapshot.docs.map((doc) => {
                dispatch(loadingSlice.actions.setLoading(false));
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });
            setDocuments(documents);
        });

        return () => unsubcribed;
    }, [collection, condition]);

    return document;
};

export default useFireStore;
