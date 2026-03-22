const container = document.getElementById('app');
let containerInner = document.createElement(`ul`);
containerInner.classList.add('grid', 'gap-3', 'xl:grid-cols-4', 'lg:grid-cols-3', 'md:grid-cols-2', 'col-auto', 'xl:gap-6', 'container', 'm-auto');
container.appendChild(containerInner);

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        let posts = data;

        function renderItem() {
            return posts.forEach(post => {
                const postId = post.id;

                containerInner.innerHTML += `
                    <li class="post flex flex-col lg:p-6 xl:p-8 p-4 shadow-xl rounded-lg gap-4 bg-sky-900" id="${postId}">
                        <h3 class="post__header text-white font-semibold text-xl">${post.title}</h3>
                        <p class="post__descr lg:text-base text-sm text-white">${post.body}</p>
                         <div class="comments"></div>
                        <button class="post__btn border-2 p-2 mt-auto rounded-lg text-white" data-action="delete">Delete</button>
                        <button class="post__btn bg-sky-700 p-2 rounded-lg text-white" data-action="detail">Detail</button>
                    </li>`


                function getPostComments(postId) {
                    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                        .then(response => response.json())
                        .then(comments => {
                            //console.log(comments);
                            let posts = comments;

                            function postAccordion() {
                                const commentsList = document.getElementById(postId);
                                const commentsInner = commentsList.querySelector('.comments');
                                return posts.forEach(post => {
                                    commentsInner.innerHTML += `<details class="text-sky-300 pt-2 pb-2 border-solid">
                                            <summary class="font-semibold">${post.name}</summary>
                                                <div class="mt-2 text-sm text-sky-200">
                                                    <p>${post.body}</p>
                                                </div>
                                        </details>`
                                    // console.log(post.name)
                                    // console.log(postId)
                                })
                            }

                            postAccordion()
                        })
                }

                getPostComments(postId)
            })
        }


        function deleteItem(id) {
            posts = posts.filter(post => post.id !== id)
            containerInner.innerHTML = ''
            return renderItem(posts);
        }

        function detailItem(postId) {
            return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
                .then(response => response.json())
                .then(data => {

                    function modalPost() {

                        let modal = document.createElement(`div`);
                        modal.classList.add('modal', 'fixed', 'flex', 'flex-col', 'items-center', 'justify-center', 'z-1000', 'bg-black/50', 'p-4');
                        container.appendChild(modal);

                        return modal.innerHTML += `<div class="modal-container flex flex-col gap-2 p-8 rounded-lg bg-sky-800 text-white">
                            <button class="modal-close ml-auto" data-action="close"></button>
                            <h3 class="modal-title font-semibold text-xl">${data.title}</h3>
                             <p class="modal__descr lg:text-base text-sm">${data.body}</p>
                             <div class="modal-comments"></div>
                        </div>`
                    }

                    function getPostCommentsModal(postId) {
                        document.body.classList.add('scroll-lock')

                        return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                            .then(response => response.json())
                            .then(comments => {
                                let posts = comments;
                                //console.log(posts);

                                function postCommentModal() {
                                    const commentsInnerModal = document.querySelector('.modal-comments');
                                    return posts.forEach(post => {
                                        commentsInnerModal.innerHTML += `<details class="text-sky-300 pt-2 pb-2 border-solid">
                                            <summary class="font-semibold">${post.name}</summary>
                                                <div class="mt-2 text-sm text-sky-200">
                                                    <p>${post.body}</p>
                                                </div>
                                        </details>`
                                    })
                                }

                                postCommentModal()
                            })
                    }


                    modalPost()
                    getPostCommentsModal(postId)
                })
        }

        renderItem(posts)

        function closeModal() {
            let modal = container.querySelector('.modal');
            document.body.classList.remove('scroll-lock')
            return container.removeChild(modal)
        }

        document.addEventListener("click", (e) => {
            const action = e.target.dataset.action;
            const li = e.target.closest('li');

            if (action === "close") {
                closeModal();
                return;
            }

            if (!li) return;

            const id = Number(li.id);

            if (action === "delete" && id) {
                deleteItem(id);
            }

            if (action === "detail" && id) {
                detailItem(id);
            }

        })
    })
