function generateKey(string) {
    const arr = string.split('');
    const key = [];
    let tempt = '';
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            for (let k = i; k <= j; k++) {
                if (arr[k] !== ' ') tempt += arr[k];
            }
            if (tempt !== '') key.push(tempt);
            tempt = '';
        }
    }
    return key;
}

export default generateKey;
