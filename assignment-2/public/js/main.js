/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements main entry point...">
 *
 * Student Name:
 * Student Number:
 *
 */
import { threePost, tenRecentPost, tenPopularPost, onePost } from "./views.js";
import { Model } from "./model.js";
import { splitHash } from "./util.js";
window.addEventListener("modelUpdated", (e) => {
  let path = splitHash(window.location.hash);
  let target = document.querySelector(".target");
  if (path.path === "posts") {
    target.innerHTML = "";
    let onep = Model.getPost(+path.id);
    onePost(onep, target);
  } else if(path.path === "#" || path.path === "") {
    target.innerHTML = "";
    let random = Model.getRandomPosts(3);
    let recent = Model.getRecentPosts(10);
    let popular = Model.getPopularPosts(10);
    threePost(random, target);
    tenRecentPost(recent, target);
    tenPopularPost(popular, target);
  }
  binding();
});

window.addEventListener("likeAdded", (e) => {
    Model.updatePosts();
});

function binding() {
  let likeBtn = document.querySelectorAll(".like");
  likeBtn.forEach((el) => el.addEventListener("click", likeFunc));
}

function likeFunc(e) {
  let id = +e.target.parentNode.id;
  Model.addLike(id);
}

function redraw() {
  Model.updatePosts();
}

window.onload = async function () {
  redraw();
};
window.onhashchange = redraw;
