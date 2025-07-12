const loginForm = document.getElementById("staffloginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  fetch('http://127.0.0.1:8000/api/user/token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.token) {
      // Store the token securely
      localStorage.setItem('token', data.token);
      // Login successful, redirect to dashboard or home page
      window.location.href = 'staff-dashboard.html';
    } else {
      // Login failed, display error message
      alert(data.message || 'Invalid credentials');
    }
  })
  .catch(error => console.error(error));
});
