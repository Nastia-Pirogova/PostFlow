const container = document.getElementById('app');
let containerInner = document.createElement(`ul`);
containerInner.classList.add('grid', 'grid-cols-4', 'gap-6');
container.appendChild(containerInner);

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        let posts = data;

        function renderItem() {
            return posts.forEach(post => {
                containerInner.innerHTML += `
                    <li class="post flex flex-col p-8 shadow-xl rounded-lg gap-4 bg-sky-900 hover:shadow-2xl transition" id="${post.id}">
                        <h3 class="post__header text-white font-semibold text-xl">${post.title}</h3>
                        <p class="post__descr text-white">${post.body}</p>
                       id: ${post.id}
                        <button class="post__btn bg-sky-500/50 p-2 rounded-lg text-white" data-action="delete">Delete</button>
                    </li>`
            })
        }

        document.addEventListener("click", (e) => {
            const action = e.target.dataset.action;
            let id = e.target.closest('li').id;
            id = Number(id)
            //console.log(typeof id)
            if (action === "delete" && id) {
                deleteItem(id);
            }
        })

        function deleteItem(id) {
            posts = posts.filter(post => post.id !== id)
            containerInner.innerHTML = ''
            return renderItem(posts);
        }

        renderItem(posts)
    })


