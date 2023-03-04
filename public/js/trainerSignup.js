
async function signupFormHandler(event)  {
    event.preventDefault();
  
    const username = document.querySelector('#inputUsername3').value.trim();
    const email = document.querySelector('#inputEmail3').value.trim();
    const password = document.querySelector('#inputPassword3').value.trim();
    const certification = document.querySelector('#inputCertification3').value.trim();
    const speciatly = document.querySelector('#inputSpecialty3').value.trim();


  
    if (username && email && password && certification && speciatly) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password,certification,speciatly }),
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
  .querySelector('#Tsignup-form')
  .addEventListener('submit', trainerSignupFormHandler);