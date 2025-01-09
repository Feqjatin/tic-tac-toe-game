function getUid(userName) {
    if (userName.length > 0) {
        console.log("getting uid");
        const display = (code) => {
            console.log("uid" + code);
            localStorage.setItem('uid', code);
        }

        fetch("http://localhost:3005/userGet?name=" + userName)
            .then(data => data.json())
            .then(data => {
                display(data.val);
                // Navigate after data is successfully fetched
                window.location.href = 'index.html';
            })
            .catch(e => console.log(e));
    }
}

document.addEventListener("keypress", (e) => {
    if(e.key=="e")
    {console.log(localStorage.getItem('uid')+" uid");
    console.log(localStorage.getItem('uCode')+" ucode");
     localStorage.clear();
    }
    
});