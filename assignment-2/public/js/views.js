/*
 *
 * Module: View module is responsible for creating all components for the data we want to show on the website
 *
 * Student Name: Van Nguyen Nguyen
 * Student Number: 45515409
 *
 */
import { getDate } from "./util.js";
import {Model} from "./model.js";

//threePost- Template view for three random posts
function threePost(data, target) {
  // Wrapper for the component
  let postContainer = document.createElement("div");
  postContainer.className = "threePost";

  // Body of the component
  data.forEach((el, i) => {
    let anchor = document.createElement("a");
    anchor.className = `flowtow flowtow-${i + 1}`;
    anchor.id = `${el.id}`;
    anchor.href = `/#!/posts/${el.id}`;
    let post = `
        <img class="flowtow-image" src="${el.p_url || el.p_image.url}" alt="">
        <div class="flowtow-info">
        <h2 class="flowtow-caption">${el.p_caption}</h2>
        <div class="flowtow-author">${el.p_author.username}</div>
        <div class="flowtow-user">
        <div class="flowtow-liked">
        <div type="button" class="flowtow-heart"><i class="fas fa-thumbs-up"></i></div>
        <p>${el.p_likes}</p>
        </div>
        <div class="flowtow-time">${getDate(el.published_at)}</div>
        </div>
        </div>
        `;
    anchor.innerHTML = post;

    // Adding the component to the target
    postContainer.appendChild(anchor);
  });
  target.appendChild(postContainer);
}

// tenRecentPost - Template view for the most ten recent posts
function tenRecentPost(data, target) {
  // Wrapper for the component
  let container = document.createElement("div");
  container.className = "rePost";

  // Title of the component
  let title = document.createElement("h2");
  title.className = "rePost-title";
  title.innerHTML = "Recent Posts";
  container.appendChild(title);

  // Body of the component
  let postContainer = document.createElement("div");
  postContainer.className = "rePost-container";
  data.forEach((element, index) => {
    let post = document.createElement("div");
    post.id = element.id;
    post.className = `recentPost recentPost-${index}`;
    post.innerHTML = `<a href="/#!/posts/${
      element.id
    }" class="recentPost-image">
              <img src="${element.p_url || element.p_image.url}" alt="">
            </a>
            <div class="recentPost-info">
              <h2 class="recentPost-caption">${element.p_caption}</h2>
              <h3 class="recentPost-author">${element.p_author.username}</h3>
              <div class="recentPost-user">
                <div class="recentPost-liked">
                  <button id="${
                    element.id
                  }" type="button" class="recentPost-heart Like"><i class="fas fa-thumbs-up"></i></button>
                  <p>${element.p_likes}</p>
                </div>
                <div class="recentPost-time">${getDate(
                  element.published_at
                )}</div>
              </div>
            </div>`;
    postContainer.appendChild(post);
  });
  container.appendChild(postContainer);

  // Adding the component to the target
  target.appendChild(container);
}

// tenPopularPost - Template for the most ten popular post
function tenPopularPost(data, target) {
  // A wrapper for the whole component
  let container = document.createElement("div");
  container.className = "poPost";

  // Title of the component
  let title = document.createElement("h2");
  title.className = "poPost-title";
  title.innerHTML = "Popular Posts";
  container.appendChild(title);

  // Body of the component
  let postContainer = document.createElement("div");
  postContainer.className = "poPost-container";
  data.forEach((element, index) => {
    let post = document.createElement("div");
    post.id = element.id;
    post.className = `popularPost popularPost-${index}`;
    post.innerHTML = `<a href="/#!/posts/${
      element.id
    }" class="popularPost-image">
              <img src="${element.p_url || element.p_image.url}" alt="">
            </a>
            <div class="popularPost-info">
              <h2 class="popularPost-caption">${element.p_caption}</h2>
              <h3 class="popularPost-author">${element.p_author.username}</h3>
              <div class="popularPost-user">
                <div class="popularPost-liked">
                  <button id="${
                    element.id
                  }" type="button" class="popularPost-heart Like"><i class="fas fa-thumbs-up"></i></button>
                  <p>${element.p_likes}</p>
                </div>
                <div class="popularPost-time">${getDate(
                  element.published_at
                )}</div>
              </div>
            </div>`;
    postContainer.appendChild(post);
  });
  container.appendChild(postContainer);

  // Adding component to the target
  target.appendChild(container);
}


