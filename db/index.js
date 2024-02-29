const Pool = require('pg').Pool


const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'postgre',
    password: '',
    port: 5432,
})



const getFilms = (request, response) =>{
    pool.query('SELECT * FROM films ORDER BY year ASC', (error, results) =>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows);
    })
}

const getFilmsById = (request,response) =>{
    const id =  parseInt(request.params.id)
    pool.querty('SELECT * FROM FILMS WHERE id=$1 ',[id],(error, results) =>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createFilm = (request, response) =>{
    const {name, year} = request.body
    pool.query('INSERT INTO films (name, year) VALUES($movie Name, $year) RETURNING *',[name, year], (error, results) =>{
        if (error){
            throw error
        }
        response.status(201).send(`film added with ID: ${results.rows[0].id}`)


    })

    const updateFilm = (request,response) => {
        const id = parseInt(request.params.id);
        const {name, year} = request.body

        pool.query('UPDATE users SET name = $1, year = $2 WHERE id = $3',[name, year,id], (error, results) =>{
            if(error){
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
        )
    }
}

const deleteFilm = (request, response) =>{
    const id = parseInt(request.params.id);
    const {name, year} = request.body
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) =>{
        if(error){
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}


module.exports ={
getFilms, 
getFilmsById,
createFilm,
deleteFilm,
}
