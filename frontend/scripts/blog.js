const onClickComments = async (postId) => {
    const commentsSection = document.getElementById(postId).querySelector(".post-comments")
    
    if (commentsSection.innerText.trim() === '') {
        const response = await fetch(`http://localhost:3000/posts/${postId}/comments`)
        if (response.ok) {
            const comments = await response.json()
            comments.forEach((comment) => {
                appendComment(comment)
            })
        }
    }

    if (commentsSection.style.display === 'inline') {
        commentsSection.style.display = 'none'
    } else {
        commentsSection.style.display = 'inline'
    }
}

const appendComment = (comment) => {
    const template = document.querySelector("#comments-template")
    const commentElement = document.importNode(template.content, true)

    const author = commentElement.querySelector("h4")
    const text = commentElement.querySelector("p")

    author.innerText = comment.userId
    text.innerText = comment.text

    document.querySelector('.post-comments').append(commentElement)
}

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
        if (response.ok) {
            deletePost(postId);
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

    if(response.ok) {
        likePost(postId)
    }
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

const addPost = async (event) => {
    event.preventDefault();  
    const title = document.getElementById('post-tile').value;
    const text = document.getElementById('post-text').value;

    if (title && text) {
        const newPost = {
            "userId": "ofhfhasdfhasdufh",
            "title": title,
            "text": text
        };
    
        const config = {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        };
    
        const response = await fetch('http://localhost:3000/posts', config);
        if (response.ok) {
            const post = await response.json();
            appendPost(post);
        }
    }
}

const appendPost = (post) => {
    const template = document.getElementById('post-template');
    const postElement = document.importNode(template.content, true);
    const buttons = postElement.querySelectorAll("button");
    const likeButton = buttons[0];
    const deleteButton = buttons[1];
    const comentariosButton = buttons[2];
    
    const postTitle = postElement.querySelectorAll('h3')[0]
    postTitle.innerText = post.title;
    const postItens = postElement.querySelectorAll('p')
    postItens[0].innerText = post.text;
    postItens[1].innerText = post.likes +" like(s)";
    
    const article = postElement.querySelectorAll('article')[0]
    article.id = post.id
    
    document.getElementById('timeline').append(postElement);
    likeButton.addEventListener('click', (event) => onClickLike(event, post.id));
    deleteButton.addEventListener('click', () => onClickDelete(post.id));
    comentariosButton.addEventListener('click', () => onClickComments(post.id));
}

const likePost = (postId) => {
    const postElement = document.getElementById(postId);
    const postItens = postElement.querySelectorAll('p')
    const likes = postItens[1].innerText;
    const newLikes = Number(likes.split(' ')[0]) + 1;
    postItens[1].innerText = newLikes + ' like(s)';
}

const deletePost = (postId) => {
    const postElement = document.getElementById(postId);
    postElement.remove()
}

window.onload = () => {
    const postForm = document.getElementById('new-post')
    postForm.onsubmit = addPost;


    loadPosts()
}