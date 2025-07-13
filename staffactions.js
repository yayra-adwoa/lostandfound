const apiUrl = 'http://127.0.0.1:8000/api/item/items/';
const reportContainer = document.getElementById('reportCardContainer');
const token = localStorage.getItem('token');

fetch(apiUrl, {
  method: 'GET',
  headers: {
    'Authorization': `Token ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})
.then(response => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
})
.then(data => {
  reportContainer.innerHTML = '';
  data.forEach(item => {
    const imageUrl = item.image ? `http://127.0.0.1:8000${item.image}` : 'default-image-url.jpg';
    reportContainer.innerHTML += `
      <div class="report-card" data-report-id="${item.id}" style="background-color: #f7f7f7; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); margin-bottom: 20px;">
        <h2 style="margin-top: 0;">${item.title}</h2>
        <img src="${imageUrl}" alt="${item.title}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 10px;">
        <p><strong>Description:</strong> ${item.description}</p>
        <p><strong>Status:</strong> ${item.status}</p>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Location Last Seen:</strong> ${item.location_last_seen}</p>
        <p><strong>Date Lost:</strong> ${item.date_lost}</p>
        <p><strong>Tags:</strong> ${item.tags.map(tag => tag.name).join(', ')}</p>
        <button onclick="postItem(${item.id})">Post to Public</button>
        <button onclick="deleteReport(${item.id})">Delete Report</button>
      </div>
    `;
  });
})
.catch(error => console.error(error));

function postItem(id) {
  fetch(`${'http://127.0.0.1:8000/api/item/items/'}${id}/`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: 'posted' }),
  })
  .then(response => {
    if (response.ok) {
      window.location.href = `view-found.html?id=${id}`;
    } else {
      alert(`Error posting item ${id}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));
}

function deleteReport(id) {
  fetch(`${'http://127.0.0.1:8000/api/item/items/'}${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    if (response.ok) {
      const reportCard = document.querySelector(`.report-card[data-report-id="${id}"]`);
      if (reportCard) {
        reportCard.remove();
      }
      alert(`Item ${id} has been deleted successfully!`);
    } else {
      alert(`Error deleting report ${id}`);
    }
  })
  .catch(error => console.error(error));
}
