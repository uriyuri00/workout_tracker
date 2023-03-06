document.addEventListener("DOMContentLoaded", function() {

    const createPostButton = document.querySelector('#post-btn');
    const newPostForm = document.querySelector('#post-form');
    const fileInput = document.querySelector('#file');
    
    createPostButton.addEventListener('submit', (event) => {
      event.preventDefault();
      newPostForm.classList.toggle('d-block');
    });
    
    // newPostForm.addEventListener('submit', async (event) => {
    //   event.preventDefault();
    
    //   try {
    //     const response = await fetch('/api/posts', {
    //       method: 'POST',
    //       body: formData
    //     });
  
    //     if (response.ok) {
    //       location.reload();
    //     } else {
    //       throw new Error('Failed to create a post.');
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     alert('Failed to create post.'+ error);
    //   }
    // });
    
    async function getPosts() {
      try {
        const response = await fetch('/api/posts');
        const posts = await response.json();
        const postList = document.getElementById('post-list')

        postList.innerHTML = '';
    
        posts.forEach((post) => {
          const postElement = document.createElement('div');
          postElement.classList.add('card', 'my-3');
    
          const postBody = document.createElement('div');
          postBody.classList.add('card-body');
    
          const postTitle = document.createElement('h5');
          postTitle.classList.add('card-title');
          postTitle.textContent = post.title;
    
          const postText = document.createElement('p');
          postText.classList.add('card-text');
          postText.textContent = post.text;
    
          const postImage = document.createElement('img');
          postImage.classList.add('card-img-top');
         postImage.setAttribute('src', post.imgUrl);
    
          postBody.appendChild(postTitle);
          postBody.appendChild(postText);
          postElement.appendChild(postImage);
          postElement.appendChild(postBody);
          postList.appendChild(postElement);
        });
      } catch (error) {
        console.error(error);
        alert('Failed to get posts.');
      }  
  }

  getPosts();

});
