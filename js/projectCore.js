const pr = new UI('pr');
pr.renderDefault();
const Project = new Render('./data/portfolio.json');
Project.renderProjects();

const scrollTop = () => $(document).scrollTop(0);

document.body.addEventListener('click', function (e) {
  e.preventDefault;
  let elem = new Object(e);
  let current = elem.srcElement.textContent;
  let onClick = e.target;
  let onclickId = e.target.id;
  // console.log(current);
  if (onClick.classList.contains('activate')) {
    document.getElementById('galery').classList.remove('d-none');
    const Series = new Render('./data/pictures.json');
    Series.renderSeries(onclickId);
    document.getElementById('projects').classList.add('d-none');
    Project.renderProjects();
    document.querySelector('.sName').innerHTML = current;
    scrollTop();
    console.log(current);
  } else {
    console.log('Err');
  }

});
document.addEventListener('click', function (e) {
  e.preventDefault;
  let onClick = e.target;
  if (onClick.classList.contains('btn-gal')) {
    document.getElementById('galery').classList.add('d-none');
    document.getElementById('projects').classList.remove('d-none');
    scrollTop();
    console.log('Good');
  }
});
