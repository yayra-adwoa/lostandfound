
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
    console.log(data); // Verify the API response
    const postedItems = data.filter(item => item.status === 'posted');
    const itemContainer = document.getElementById('item-container');

    // Test image
    const testImageHTML = `
      <img src="https://picsum.photos/200/300" alt="Test Image" />
    `;
    itemContainer.innerHTML += testImageHTML;

    postedItems.forEach(item => {
      console.log(`Item Image: ${item.image}`); // Verify the value of item.image
      if (item.image) {
        const imageUrl = `http://127.0.0.1:8000${item.image}`;
        console.log(`Image URL: ${imageUrl}`);
        const itemHTML = `
          <div class="item-card">
            <img src="${imageUrl}" alt="${item.title}" />
            <h4>${item.title}</h4>
            <p>${item.description}</p>
          </div>
        `;
        itemContainer.innerHTML += itemHTML;
      } else {
        console.log(`No image found for item ${item.title}`);
        const itemHTML = `
          <div class="item-card">
            <h4>${item.title}</h4>
            <p>${item.description}</p>
          </div>
        `;
        itemContainer.innerHTML += itemHTML;
      }
    });
  })
  .catch(error => console.error(error));
} else {
  console.log('No token found');
}
