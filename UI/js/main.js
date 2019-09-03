// eslint-disable-next-line func-names
window.onload = () => {
  const showEvent = document.getElementById('show_menu');
  const hideEvent = document.getElementById('hide_menu');
  const menu = document.getElementById('menu_to_show');

  showEvent.addEventListener('click', () => {
    menu.style = 'bottom: 0%';
  });
  hideEvent.addEventListener('click', () => {
    menu.style = 'bottom: 100.5%';
  });

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
