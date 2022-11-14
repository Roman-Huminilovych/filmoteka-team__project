export function changeBgIfQueryIsUkr(query) {
  const bgContainer = document.querySelector('.header--main');

  if (!query.toLowerCase().includes('ukrain')) {
    bgContainer.removeAttribute('style');

    return;
  } else {
    if (screen.width < 768) {
      const image =
        'url(https://i.scdn.co/image/ab67616d0000b273440d6349d46e9b3b1febda98)';
      bgContainer.style.backgroundImage = image;
      bgContainer.style.backgroundPosition = 'left bottom 45%';
    } else if (screen.width < 1280) {
      // тут либо от мобильного, либо от десктопного варианта не определилась.
      // Мобильный не совсем помещается, а в десктопном приходится добавлять  этот градиент странный для закрывания куска надпиcи :/
      const image =
        'linear-gradient(rgb(229 175 25/90%) 2%, rgb(229 175 25 / 75%) 12%, transparent 70%), url(https://www.shutterstock.com/image-photo/sunflower-blue-heart-shaped-center-600w-2018098397.jpg)';
      bgContainer.style.backgroundImage = image;
      bgContainer.style.backgroundPosition = 'bottom 7% left';
      /* const image = 'url(https://i.scdn.co/image/ab67616d0000b273440d6349d46e9b3b1febda98)';
            bgContainer.style.backgroundImage =image;     
            bgContainer.style.backgroundPosition = 'bottom 45% left';*/
    } else {
      const image =
        'url(https://www.shutterstock.com/image-photo/sunflower-blue-heart-shaped-center-600w-2018098397.jpg)';

      bgContainer.style.backgroundImage = image;
      bgContainer.style.backgroundPosition = 'bottom 15% left';
    }
  }
}
