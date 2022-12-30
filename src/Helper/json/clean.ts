export default (obj: Object) => {
    for (let propName in obj) {
        if (obj[propName as keyof typeof obj] === null || obj[propName as keyof typeof obj] === undefined) {
            delete obj[propName as keyof typeof obj];
        }
    }
    return obj;
};