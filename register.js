
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = registerForm.querySelector('input[type="text"]').value.trim();
  const email = registerForm.querySelector('input[type="email"]').value.trim();
  const password = registerForm.querySelector('input[type="password"]').value.trim();

  // Basic form validation
  if (username === '' || email === '' || password === '') {
    alert('Please fill out all fields');
    return;
  }
 if (password.length < 5) {
    alert('Password must be at least 5 characters long'); // Changed to 5 to match the serializer
    return;
  }

  // Email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    alert('Invalid email address');
    return;
  }

  fetch('http://127.0.0.1:8000/api/user/create/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      name: username
    })
  })
   .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then(data => {
        throw new
        Error(data.detail || 'Registration failed');
      });
    }
  })
  .then(data => {
    console.log(data)
    alert('Registration successful!');
    toggleForms()
    // Clear form fields
    registerForm.querySelector('input[type="text"]').value = '';
    registerForm.querySelector('input[type="email"]').value = '';
    registerForm.querySelector('input[type="password"]').value = '';
  })
  .catch(error => {
    console.error(error);
    alert(error.message || 'An error occurred. Please try again later.');
  });
});


