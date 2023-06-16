const removeChild = async (parentNode, childNode) => {
    await parentNode.removeChild(childNode)
}

const deletePost = (postId) => {
    const postElement = document.getElementById(postId);
    postElement.remove()
}