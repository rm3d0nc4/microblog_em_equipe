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
    const title = document.getElementById('post-tile');
    const text = document.getElementById('post-text');
    // console.log("Title -> " + title)
    // console.log("Text -> " + text)

    if (title && text) {
        const newPost = {
            "title": title.value,
            "text": text.value,
        };
    
        const config = {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access-token')
            },
            body: JSON.stringify(newPost)
        };
    
        const response = await fetch('http://localhost:3000/posts', config);
        const body = await response.json();
        
        if(response.ok) {
            appendPost(body);

            title.value = ''
            text.value = ''
        } else {
            if(response.status === 403) {
                localStorage.clear()
                window.location.href = './auth.html'
            }

            alert(body.message)
        }
    }
}

const onClickDeletePost = async (event, postId) => {
    const options = {
        "method": 'DELETE',
        "mode": 'cors',
        "headers": {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + localStorage.getItem('access-token')
        },
    }

    const confirmation = confirm("Are you sure you wanna delete the post? ") 
    if (confirmation) {
        const response = await fetch(`http://localhost:3000/posts/${postId}`, options)
        
        if (response.ok) {
            deletePost(postId);
            alert("The post were deleted");
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