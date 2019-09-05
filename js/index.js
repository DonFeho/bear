const ui = new UI('main');
ui.renderDefault();

const main = new Render('./data/portfolio.json');
main.renderGalery();
main.renderMainProjects();
