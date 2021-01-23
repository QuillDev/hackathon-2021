export const loginRegister = async (profileObject) => {
    const { email, givenName } = profileObject;

    //try to login at the given email
    return await fetch(`https://api.quilldev.tech/api/login?email=${email}&name=${givenName}`)
        .then(res => res.text());
}