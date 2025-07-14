const token = localStorage.getItem('token');

if (token) {
  fetch('http://127.0.0.1:8000/api/item/items/', {
    method: 'GET',
    headers: {
      'Authorization': `Token ${token}`,
    },
  })
  .then(response => response.json())
  .then(data => {
    const postedItems = data.filter(item => item.status === 'posted');
    const itemContainer = document.getElementById('item-container');

    // Test image
    const testImageHTML = `
      <img src="https://picsum.photos/200/300" alt="Test Image" />
    `;
    itemContainer.innerHTML += testImageHTML;

    postedItems.forEach(item => {
      console.log(item.image); // Verify the image URL
      const itemHTML = `
        <div class="item-card">
          <img src="http://127.0.0.1:8000/static/media/${item.image}" alt="${item.title}" />
          <h4>${item.title}</h4>
          <p>${item.description}</p>
        </div>
      `;
      itemContainer.innerHTML += itemHTML;
    });
  })
  .catch(error => console.error(error));
} else {
  console.log('No token found');
}
