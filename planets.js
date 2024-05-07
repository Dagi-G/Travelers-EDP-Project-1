
// Runs on page load



const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')

const url = 'https://swapi2.azurewebsites.net/api/planets/?id=' + id;

// Fetch data using fetch API
fetch(url)
  .then(response => {
    // Check if response is successful (status code between 200 and 299)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse JSON response
    return response.json();
  })
  .then(data => {
    // Handle the data
    console.log('Data:', data);
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });