document.addEventListener("DOMContentLoaded", function() {

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
