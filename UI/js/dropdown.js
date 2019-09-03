// eslint-disable-next-line func-names
window.onload = () => {
  const showLogout = document.getElementById('myName');
  showLogout.addEventListener('click', () => {
    document.getElementById('myDropdown').classList.toggle('show');
  });
  window.onclick = (event) => {
    if (!event.target.matches('.dropbtn')) {
      const dropdowns = document.getElementsByClassName('dropdown-content');
      let i;
      // eslint-disable-next-line no-plusplus
      for (i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  };
};