// onePost - Template for showing one post view
function onePost(data, target) {

  // Wrapper for the whole component
  let container = document.createElement("div");
  container.className = "showPost";

  // Body of the component
  let content = `<div class="showPost-image">
          <img src="${data.p_url || data.p_image.url}" alt="image">
        </div>
        <ul class="showPost-feature">
          <li class="showPost-liked">
            <button id="${
              data.id
            }" type="button" class="Like"><i class="fas fa-thumbs-up"></i></button>
            <p>${data.p_likes}</p>
          </li>
          <li class="showPost-comment">
            <div class="showPost-comIcon"><i class="fas fa-comments"></i></div>
            <p>${data.p_comment.length}</p>
          </li>
          <li class="showPost-date">
             ${getDate(data.published_at)}
          </li>
        </ul>
        <div class="showPost-title">${data.p_caption}</div>
        <div class="showPost-author">${data.p_author.username}</div>
        <div class="showPost-commentContainer">
          <h2 class="showPost-commentTitle"><i class="fas fa-comments"></i> Comments</h2>
        </div>
       `;
  
  // Inserting the component to the target
  container.innerHTML = content;
  target.appendChild(container);

  // Checking for Authenticated user. If there is no authenticated information, we will not allow general users leave any comments in the post, otherwise we will have a form to allow auth user do it.
   const AuthData = JSON.parse(sessionStorage.getItem("UserInfo"));
  if(AuthData){
    let form = document.createElement("form");
    form.className = "showPost-form";
    form.id = `${data.id}`;
    form.innerHTML = `<input class="textInput" type="text" placeholder="Comment">
          <input class="buttonInput" type="submit" value="Add a coment">`;
    container.appendChild(form);
  }

  // Showing every single comment belong to the post.
  let comContent = document.createElement("ul");
  comContent.className = "showPost-comContent";
  data.p_comment.forEach((el) => {
    let comments = Model.data.comments.find(c => c.id === el.id); 
    let li = document.createElement("li");
    li.innerHTML = `
              <div class="showPost-comContent__author">${
                comments.c_author.username
              }</div>
              <div class="showPost-comContent__comment">${el.c_content}</div>
              <div class="showPost-comContent__date">${getDate(
                el.published_at
              )}</div>
            `;
    comContent.appendChild(li);
  });
  let commentContainer = document.querySelector(".showPost-commentContainer");
  commentContainer.appendChild(comContent);
}

// authForm - Template view for the authenticated form
function authForm(target) {
  let form = document.createElement("form");
  form.className = "auth-form";
  form.id = "loginform";
  form.innerHTML = `<label class="username" for="auth-username"> Username :
        </label>
        <input type="text" id="auth-username" placeholder="Enter your username..." autocomplete="on">
        <label class="password" for="auth-password"> Password : </label>
        <input type="password" id="auth-password" placeholder="Enter your password...">
        <input class="auth-btn" type="submit" value="Login">`;
  target.appendChild(form);
}

// authUser - Template view for showing user name if user login successfully
function authUser(target, data) {
  let user = document.createElement("div");
  user.className = "auth-user";
  user.innerHTML = `
   <h2>Logged in as ${data.username}</h2>
   <button class="auth-logout">Logout</button>
  `;
  target.appendChild(user);
}

// authError - If user login fail, attach the error below the the form
function authError(target) {
  let error = document.createElement("div");
  error.className = "auth-error";
  error.innerHTML = "Login Failed, please try again";
  target.appendChild(error);
}

