export default (data: Object) => {
    if (data) {
        return JSON.parse(JSON.stringify(data));
    }
    return null;
};