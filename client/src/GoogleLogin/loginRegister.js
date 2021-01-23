export const loginRegister = (profileObject) => {
    const { email } = profileObject;

    console.log(`Trying to login with email: ${email}`);


    //try to login at the given email
    fetch(`http://localhost:3069/api/login?q=${email}`)
        .then(res => res.text())
        .then(res => console.log(res));
}