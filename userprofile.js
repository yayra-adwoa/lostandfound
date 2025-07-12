const token = localStorage.getItem('token');
console.log(token);

fetch('http://127.0.0.1:8000/api/user/me/', {
  method: 'GET',
  headers: {
    'Authorization': `Token ${localStorage.getItem('token')}`
  }
})
.then(response => response.json())
.then(data => {
  document.getElementById('userName').textContent = data.name;
})
.catch(error => console.error(error));

// Update user name and password
// Get the forms
const forms = document.getElementsByClassName('profile-form');

// Add event listeners to the forms
for (let i = 0; i < forms.length; i++) {
  forms[i].addEventListener('submit', (e) => {
    e.preventDefault();

    // Check which form is being submitted
    if (i === 0) {
      // Update name form
      const newName = document.getElementById('newName').value;
      fetch('http://127.0.0.1:8000/api/user/me/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newName })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert('Name updated successfully!');
      })
      .catch(error => console.error(error));
    } else if (i === 1) {
      // Update password form
      const newPassword = document.getElementById('newPassword').value;
 fetch('http://127.0.0.1:8000/api/user/me/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: newPassword })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert('Password updated successfully!');
      })
      .catch(error => console.error(error));
    }
  });
}






