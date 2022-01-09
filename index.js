const blogList = document.getElementById('blog-list');
console.log(blogList);
let postsArray = [];

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response =>{ 
        return response.json();
    })
    .then(data => {
        postsArray = data.slice(0,5);
        console.log(postsArray);
        postsArray.forEach(post => {
            blogList.innerHTML += `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <hr>
            `
        });
    });

document.getElementById("new-post").addEventListener("submit", (event) => {
    event.preventDefault();

    let title = document.getElementById("title");
    let body = document.getElementById("body");
    const newPost = {
        title: title.value,
        body: body.value
    };
    
    fetch("https://jsonplaceholder.typicode.com/posts",{
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {"Content-Type": "application/json", charset: "utf8"}
    })
    .then(response => response.json())
    .then(post => {
        postsArray.push(newPost);
        console.log(post);
        
        postsArray.forEach(post => {
            blogList.innerHTML += `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <hr>
            `
        });
    })
    document.getElementById("new-post").reset();

})    
    