const menu_home = document.getElementById('menu_home');
const menu_list = document.getElementById('menu_list');
const menu_info = document.getElementById('menu_info');

menu_home.addEventListener('click', e => {
  window.location.href = './home.html'
});

menu_list.addEventListener('click', e => {
  window.location.href = './list.html'
});

menu_info.addEventListener('click', e => {
  window.location.href = './info.html'
});