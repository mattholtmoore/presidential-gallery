const searchButton = document.querySelector('button');

const search = async (event) => {
  const searchTerm = document.querySelector('input').value.trim()

  if (searchTerm != null && searchTerm != '') {
    const response = await fetch('/search', {
      method: 'POST',
      body: JSON.stringify({ searchTerm }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      const data = await response.json();
      document.location.replace(`/president/${data.id}`);
      console.log(data)
    } else {
      alert(response.statusText);
    }
  } else {
    alert('Please input a search term')
  }
}

searchButton.addEventListener('click', search)