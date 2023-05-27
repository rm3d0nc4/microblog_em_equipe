const onClickLike = async (postId, event) => {
    event.preventDefault()
    const option = {
        "method": 'PATCH',
        "mode": 'cors',
        "headers": {
            "Content-Type": "application/json",
          },
    }
    const response = await fetch(`http://localhost:3000/posts/${postId}/like`, option)
    console.log(response)
    // if (response.status == 200) {
    //     const likes = document.getElementById('numberOfLikes').innerText
    // }
}

const loadPosts = async () => {

    const options = {
        'method': 'GET',
        'Content-Type': 'application/json'
    }
    const response = await fetch('http://localhost:3000/posts/', options)
    const posts = await response.json()

    posts.forEach(post => {
        appendPost(post);
    });
}

async function addPost() {

    const newPost = {
        "title": document.getElementById('post-tile').value,
        "text": document.getElementById('post-text').value,
    };

    const config = {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    };

    const response = await fetch('http://localhost:3000/posts', config);
    const post = await response.json();
    appendPost(post);
    () => loadPosts()
}

 
appendPost = (post) => {
    const template = document.getElementById('post-template');
    const postElement = document.importNode(template.content, true);
    const likeButton = postElement.querySelector('button')
    
    const postTitle = postElement.querySelectorAll('h3')[0]
    postTitle.innerText = post.title;
    const postItens = postElement.querySelectorAll('p')
    postItens[0].innerText = post.text;
    postItens[1].innerText = post.likes + " like(s)";
    // postItens[1].id = 'numberOfLikes'
    
    const article = postElement.querySelectorAll('article')[0]
    article.id = post.id
    likeButton.id = post.id

    document.getElementById('timeline').append(postElement);
    likeButton.addEventListener('click', (event) => {onClickLike(post.id, event)})
}

window.onload = () => {
    const btnAddPost = document.getElementById('add-post')
    btnAddPost.onclick = addPost;
    loadPosts()
}