const postsCon = document.querySelector('#postsCon');
const searchInput = document.querySelector('#searchInput');

let posts = [];

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    posts.forEach(post => {
        const isVisible =
            post.id.toString().includes(value) ||
            post.title.toLowerCase().includes(value) ||
            post.body.toLowerCase().includes(value);
        post.element.classList.toggle("hidden", !isVisible);
    });
});

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(resp => resp.json())
    .then(data => {
        posts = data.map(post => {
            const contentDiv = document.createElement('div');
            contentDiv.classList.add('col-span-4');
            contentDiv.innerHTML = `
                <p>ID: ${post.id}</p>
                <h1>Title: ${post.title}</h1>
                <p>Body: ${post.body}</p>
            `;

            postsCon.appendChild(contentDiv);

            post.element = contentDiv;

            return post;
        });
    })
    .catch(err => console.log(err));