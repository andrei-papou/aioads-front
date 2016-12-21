const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};


export const required = value => !value && 'This field is required';
export const email = value => !value.match(patterns.email) && 'Invalid email value';
export const password = value => value.length < 4 && 'Password should be longer than 4 characters';


export const check = (value, ...validators) => {
    for (let validator of validators) {
        const error = validator(value);
        if (error) return error;
    }
}
