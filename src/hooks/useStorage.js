import { useState, useEffect } from 'react';

export default function useStorage(storage, key, jsonify = false) {
    const [value, setValue] = useState(
        jsonify ? JSON.parse(storage.getItem(key)) : storage.getItem(key)
    );
    useEffect(() => {
        if (value === null) {
            storage.removeItem(key);
            return;
        }
        storage.setItem(key, jsonify ? JSON.stringify(value) : value);
    }, [value, storage, key, jsonify]);

    const clearStorage = () => {
        storage.removeItem(key);
        setValue(null);
    };

    return [value, setValue, clearStorage];
}
