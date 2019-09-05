class UI {
  constructor(page) {
    this.page = page;
    this.footer = ` 
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-10">
            <p class="font-weight-bold mt-3 text-left"> Л.Медвідь &copy; 2019
            </p>
          </div> 
          <div class="col-md-2">
            <span class="">
              <a href="https://www.facebook.com/profile.php?id=100009087495993" target="_blank" title="Facebook">
                <i class="fab fa-2x fa-facebook-square"></i>
              </a>
            </span>
            <span class="">
              <a href="mailto:lyubomurmedvid@gmail.com" target="" title="">
                <i class="fas fa-2x fa-envelope"></i>
              </a>
            </span>
          </div>
        </div>
      </div>     
    
    `;

    this.navBar = `
      <div class="container-fluid">
        <a href="index.html" class="navbar-brand">
          <img src="a-img/logo.png" class="img-fluid" width="260" height="55" alt="">
        </a>
        <!-- Toggler -->
        <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
          <span class="navbar-toggler-icon">
            <i class="fas fa-bars text-white"></i>
          </span>
        </button>
        <!-- NAV -->
        <div id="navbarCollapse" class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <!-- AP selector -->
            <li class="nav-item">
              <a href="index.html" class="nav-link"> ГОЛОВНА </a>
            </li>
            <li class="nav-item">
              <a href="about.html" class="nav-link"> ПРО МЕНЕ</a>
            </li>
            <li class="nav-item">
              <a href="galery.html" class="nav-link"> ГАЛЕРЕЯ</a>
            </li>
            <li class="nav-item">
              <a href="projects.html" class="nav-link"> ПРОЕКТИ</a>
            </li>
          </ul>
        </div>
      </div> 
    `;
  }

  renderDefault() {
    document.getElementById('navbar-output').innerHTML = this.navBar;
    document.getElementById('main-footer').innerHTML = this.footer;
  }
}

class Render {
  constructor(data) {
    this.data = data;

    this.slides = '';
    this.sliderInit = function () {
      $(document).ready(function () {
        $('.slickSlider').slick({
          dots: true,
          infinite: true,
          autoplay: true,
          speed: 700,
          fade: true,
          cssEase: 'ease-in-out',
          arrows: true,
          swipe: true,
          mobileFirst: true,
          pauseOnFocus: true,
          pauseOnDotsHover: true
        });
      });
    };
    this.lightBoxInit = function () {
      //lightbox
      $(document).on('click', '[data-toggle="lightbox"]', function (e) {
        e.preventDefault();
        $(this).ekkoLightbox({
          showArrows: true,
          alwaysShowClose: true
        });
      });
    };
  }

  async fetchAndRender() {
    const response = await fetch(this.data);
    return await response.json();
  }

  renderProjects() {
    this.fetchAndRender().then(units => {
      let output = '';
      units.forEach(unit => {
        if (unit.type === 'projects') {
          output += `
            <div class="col-md-5 col-lg-4 mb-3">
              <div class="card project-card">                        
                <div class="card-body card-img-prgrid pr-${unit.typeId}"> 
                </div>
              </div>
            </div>
            <div class="col-md-7 col-lg-8">
              <div class="card project-card">                   
                <div class="card-footer py-3">
                  <a href="#">
                    <h3 id="${unit.typeId}" class="activate"> проект ${
            unit.name
            } </h3>                    
                  </a>
                  <p> ${unit.more} </p> 
                </div>
              </div>
            </div>              
          `;
        }
      });
      document.getElementById('p-output').innerHTML = output;
    });
  }
  renderGaleryGrid() {
    this.fetchAndRender().then(units => {
      let output = '';
      units.forEach(unit => {
        if (unit.type === 'series') {
          output += `
            <div class="col-md-4 col-lg-4 mb-2">
              <div class="card grid-card">
                <div class="card-body card-img-grid gal-${
            unit.typeId
            } ">          
              </div>                        
              <div class="card-footer">
                <a href="#">
                  <h3 class="mb-0 mt-2 activate" id="${unit.typeId}">${
            unit.name
            }</h3>
                </a> 
                <small>${unit.year}</small>             
                <b class="d-none d-xl-block"> ${unit.more} </b>         
              </div>                  
              </div>
            </div>           
          `;
        }
      });

      document.getElementById('grid-output').innerHTML = output;
    });
  }

  renderSeries(typeId) {
    this.fetchAndRender().then(units => {
      let output = '';

      units.forEach(unit => {
        if (unit.typeId == typeId) {
          output += `
            <div>            
              <div class="card galery-card">
                <div class="card-body"> 
                  <a href="${
            unit.imgLink
            }" data-toggle="lightbox" data-gallery="gallery" data-type="image">
                    <img src="${unit.imgLinkPrev}" class="series-card">
                  </a>                  
                </div> 
                <div class="card-footer text-center">
                  <p class="pt-3">${unit.name}</p>       
                </div>
              </div>
            </div>            
          `;
        }
      });

      this.slides = output;
      document.getElementById('g-output').innerHTML = `
        <div id="sliderGal" class="slickSlider"> </div>
      `;
      document.getElementById('sliderGal').innerHTML = this.slides;
      this.sliderInit();
      this.lightBoxInit();
    });
  }

  renderGalery() {
    this.fetchAndRender().then(units => {
      let output = '';
      units.forEach(unit => {
        if (unit.type === 'series') {
          output += `
            <div>
              <div class="card galery-card">
                <div class="card-body card-img-gal gal-${
            unit.typeId
            }"> </div>                
                <div class="card-footer px-3">
                  <h2 class="mb-0 mt-3">${unit.name}</h2>                  
                  <small>${unit.year}</small>
                  <br>
                  <p class="d-none d-md-block">${
            unit.more
            } </p>                  
                </div>
              </div>
            </div>            
          `;
        }
      });
      this.slides = output;
      document.getElementById('g-output').innerHTML = `
        <div id="sliderGal" class="slickSlider"> </div>
      `;
      document.getElementById('sliderGal').innerHTML = this.slides;
      this.sliderInit();
    });
  }



  renderMainProjects() {
    this.fetchAndRender().then(units => {
      let output = '';
      units.forEach(unit => {
        if (unit.type === 'projects') {
          output += `
            <div class="col-md-4 col-lg-4">
              <div class="card project-card">                        
                <div class="card-body card-img-pr pr-${unit.typeId}"> 
                </div>                
                <div class="card-footer py-3 ml-2">
                   
                  <h3 class="mb-0">БЛУДНИЙ СИН</h3> 
                  <h4> проект <strong> ${
            unit.name
            } </strong> </h4>                    
                                
                </div>
              </div>
            </div>            
          `;
        }
      });
      document.getElementById('p-output').innerHTML = output;
    });
  }
}
