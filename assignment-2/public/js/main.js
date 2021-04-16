/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements main entry point...">
 *
 * Student Name:
 * Student Number:
 *
 */
import { threePost, tenRecentPost, tenPopularPost, onePost,authForm,authUser, authError, allPost, myPostErr, creatingPostForm} from "./views.js";
import { Model } from "./model.js";
import { splitHash } from "./util.js";
import {Auth} from "./service.js";
window.addEventListener("modelUpdated", (e) => {
  let path = splitHash(window.location.hash);
  let target = document.querySelector(".target");
  let auth = document.querySelector(".authentication");
  target.innerHTML = "";
  if (path.path === "posts") {
    let onep = Model.getPost(+path.id);
    onePost(onep, target);
  } else if (path.path === "#" || path.path === "") {
    let random = Model.getRandomPosts(3);
    let recent = Model.getRecentPosts(10);
    let popular = Model.getPopularPosts(10);
    threePost(random, target);
    tenRecentPost(recent, target);
    tenPopularPost(popular, target);
  } else if(path.path === "all-posts"){
    let recents = Model.getPosts();
    allPost(target, recents);
  } else if(path.path === "my-posts"){
    if(!Auth.getUser()){
      myPostErr(target);
    } else{
      let myPostRecents = Model.getUserPosts(Auth.getUser().id);
      creatingPostForm(target);
      allPost(target, myPostRecents);
    }
  }
  auth.innerHTML ="";
  if(Auth.getUser()){
    authUser(auth, Auth.getUser());
  } else{
    authForm(auth);
  }
  binding();
});

window.addEventListener("likeAdded", (e) => {
  Model.updatePosts();
});

window.addEventListener("userLogin", (e) =>{
  window.location.hash = "";
  Model.updatePosts();

});

window.addEventListener("userLogout", () => {
 window.location.hash = "";
 Model.updatePosts();
});

window.addEventListener("errorAuth", () => {
 let auth = document.querySelector(".authentication");
 authError(auth);
});

window.addEventListener("postAdded", () => {
  Model.updatePosts();
});

function binding() {
  // for Like button
  let likeBtn = document.querySelectorAll(".Like");
  if (likeBtn) {
    likeBtn.forEach((el) => el.addEventListener("click", likeFunc));
  }
  // For login form
  let form = document.querySelector(".auth-form");
  if(form){
    form.addEventListener("submit", loginForm);
  }

  // For logout button
  let logout = document.querySelector(".auth-logout");
   if(logout){
     logout.addEventListener("click", logoutFunc);
   }

  // For submit a new Post
  let newPostForm = document.querySelector(".myPostForm-form");
  if(newPostForm){
    newPostForm.addEventListener("submit", createPost);
  }
}

function logoutFunc(e){
  Auth.deleteData();
}

function likeFunc(e) {
  let id = +e.target.parentNode.id;
  Model.addLike(id);
}

function loginForm(e){
  e.preventDefault();
  const username = e.target[0].value;
  const password = e.target[1].value;

  const authInfo = {
      "identifier": username,
      "password": password,
  }
  Auth.login(authInfo);
  e.target[0].value ="";
  e.target[1].value ="";
}

function createPost(e){
  e.preventDefault();
  const url_image = e.target[0].value;
  const caption = e.target[1].value;
  const currUser = Auth.getUser();
  const dataPosted = {
    p_caption: caption,
    p_likes: "0",
    p_url: url_image,
    p_author: {
      id: currUser.id,
      username: currUser.username,
      email: currUser.email,
      provider: currUser.provider,
      confirmed: currUser.confirmed,
      blocked: currUser.blocked,
      role: currUser.role.id,
    },
  };
  Model.addPost(dataPosted);
}

function redraw() {
  Model.updatePosts();
}

window.onload = async function () {
  redraw();
};
window.onhashchange = redraw;
