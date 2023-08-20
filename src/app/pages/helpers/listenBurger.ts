const listenBurger = (content: HTMLElement) => {
  const burger = content.querySelector('.burger-btn');
  if (burger) {
    burger.addEventListener('click', () => {
      const menu = content.querySelector('.nav-desktop');
      if (menu) {
        menu.classList.toggle('show');
        burger.classList.toggle('show');
      }
    });
  }
};

export default listenBurger;
