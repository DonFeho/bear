
const gal = new UI('gal');
gal.renderDefault();
const Gal = new Render('./data/portfolio.json');
Gal.renderGaleryGrid();

const scrollTop = () => $(document).scrollTop(0);

document.body.addEventListener('click', function (e) {
  e.preventDefault;
  let elem = new Object(e);
  let current = elem.srcElement.textContent;
  let onClick = e.target;
  let onclickId = e.target.id;
  if (onClick.classList.contains('activate')) {
    document.getElementById('galery').classList.remove('d-none');
    const Series = new Render('./data/pictures.json');
    Series.renderSeries(onclickId);
    document.getElementById('galeryGrid').classList.add('d-none');
    document.querySelector('.sName').innerHTML = current;
    scrollTop();
    console.log('Good');
  }
});
document.addEventListener('click', function (e) {
  e.preventDefault;

  let onClick = e.target;
  if (onClick.classList.contains('btn-gal')) {
    document.getElementById('galery').classList.add('d-none');
    document.getElementById('galeryGrid').classList.remove('d-none');
    scrollTop();
    console.log('Good');
  }
});
