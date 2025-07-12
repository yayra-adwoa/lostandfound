function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const tags = formData.get('tags').split(',').map(tag => tag.trim()).join(',');
  formData.set('tags', JSON.stringify(tags.split(',').map(tag => ({ name: tag }))));

  fetch('http://127.0.0.1:8000/api/item/items/', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`
    },
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    alert('✅ Item reported successfully!');
    event.target.reset(); // Reset the form fields
  })
  .catch(error => {
    console.error(error);
    alert('❌ Error submitting form. Please try again!');
  });
}
