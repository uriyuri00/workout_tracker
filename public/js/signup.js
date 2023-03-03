
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#inputUsername3').value.trim();
    const email = document.querySelector('#inputEmail3').value.trim();
    const password = document.querySelector('#inputPassword3').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password, email }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        console.log(response)
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('.signup-form')
  addEventListener('submit', signupFormHandler);