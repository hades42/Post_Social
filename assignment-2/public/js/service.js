/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements user authentication ...">
 *
 * Student Name:
 * Student Number:
 *
 */ 

export {Auth}

const Auth = {
    userData: null,

    // login - handle user login  
    //      by submitting a POST request to the server API
    //      username - is the input username
    //      password - is the input password
    // when the request is resolved, creates a "userLogin" event
    login: function(authInfo) {
        fetch("/auth/local", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(authInfo),
        })
        .then(res => res.json())
        .then(data => {
            this.userData = data;
            console.log(data);
            if(this.getUser() && this.getJWT()){
                let event = new CustomEvent("userLogin");
                window.dispatchEvent(event);
            } else{
                let event = new CustomEvent("errorAuth")
                window.dispatchEvent(event);
            }
        }).catch(err => console.log(err))
    }, 

    //getUser - return the user object from userData
    getUser: function() {
        if (this.userData) {
            return this.userData.user;
        } else {
            return null;
        }
    },

    //getJWT - get the JWT from userData
    getJWT: function() {
        if (this.userData) {
            return this.userData.jwt;
        } else {
            return null;
        } 
    }
    ,
    // Delete the current data
    deleteData: function(){
        this.userData = null;
        let event = new CustomEvent("userLogout");
        window.dispatchEvent(event);
    },
    getData: function(){
        return this.userData;
    }
}