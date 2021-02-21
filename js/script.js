
// Contacts map

ymaps.ready(init);

function init() {
  const map = new ymaps.Map('map', {
    center: [59.939420, 30.329657],
    zoom: 16,
    controls: ['zoomControl'],
    behaviors: ['drag']
  });

  const placemark = new ymaps.Placemark([59.938635, 30.323118], {
    hintContent: '<div class="contacts__hint">ул. Большая Конюшенная, 19/8</div>',
    },
    {
    iconLayout: 'default#image',
    iconImageHref: 'img/icons/pin-map.svg',
    iconImageSize:  [80, 140],
    iconImageOffset: [-30, -153]
  });

  map.geoObjects.add(placemark);
}
