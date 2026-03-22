(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.getElementById(`app`),t=document.createElement(`ul`);t.classList.add(`grid`,`gap-3`,`xl:grid-cols-4`,`lg:grid-cols-3`,`md:grid-cols-2`,`col-auto`,`xl:gap-6`,`container`,`m-auto`),e.appendChild(t),fetch(`https://jsonplaceholder.typicode.com/posts`).then(e=>e.json()).then(n=>{let r=n;function i(){return r.forEach(e=>{let n=e.id;t.innerHTML+=`
                    <li class="post flex flex-col lg:p-6 xl:p-8 p-4 shadow-xl rounded-lg gap-4 bg-sky-900" id="${n}">
                        <h3 class="post__header text-white font-semibold text-xl">${e.title}</h3>
                        <p class="post__descr lg:text-base text-sm text-white">${e.body}</p>
                         <div class="comments"></div>
                        <button class="post__btn border-2 p-2 mt-auto rounded-lg text-white" data-action="delete">Delete</button>
                        <button class="post__btn bg-sky-700 p-2 rounded-lg text-white" data-action="detail">Detail</button>
                    </li>`;function r(e){return fetch(`https://jsonplaceholder.typicode.com/posts/${e}/comments`).then(e=>e.json()).then(t=>{let n=t;function r(){let t=document.getElementById(e).querySelector(`.comments`);return n.forEach(e=>{t.innerHTML+=`<details class="text-sky-300 pt-2 pb-2 border-solid">
                                            <summary class="font-semibold">${e.name}</summary>
                                                <div class="mt-2 text-sm text-sky-200">
                                                    <p>${e.body}</p>
                                                </div>
                                        </details>`})}r()})}r(n)})}function a(e){return r=r.filter(t=>t.id!==e),t.innerHTML=``,i(r)}function o(t){return fetch(`https://jsonplaceholder.typicode.com/posts/${t}`).then(e=>e.json()).then(n=>{function r(){let t=document.createElement(`div`);return t.classList.add(`modal`,`fixed`,`flex`,`flex-col`,`items-center`,`justify-center`,`z-1000`,`bg-black/50`,`p-4`),e.appendChild(t),t.innerHTML+=`<div class="modal-container flex flex-col gap-2 p-8 rounded-lg bg-sky-800 text-white">
                            <button class="modal-close ml-auto" data-action="close"></button>
                            <h3 class="modal-title font-semibold text-xl">${n.title}</h3>
                             <p class="modal__descr lg:text-base text-sm">${n.body}</p>
                             <div class="modal-comments"></div>
                        </div>`}function i(e){return document.body.classList.add(`scroll-lock`),fetch(`https://jsonplaceholder.typicode.com/posts/${e}/comments`).then(e=>e.json()).then(e=>{let t=e;function n(){let e=document.querySelector(`.modal-comments`);return t.forEach(t=>{e.innerHTML+=`<details class="text-sky-300 pt-2 pb-2 border-solid">
                                            <summary class="font-semibold">${t.name}</summary>
                                                <div class="mt-2 text-sm text-sky-200">
                                                    <p>${t.body}</p>
                                                </div>
                                        </details>`})}n()})}r(),i(t)})}i(r);function s(){let t=e.querySelector(`.modal`);return document.body.classList.remove(`scroll-lock`),e.removeChild(t)}document.addEventListener(`click`,e=>{let t=e.target.dataset.action,n=e.target.closest(`li`);if(t===`close`){s();return}if(!n)return;let r=Number(n.id);t===`delete`&&r&&a(r),t===`detail`&&r&&o(r)})});