const consultarCarta = async (id, number) => {
    try {
        const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`);
        if (!response.ok) {
            throw new Error("Ocurrió un error al realizar la petición");
        }
        const data = await response.json();
        pintarCarta(data.data[0], number);
    } catch (error) {
        console.log(error);
    }
  };
//   const consultarCartaName = async (name, number) => {
//     try {
//         const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${name}`);
//         if (!response.ok) {
//             throw new Error("Ocurrió un error al realizar la petición");
//         }
//         const data = await response.json();
//         pintarCartaName(data.data[0], number);
//     } catch (error) {
//         console.log(error);
//     }
//   };
  
  consultarCarta();
  //consultarCartaName();
  
  const lista = document.getElementById("listarcartas");
  
  const pintarCarta = (data, id) => {
    let item = lista.querySelector(`#card-${id}`);
    item.querySelector("img").setAttribute("src", data.card_images[0].image_url);
    item.querySelector("h3").textContent = data.name;
    item.querySelector("p").textContent = data.desc;

  };
//   const pintarCartaName = (data, name) => {
//     let item = lista.querySelector(`#card-${name}`);
//     item.querySelector("img").setAttribute("src", data.card_images[0].image_url);
//     item.querySelector("h3").textContent = data.name;
//     item.querySelector("p").textContent = data.desc;

//   };
  
/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
