const onClickDelete = async(postId) => {
    const options = {
        "method": 'DELETE',
        "mode": 'cors',
        "headers": {
            "Content-Type": "application/json",
          },
    }

    const confirmation = confirm("Are you sure you wanna delete the post? ") 
    if (confirmation) {
        const response = await fetch(`http://localhost:3000/posts/${postId}`, options)
        if (response.status == 200) {
            alert("The post were deleted");
        } else {
            alert("The post wasnt deleted");
        }
    }
}

const onClickLike = async (event, postId) => {
    const options = {
        "method": 'PATCH',
        "mode": 'cors',
        "headers": {
            "Content-Type": "application/json",
          },
    }

    const response = await fetch(`http://localhost:3000/posts/${postId}/like`, options)
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
    
    const title = document.getElementById('post-tile').value;
    const text = document.getElementById('post-text').value;

    if (title && text) {
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
}

 
appendPost = (post) => {
    const template = document.getElementById('post-template');
    const postElement = document.importNode(template.content, true);
    const buttons = postElement.querySelectorAll("button");
    const likeButton = buttons[0];
    const deleteButton = buttons[1];
    
    const postTitle = postElement.querySelectorAll('h3')[0]
    postTitle.innerText = post.title;
    const postItens = postElement.querySelectorAll('p')
    postItens[0].innerText = post.text;
    postItens[1].innerText = post.likes + " like(s)";
    
    const article = postElement.querySelectorAll('article')[0]
    article.id = post.id
    likeButton.id = post.id

    document.getElementById('timeline').append(postElement);
    likeButton.addEventListener('click', (event) => onClickLike(event, post.id));
    deleteButton.addEventListener('click', () => onClickDelete(post.id));
}

window.onload = () => {
    const btnAddPost = document.getElementById('add-post')
    btnAddPost.onclick = addPost;
    loadPosts()
}