// allPost - Showing all the posts in database with vertically view
function allPost(target, data) {
  // Wrapper of the component
  let container = document.createElement("div");
  container.className = "allPost";

  // Body of the component
  data.forEach((el) => {
    let card = document.createElement("div");

    let ul = document.createElement("ul");
    ul.className = "allPost-comContent";
    el.p_comment.forEach((item) => {
      let li = document.createElement("li");
      li.innerHTML = item.c_content;
      ul.appendChild(li);
    });
    card.className = "allPost-card";
    card.innerHTML = `<a href="/#!/posts/${el.id}">
            <img class="allPost-image" src="${
              el.p_url || el.p_image.url
            }" alt="img" class="allPost-card__image">
          </a>
          <div class="allPost-card__info">
            <div class="allPost-card__feature">
              <div class="allPost-card__like">
                <button id="${
                  el.id
                }" class="Like" type="button"><i class="fas fa-thumbs-up"></i></button>
                <p>${el.p_likes}</p>
              </div>
              <div class="allPost-card__comment">
                <div class="allPost-comIcon"><i class="fas fa-comments"></i></div>
                <p>${el.p_comment.length}</p>
              </div>
              <div class="allPost-card__author">${el.p_author.username}</div>
              <div class="allPost-card__date">
                ${getDate(el.published_at)}
              </div>
            </div>
            <div class="allPost-card__caption">${el.p_caption}</div>
            <div class="allPost-card__commentContainer">
              <h2 class="allPost-commentTitle"><i class="fas fa-comments"></i> Comments</h2>
              ${new XMLSerializer().serializeToString(ul)}
            </div>
          </div>`;
    container.appendChild(card);
  });

  // Adding the component to the target
  target.appendChild(container);
}

// allPostAuth - Showing all the posts belong to current authenticated user
function allPostAuth(target, data) {
  // Wrapper of the component
  let container = document.createElement("div");
  container.className = "allPost";

  // Body of the component
  data.forEach((el) => {
    let card = document.createElement("div");

    let ul = document.createElement("ul");
    ul.className = "allPost-comContent";
    el.p_comment.forEach((item) => {
      let li = document.createElement("li");
      li.innerHTML = item.c_content;
      ul.appendChild(li);
    });
    card.className = "allPost-card";
    card.innerHTML = `<a href="/#!/posts/${el.id}">
            <img class="allPost-image" src="${
              el.p_url || el.p_image.url
            }" alt="img" class="allPost-card__image">
          </a>
          <div class="allPost-card__info">
            <div class="allPost-card__feature">
              <div class="allPost-card__like">
                <button id="${
                  el.id
                }" class="Like" type="button"><i class="fas fa-thumbs-up"></i></button>
                <p>${el.p_likes}</p>
              </div>
              <div class="allPost-card__comment">
                <div class="allPost-comIcon"><i class="fas fa-comments"></i></div>
                <p>${el.p_comment.length}</p>
              </div>
              <div class="allPost-card__author">${el.p_author.username}</div>
              <div class="allPost-card__date">
              ${getDate(el.published_at)}
              </div>
              <button id="${el.id}" class="allPost-card_delete">Delete</button>
            </div>
            <div class="allPost-card__caption">${el.p_caption}</div>
            <div class="allPost-card__commentContainer">
              <h2 class="allPost-commentTitle"><i class="fas fa-comments"></i> Comments</h2>
              ${new XMLSerializer().serializeToString(ul)}
            </div>
          </div>`;
    container.appendChild(card);
  });

  // Adding the component to the target
  target.appendChild(container);
}

// myPostErr - If we can not check for authenticated user, we will not allow anyone to view the myPost component, instead we require them to login first.
function myPostErr(target){
  const container = document.createElement("div");
  container.className = "myPost-error";
  container.innerHTML = "<h2>You have to login first</h2";
  target.appendChild(container);
}

// creatingPostForm - Form template for creating new post 
function creatingPostForm(target){
  // Wrapper of the component
  const container = document.createElement("div");
  container.className = "myPostForm";

  // Body of the component
  container.innerHTML = `<h3 class="myPostForm-title">Creating Your Post!</h3>
        <form class="form myPostForm-form">
          <div class="form-image">
            <label for="url_image">URL Image: </label>
            <input type="text" id="url_image" placeholder="Enter your URL image...">
          </div>
          <div class="form-file">
            <label for="file_image">Choose your own image (If you do not have the URL): 
            </label>
            <input id="file_image" name="picture" type=file accept=image/*>
          </div>
          <div class="form-caption">
            <textarea placeholder="Enter your caption here..." name="" id=""></textarea>
          </div>
          <input type="submit" class="form_submit" value="Create a Post">
        </form>`;
  
  // Adding the component to the target
  target.appendChild(container);
}


export {
  threePost,
  tenRecentPost,
  tenPopularPost,
  onePost,
  authForm,
  authUser,
  authError,
  allPost,
  myPostErr,
  creatingPostForm,
  allPostAuth
};
