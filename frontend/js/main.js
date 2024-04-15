window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  const header = document.querySelector(".header");
  container.setAttribute("class", "container");
  app.appendChild(container);
  let favoritos;
  localStorage.getItem("favoritos") ? favoritos = JSON.parse(localStorage.getItem("favoritos")) : localStorage.setItem("favoritos","[]")

  // Aqui debemos agregar nuestro fetch
  const getMovies = async () => {
    const response = await fetch('http://localhost:3031/api/movies');
    const movies = await response.json()
    return movies.data
  }

  window.addEventListener("storage", () => {
    if (favoritos.length > 0) {

    }
  })

  getMovies().then(res => {
      // Codigo que debemos usar para mostrar los datos en el frontend
      let data = res;

      const botonFavoritos = document.createElement('a')
      botonFavoritos.innerText = 'Mis películas favoritas';
      botonFavoritos.href = `http://${window.location.hostname}:${window.location.port}/frontend/favoritas.html`
      botonFavoritos.style.background = "blue";
      botonFavoritos.style.color = "white";
      botonFavoritos.style.padding = "10px";
      botonFavoritos.style.borderRadius = "5px";
      botonFavoritos.style.textDecoration = "none";
      botonFavoritos.style.fontWeight = "bold";

      if (favoritos.length <= 0) {
        botonFavoritos.style.display = 'none';
        botonFavoritos.style.visibility = 'hidden';
      }else{
        botonFavoritos.style.display = 'inline';
        botonFavoritos.style.visibility = 'visible';
      }

      header.appendChild(botonFavoritos);

      data.forEach((movie) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");
  
        const h1 = document.createElement("h1");
        h1.textContent = movie.title;
  
        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;
  
        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;

        const star = document.createElement("i")
        if (favoritos.includes(`${movie.id}`)){
          star.classList.add("fa-solid"); 
        }else{
          star.classList.add("fa-regular"); 
        }
        star.classList.add("fa-star");
        star.id = movie.id
        star.style.color = "yellow"
        star.style.fontSize = "2rem"

        star.addEventListener('click',function(e) {
          
          if (favoritos.includes(e.target.id)){
            favoritos = favoritos.filter(element => element != e.target.id)
          }else{
            favoritos.push(e.target.id)  
          }
          
          localStorage.setItem('favoritos',JSON.stringify(favoritos))
          
          e.target.classList.toggle('fa-solid');
          e.target.classList.toggle('fa-regular');
        })

        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Genero: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        card.appendChild(duracion);
        card.appendChild(star);
      });
  })
  
};
