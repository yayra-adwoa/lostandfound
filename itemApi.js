javascript
const itemApiUrl = 'http://127.0.0.1:8000/api/item';

async function listItems() {
  const response = await fetch(`${itemApiUrl}/`);
  return response.json();
}

async function createItem(title, description, status, category, locationLastSeen, dateLost) {
  const response = await fetch(`${itemApiUrl}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
      status,
      category,
      location_last_seen: locationLastSeen,
      date_lost: dateLost,
    }),
  });

  return response.json();
}

async function viewItemDetails(id) {
  const response = await fetch(`${itemApiUrl}/${id}/`);
  return response.json();
}

async function updateItem(id, title, description, status, category, locationLastSeen, dateLost) {
  const response = await fetch(`${itemApiUrl}/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
      status,
      category,
      location_last_seen: locationLastSeen,
      date_lost: dateLost,
    }),
  });

  return response.json();
}

async function deleteItem(id) {
  const response = await fetch(`${itemApiUrl}/${id}/`, {
    method: 'DELETE',
  });

  return response.ok;
}

