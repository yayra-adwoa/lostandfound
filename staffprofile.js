const forms = document.getElementsByClassName('profile-form');

for (let i = 0; i < forms.length; i++) {
  forms[i].addEventListener('submit', (e) => {
    e.preventDefault();
    const newPassword = document.getElementById('newPassword').value;

    if (newPassword) {
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
    } else {
      alert('Please enter a new password!');
    }
 });
}
