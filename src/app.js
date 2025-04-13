/* Examen parcial 2
Mike Alexander Márquez Paiz
Carnet 2500021*/

require('colours')
const inquirer = require('inquirer')
const readline = require('readline-sync')

let catalogo = [
    {titulo: "El Principito", autor: "Antoine de Saint-Exupery", precio: 150.50, añoPublicacion: 1943},
    {titulo: "Cien Años de Soledad", autor: "Gabriel Garcia Marquez", precio: 220.00, añoPublicacion: 1967}, //se quitaron los acentos para la búsqueda
    {titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", precio: 250.00, añoPublicacion: 1605},
    {titulo: "El Tercer Patio", autor: "Adolfo Mendez Vides", precio: 180.75, añoPublicacion: 2003},
    {titulo: "Los Ojos del Perro Siberiano", autor: "Antonio Santa Ana", precio: 180.75, añoPublicacion: 1998}
]

function agregarLibro() {
    console.log("---- Agregar Nuevo Libro ----".cyan)
    const titulo = readline.question("Ingrese el titulo del libro: ")
    const autor = readline.question("Ingrese el autor del libro: ")


    let precio //para forzar su validación en un ciclo while antes de asignarlo
    while (true) {
        const precioValidado = readline.questionFloat("Ingrese el precio del libro: ", {
            limitMessage: `Precio invalido. Por favor, ingrese un numero positivo.`.red})

        // Validar si es mayor que 0
        if (precioValidado > 0) {
            precio = precioValidado
            break
        } else {
            console.log(`Precio invalido. Por favor, ingrese un numero mayor que 0.`.red);
        }
    }


    /*const precio = readline.questionFloat("Ingrese el precio del libro: ", {
        limitMessage: `Precio invalido. Por favor, ingrese un numero positivo.`.red, //Se añadió mensaje personalizado para cuando el valor ingresado no es válido
        //min: 0 //Se descartó porque no obligaba a cumplirse la condición 
        //limit: function (input) { //Descartada también por no forzar a que se cumpla
            const precioInput = parseFloat(input)
            return !isNaN(precioInput) && precioInput > 0
        } //validación de precio positivo
    })*/

    const añoPublicacion = readline.questionInt("Ingrese el ano de publicacion: ", {
        limitMessage: (`Ano invalido. Por favor, ingrese un numero entero valido.`.red),//Mensaje personalizado
    })


    const nuevoLibro = { titulo, autor, precio, añoPublicacion }
    catalogo.push(nuevoLibro)
    console.log(`"${titulo}" ha sido agregado al catálogo.`.green)
}

function mostrarCatalogo() {
    console.log(`---- Catálogo de Libros ----`.cyan)
    if (catalogo.length === 0) {
        console.log(`El catálogo está vacío.`) //Validación para indicar si está vacío 
        return
    }
    catalogo.forEach(libro => { //para cada elemento "libro" dentro de Catálogo realiza el despliegue de esta información siguiendo el formato.
        console.log(
            `- Título: ` + `${libro.titulo}`.blue +
            `, Autor: ` + `${libro.autor}`.blue +
            `, Precio: ` + `Q${libro.precio.toFixed(2)}`.magenta +
            `, Año: ` + `${libro.añoPublicacion}`.magenta
        )
    })
    console.log("--------------------------".cyan)
}

function buscarLibroPorTitulo() {
    console.log("---- Buscar Libro por Título ----")
    const tituloBuscado = readline.question("Ingrese el titulo del libro a buscar: ")

    const libroEncontrado = catalogo.find(libro => libro.titulo.toLowerCase() === tituloBuscado.toLowerCase()) //Se realiza la búsqueda quitando mayusculas para que coincidan los resultados

    if (libroEncontrado) { //muestra los datos completos del libro encontrado
        console.log("Libro encontrado:".green)
        console.log(
            `- Título: ` + `${libroEncontrado.titulo}`.blue +
            `, Autor: ` + `${libroEncontrado.autor}`.blue +
            `, Precio: ` + `Q${libroEncontrado.precio.toFixed(2)}`.magenta +
            `, Año: ` + `${libroEncontrado.añoPublicacion}`.magenta
        )
    } else {
        console.log(`Libro con título "${tituloBuscado}" no encontrado.`.red)
    }
}

function eliminarLibro() {
    console.log("------ Eliminar Libro ------")
     if (catalogo.length === 0) {
        console.log("El catálogo está vacío, no hay libros para eliminar.".red)
        return
    }
    const tituloAEliminar = readline.question("Ingrese el titulo del libro a eliminar: ")
    const tituloMinusculas = tituloAEliminar.toLowerCase()

    const indiceAEliminar = catalogo.findIndex(libro => libro.titulo.toLowerCase() === tituloMinusculas);

    if (indiceAEliminar !== -1) { //valor -1 indica que no se encontró el libro, por eso la negación de la condición
        catalogo.splice(indiceAEliminar, 1)
        console.log(`Libro "${tituloAEliminar}" eliminado correctamente.`.green);
    } else {
        console.log(`Libro con título "${tituloAEliminar}" no encontrado.`.red)
    }
}

function verEstadisticas() {
    console.log(`----- Estadísticas del Catálogo -----`.cyan)
    const cantidadLibros = catalogo.length

    if (cantidadLibros === 0) {
        console.log("No hay libros en el catálogo para calcular estadísticas.") //valida si no hay elementos antes de hacer cualquier proceso
        return
    }

    const sumaPrecios = catalogo.reduce((acumulador, libro) => acumulador + libro.precio, 0)
    const precioPromedio = sumaPrecios / cantidadLibros

    let libroMasAntiguo = catalogo[0]
    let libroMasCaro = catalogo[0]

    for (const libroActual of catalogo) { //ciclo para recorrer el arreglo 1 sola vez buscando ambos atributos
        if (libroActual.añoPublicacion < libroMasAntiguo.añoPublicacion) {
            libroMasAntiguo = libroActual
        }
        if (libroActual.precio > libroMasCaro.precio) {
            libroMasCaro = libroActual
        }
    }

    console.log(`- Cantidad total de libros: ` + `${cantidadLibros}`.green)
    console.log(`- Precio promedio: ` + `Q${precioPromedio.toFixed(2)}`.green)
    console.log(`- Libro más antiguo: ` + `${libroMasAntiguo.titulo}`.blue) + ` (${libroMasAntiguo.añoPublicacion})`.magenta
    console.log(`- Libro más caro: ` + `${libroMasCaro.titulo}`.blue + ` Q${libroMasCaro.precio.toFixed(2)}`.magenta)
    console.log("---------------------------------------------------------")
}

async function ordenarLibros() {
    console.log(`---- Ordenar Catálogo ----`)
    if (catalogo.length === 0) {
        console.log("El catálogo está vacío, no hay nada que ordenar.")
        return
    }

    const promptMenuOrden = [{
            type: 'list',
            name: 'criterio',
            message: ('¿Cómo deseas ordenarlo?:'),
            choices: [
                { name: 'Precio (Ascendente)', value: 'precioAscendente' },
                { name: 'Precio (Descendente)', value: 'precioDescendente' },
                { name: 'Año de publicación (Ascendente)', value: 'añoAscendente' },
                { name: 'Año de publicación (Descendente)', value: 'añoDescendente' },
                { name: 'Cancelar', value: 'cancelar' }
            ]
        }]

        const respuesta = await inquirer.default.prompt(promptMenuOrden)
        const criterioSeleccionado = respuesta.criterio

        switch (criterioSeleccionado) {
            case 'precioAscendente':
                catalogo.sort((a, b) => a.precio - b.precio);
                console.log(`Catálogo ordenado por precio ascendente.`.green)
                mostrarCatalogo()
                break
            case 'precioDescendente':
                catalogo.sort((a, b) => b.precio - a.precio)
                console.log(`Catálogo ordenado por precio descendente.`.green)
                mostrarCatalogo()
                break
            case 'añoAscendente':
                catalogo.sort((a, b) => a.añoPublicacion - b.añoPublicacion)
                console.log(`Catálogo ordenado por año de publicación ascendente.`.green)
                mostrarCatalogo()
                break
            case 'añoDescendente':
                catalogo.sort((a, b) => b.añoPublicacion - a.añoPublicacion)
                console.log(`Catálogo ordenado por año de publicación descendente.`.green)
                mostrarCatalogo()
                break
            case 'cancelar':
                 console.log(`Ordenamiento cancelado`)
                 break
        }
    }
        

function editarLibro() {
    console.log(`---- Editar Libro ----`.cyan)
     if (catalogo.length === 0) {
        console.log(`El catálogo está vacío`.red)
        return
    }
    const tituloAEditar = readline.question(`Ingrese el titulo del libro que desea editar: `)
    const libroAEditar = catalogo.find(libro => libro.titulo.toLowerCase() === tituloAEditar.toLowerCase())

    if (!libroAEditar) { //valida si no lo encuentra
        console.log(`Libro con título "${tituloAEditar}" no encontrado.`.red)
        return
    }

    console.log(`Libro encontrado.`.green + ` Ingrese los nuevos datos (deje en blanco para no cambiar):`)

    const nuevoTitulo = readline.question(`Nuevo titulo (${libroAEditar.titulo}): `)
   // libroAEditar.titulo = nuevoTitulo
    const nuevoAutor = readline.question(`Nuevo autor (${libroAEditar.autor}): `)
   // libroAEditar.autor = nuevoAutor
   let nuevoPrecio //para forzar su validación en un ciclo while antes de asignarlo
   while (true) {
       const precioValidado = readline.questionFloat(`Ingrese el precio del libro (${libroAEditar.precio}): `, {
           limitMessage: `Precio invalido. Por favor, ingrese un número positivo o 0 para dejar sin cambios.`.red})

       // Validar si es mayor que o igual a 0 (en caso se quiera dejar sin cambios
       if (precioValidado >= 0) {
           nuevoPrecio = precioValidado
           break
       } else {
           console.log(`Precio invalido. Por favor, ingrese un número positivo o 0 para dejar sin cambios.`.red);
       }
   }
        //libroAEditar.precio = nuevoPrecio

    const nuevoAño = readline.questionInt(`Ingrese el ano de publicacion (${libroAEditar.añoPublicacion}): `, {
        limitMessage: `Ano invalido. Por favor, ingrese un numero entero valido o 0 para dejar el valor anterior.`.red//Mensaje personalizado
    })
    //libroAEditar.añoPublicacion = nuevoAño

//se cambió la actualización hasta el final de los inputs del usuario validando si hubo cambio o no
    if (nuevoTitulo != ""){
        libroAEditar.titulo = nuevoTitulo
    }
    if (nuevoAutor != ""){
        libroAEditar.autor = nuevoAutor
    }    
    if (nuevoPrecio != 0){
        libroAEditar.precio = nuevoPrecio
    }  
    if (nuevoAño != 0){
        libroAEditar.añoPublicacion = nuevoAño
    }        
    

    console.log(`Libro "${tituloAEditar}" actualizado correctamente.`.green)
}

function filtrarPorAutor() {
    console.log(`--- Filtrar Libros por Autor ---`)
     if (catalogo.length === 0) {
        console.log(`El catálogo está vacío.`)
        return
    }
    const autorBuscado = readline.question(`Ingrese el nombre del autor a filtrar: `)
    const autorMinusculas = autorBuscado.toLowerCase()

    const librosDelAutor = catalogo.filter(libro => libro.autor.toLowerCase().includes(autorMinusculas))//lista de libros que coinciden con el autor indicado 

    if (librosDelAutor.length > 0) {
        console.log(`Libros encontrados del autor "${autorBuscado}":`.green)
         librosDelAutor.forEach(libro => {
            console.log(
                `- Título: ` + `${libro.titulo}`.blue +
                `, Autor: ` + `${libro.autor}`.blue +
                `, Precio: ` + `Q${libro.precio.toFixed(2)}`.magenta +
                `, Año: ` + `${libro.añoPublicacion}`.magenta
            )
        })
    } else {
        console.log(`No se encontraron libros del autor "${autorBuscado}".`.red)
    }
     console.log(`--------------------------------------`.cyan)
}

async function menuPrincipal() {
    let salir = false
    while (!salir) {
            const opcionMenu = [{
                    type: 'list',
                    name: 'opcion',    
                    message: `---- Librería 'El Rincón del Saber' ---- \nSeleccione una opción:`,
                    choices: [
                        { name: '1. Agregar libro', value: '1' },
                        { name: '2. Mostrar catálogo', value: '2' },
                        { name: '3. Buscar libro por título', value: '3' },
                        { name: '4. Eliminar libro', value: '4' },
                        { name: '5. Ver estadísticas', value: '5' },
                        { name: '6. Ordenar libros', value: '6' },
                        { name: '7. Editar libro', value: '7' },
                        { name: '8. Filtrar por autor', value: '8' },
                        { name: '9. Salir', value: '9' }
            ]
        }]

        const { opcion } = await inquirer.default.prompt(opcionMenu)


            switch (opcion) {
                case '1':
                    agregarLibro()
                    break
                case '2':
                    mostrarCatalogo()
                    break
                case '3':
                    buscarLibroPorTitulo()
                    break
                case '4':
                    eliminarLibro()
                    break
                case '5':
                    verEstadisticas()
                    break
                case '6': 
                    await ordenarLibros()
                    break
                case '7':
                    editarLibro()
                    break
                case '8':
                    filtrarPorAutor()
                    break
                case '9':
                    salir = true;
                    console.log(`\n¡Gracias por usar el sistema! \n¡Hasta pronto!`.gray)
                    break
            }
        }
    }

console.clear() //se limpia pantalla al iniciar
console.log(`Bienvenido al Sistema de Gestión de Librería`.yellow)
menuPrincipal()