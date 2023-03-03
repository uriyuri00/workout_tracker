
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#inputUsername3').value.trim();
    const email = document.querySelector('#inputEmail3').value.trim();
    const password = document.querySelector('#inputPassword3').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('.login-form')
  .addEventListener('submit', signupFormHandler);