window.onload = () => {
    const querys = window.location.search
    const params = new URLSearchParams(querys)
    const id = params.get('id')

    const crear = document.querySelector('#Crear')
    const editar = document.querySelector('#Editar')
    const borrar = document.querySelector('.botonBorrar')

    const title = document.querySelector('#title')
    const rating = document.querySelector('#rating')
    const awards = document.querySelector('#awards')
    const release_date = document.querySelector('#release_date')
    const length = document.querySelector('#length')
    const form = document.querySelector('.formulario')

    const getData = async (id) => {
        const response = await fetch(`http://localhost:3031/api/movies/${id}`)
        const movie = await response.json();
        return movie.data
    }

    if (id) {
        console.log(editar);
        editar.disabled = false;
        getData(id).then(res => {

            const fecha = new Date(res.release_date)
            const y = fecha.getFullYear();
            const m = fecha.getMonth();
            const d = fecha.getDay();
            const fullyear = m >= 10 ? d >= 10 ? `${y}-${m}-${d}`:`${y}-${m}-0${d}`: `${y}-0${m}-0${d}` ;
            
            title.value = res.title;
            rating.value = res.rating;
            awards.value = res.awards;
            release_date.value = fullyear;
            length.value = res.length;
        })
    }else{
        crear.disabled = false
        borrar.disabled = true
    }

    form.addEventListener('submit',function(e) {
        e.preventDefault()
    })

    editar.addEventListener('click',function () {
        if (id) {
            const obj = {
                title : title.value,
                rating : rating.value,
                awards : awards.value,
                release_date : release_date.value,
                length : length.value
            }
    
            fetch(`http://localhost:3031/api/movies/update/${id}`,{
                method:'PUT',
                body:JSON.stringify(obj),
                headers:{'Content-Type':'application/json'}
            }).then(res => {
                window.location.href = `http://${window.location.hostname}:${window.location.port}/frontend/home.html`
            }).catch(err => {
                console.log(err);
            })
        }
    })

    borrar.addEventListener('click',function (params) {
        if (id) {
            fetch(`http://localhost:3031/api/movies/delete/${id}`,{
                method:'DELETE'
            }).then(res => {
                window.location.href = `http://${window.location.hostname}:${window.location.port}/frontend/home.html`
            }).catch(err => {
                console.log(err);
            })
        }
    })

    crear.addEventListener('click',function (params) {
        if (!id) {
            const obj = {
                title : title.value,
                rating : rating.value,
                awards : awards.value,
                release_date : release_date.value,
                length : length.value
            }
    
            fetch(`http://localhost:3031/api/movies/create`,{
                method:'POST',
                body:JSON.stringify(obj),
                headers:{'Content-Type':'application/json'}
            }).then(res => {
                window.location.href = `http://${window.location.hostname}:${window.location.port}/frontend/home.html`
            }).catch(err => {
                console.log(err);
            })
        }
    })
}