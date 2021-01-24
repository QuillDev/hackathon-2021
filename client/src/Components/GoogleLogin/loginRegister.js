export const loginRegister = async (profileObject) => {
    const { email, givenName, imageUrl} = profileObject;

    //try to login at the given email
    return await fetch(`https://api.quilldev.tech/api/login?email=${email}&name=${givenName}&image=${imageUrl}`)
        .then(res => res.text());
}