const validate = (data, type = null) => {
    if (type == null) {
        if (data.trim().length == 0||data.trim()==""||data.trim()==undefined) return false
        else return true;
    } else {
        if (type == "email") {
            const pattern = /^[^\s@]+\@[^\s@]+\.[^\s@]+$/
            return pattern.test(String(data));
        } else if (type == "password") {
            const pattern = /^[a-zA-Z0-9]+$/;
            return pattern.test(String(data));
        }
    }
}
export default validate;