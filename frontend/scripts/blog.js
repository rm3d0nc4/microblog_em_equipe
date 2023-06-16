const appendPost = (post) => {
    const template = document.getElementById('post-template');
    const postElement = document.importNode(template.content, true);
    const buttons = postElement.querySelectorAll("button");
    const likeButton = buttons[0];
    const deleteButton = buttons[1];
    const comentariosButton = buttons[2];
    const commentButton = buttons[3];
    const cancelButton = buttons[4];
    
    const postTitle = postElement.querySelectorAll('h3')[0]
    postTitle.innerText = post.title;
    const postItens = postElement.querySelectorAll('p')
    postItens[0].innerText = post.text;
    postItens[1].innerText = post.likes +" like(s)";
    
    const article = postElement.querySelectorAll('article')[0]
    article.id = post.id

    document.getElementById('timeline').append(postElement);
    likeButton.addEventListener('click', (event) => onClickLike(event, post.id));
    deleteButton.addEventListener('click', (event) => onClickDeletePost(event, post.id));
    comentariosButton.addEventListener('click', () => onClickComments(post.id));
    commentButton.addEventListener('click', (event) => onClickMakeComment(event, post.id));
    cancelButton.addEventListener('click', (event) => cancelComment(event, post.id));
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

const appendComment = async (comment) => {
    const template = document.querySelector("#comments-template")
    const commentElement = document.importNode(template.content, true)
    
    const deleteButton = commentElement.querySelector('button');
    deleteButton.addEventListener('click', (event) => onClickDeleteComment(event, comment))

    const author = commentElement.querySelector("h4")
    const text = commentElement.querySelector("p")
    const userName = await getUserName(comment.SUserId);
    
    author.innerText = userName;
    text.innerText = comment.text

    document.querySelector('.post-comments').append(commentElement)
}

const appendCommentOnTop = async (comment) => {
    const commentSection = document.querySelector('.post-comments')
    const template = document.querySelector("#comments-template")
    const commentElement = document.importNode(template.content, true)
    
    const deleteButton = commentElement.querySelector('button');
    deleteButton.addEventListener('click', (event) => onClickDeleteComment(event, comment))

    const author = commentElement.querySelector("h4")
    const text = commentElement.querySelector("p")
    const userName = await getUserName(comment.SUserId);
    
    author.innerText = userName;
    text.innerText = comment.text
    
    commentSection.insertBefore(commentElement, commentSection.firstChild)
}

window.onload = () => {
    const postForm = document.getElementById('new-post')
    postForm.onsubmit = addPost

    loadPosts()
}