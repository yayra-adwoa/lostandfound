const token = localStorage.getItem("token");

function getStatusText(status, location) {
  switch (status) {
    case "lost":
      return `Lost at ${location}`;
    case "found":
      return `Found at ${location}`;
    case "posted":
      return `Posted at ${location}`;
    default:
      return "";
  }
}

// Fetch items from backend API with token authentication
fetch("http://127.0.0.1:8000/api/item/items", {
  headers: {
    Authorization: `Token ${token}`,
  },
})
.then((response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
})
.then((data) => {
  const lostItemsContainer = document.querySelector("#lost-items .items");
  const foundItemsContainer = document.querySelector("#found-items .items");

  if (!lostItemsContainer || !foundItemsContainer) {
    console.error("Error: Could not find lost or found items container");
    return;
  }

  lostItemsContainer.innerHTML = "";
  foundItemsContainer.innerHTML = "";

  if (!Array.isArray(data)) {
    console.error("Error: Expected an array of items, but got:", data);
    return;
  }

  data.forEach((item) => {
    const itemHTML = `
      <div class="item-card">
        <img src="http://127.0.0.1:8000${item.image}" alt="${item.title}" />
        <h4>${item.title}</h4>
        <p>${getStatusText(item.status, item.location)}</p>
      </div>
    `;

    if (item.status === "lost") {
      lostItemsContainer.insertAdjacentHTML("beforeend", itemHTML);
    } else if (item.status === "found" || item.status === "posted") {
      foundItemsContainer.insertAdjacentHTML("beforeend", itemHTML);
    }
  });
})
.catch((error) => {
  console.error("Error fetching items:", error);
  // You could also display an error message to the user here
});
