function closeModal() {
  document.getElementById('claimModal').style.display = 'none';
}

function submitClaim() {
  const itemName = document.getElementById('itemName').value;
  const itemDescription = document.getElementById('userDescription').value;

  const claim = {
    item: itemName,
    description: itemDescription,
    status: "pending"
  };

  const token = localStorage.getItem('token');

  fetch('http://127.0.0.1:8000/api/item/claims/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify(claim)
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

  document.getElementById('claimModal').style.display = 'none';
}

// Open modal
const claimBtns = document.querySelectorAll('.claim-btn');
claimBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('claimModal').style.display = 'block';
  });
});
