const onClickMakeComment = async (event, postId) => {
    event.preventDefault()
    const commentSection = document.getElementById(postId).querySelector('.comment')
    const textArea = commentSection.querySelector('.comment-text')

    if (textArea.style.display === 'inline') {
            if (textArea.value != '') {
                const data = {
                    "text": textArea.value,
                }
                
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + localStorage.getItem('access-token')
                    },
                    body: JSON.stringify(data)
                }
                const response = await fetch(`http://localhost:3000/posts/${postId}/comments/`, options)

                const body = await response.json();
                
                if(response.ok) {
                    textArea.value = ''
                    //Achar uma maneira de fazer o comentário ir pro topo
                    appendCommentOnTop(body)                    
                } else {
                    if(response.status === 403) {
                        localStorage.clear()
                        window.location.href = './auth.html'
                    }
                    alert(body.message)
                }
                 
                textArea.style.display = 'none';
            } else {
                alert("Não pode submeter um formulário vaziu")
            }
    } else {
        textArea.style.display = 'inline';
        textArea.required = true;
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

const onClickDeleteComment = async (event, comment) => {
    //console.log(event.target.parentNode.parentNode)
    const options = {
        "method": 'DELETE',
        "mode": 'cors',
        "headers": {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + localStorage.getItem('access-token')
        },
    }
    
    const confirmation = confirm("Are you sure you wanna delete the comment? ") 
    if (confirmation) {
        const response = await fetch(`http://localhost:3000/posts/${comment.SPostId}/comments/${comment.id}`, options)
        
        if (response.ok) {
            await removeChild(
                event.target.parentNode.parentNode,
                event.target.parentNode
            )
            alert("The comment were deleted")

        } else {
            if(response.status === 403) {
                localStorage.clear()
                window.location.href = './auth.html'
            }

            const body = await response.json();
            alert(body.message);
        }
    }
}


const onClickComments = async (postId) => {
    const commentsSection = document.getElementById(postId).querySelector(".post-comments")

    if (commentsSection.innerText.trim() === '') {
        const response = await fetch(`http://localhost:3000/posts/${postId}/comments`)
        if (response.ok) {
            const comments = await response.json()
            console.log(comments)
            if (comments.length > 3) {
                for (let i = 0; i < 3; i++) {
                    await appendComment(comments[i])
                }
                const showMoreButton = document.createElement('button')
                showMoreButton.innerText = "Show more..."
                showMoreButton.addEventListener('click', () => {
                    for (let i = 3; i < comments.length; i++) {
                        appendComment(comments[i])
                    }
                    showMoreButton.parentNode.removeChild(showMoreButton)
                })
                commentsSection.append(showMoreButton)
            } else {
                comments.forEach((comment) => {
                    appendComment(comment)
                })
            }
        } else {
            alert("Comments wasnt loaded")
        }
    }

    if (commentsSection.style.display === 'inline') {
        commentsSection.style.display = 'none'
    } else {
        commentsSection.style.display = 'inline'
    }
}

const cancelComment = async (event, postId) => {
    event.preventDefault();
    const commentSection = document.getElementById(postId).querySelector('.comment')
    const textArea = commentSection.querySelector('.comment-text')

    if (textArea.value != '') {
        textArea.value = ''
    }
    
    textArea.style.display = 'none'
}