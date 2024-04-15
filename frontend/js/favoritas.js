window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);
  let favoritos;
  localStorage.getItem("favoritos") ? favoritos = JSON.parse(localStorage.getItem("favoritos")) : localStorage.setItem("favoritos","[]")

  // Aqui debemos agregar nuestro fetch

  const getMovies = async () => {
    if (favoritos.length > 0){
      const response = await fetch('http://localhost:3031/api/movies');
      const movies = await response.json()
      const moviesFavoritas = movies.data.filter( elemento => favoritos.includes(`${elemento.id}`))
      return moviesFavoritas  
    }else{
      return []
    }
  }

  // Codigo que debemos usar para mostrar los datos en el frontend
    getMovies().then(res => {
    console.log("res",res);
    let data = res;
    if (data.length > 0) {
      data.forEach((movie) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");
  
        const h1 = document.createElement("h1");
        h1.textContent = movie.title;
  
        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;
  
        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;
  
        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Genero: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        card.appendChild(duracion);
      });
    }else{
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = 'No tiene peliculas Favoritas';

      card.appendChild(h1);
      container.appendChild(card);
    }
    
  })
};
