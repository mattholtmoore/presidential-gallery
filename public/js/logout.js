const logout = async () => {
  
  const res = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (res.ok) {
    document.location.replace('/login');
  } else {
    alert(res.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', logout);
