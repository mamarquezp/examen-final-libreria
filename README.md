# examen-final-libreria
Este repositorio contiene la solución propuesta para el examen parcial II Programación 2025

Consta de un menú principalcon 9 opciones, cada una manda a llamar una función (8 en total) y la última finaliza el programa. Al iniciar límpia la consola para desplegar el menú por primera vez. 

=> Agregar libro: permite añadir un libro nuevo al catálogo ya existente. Se solicita el título, autor, precio (debe ser un número mayor a 0, puede ser decimal.), año de publicación.

=> Mostrar catálogo: Muestra todos los libros cargados al sistema.

=> Buscar libro por título: Permite la búsqueda de un título específico, recupera y muestra la información del libro en caso de encontrarlo. Si no, indica que no lo encontró. La búsqueda no es sensible a mayúsculas o minúsculas.

=> Eliminar libro: Solicita un título, si lo encuentra lo elimina, si no, indica que no lo encontró.

=> Ver estadísticas: Muestra la cantidad total de libros en el arreglo, promedia sus precios, muestra el libro más antiguo y el más caro.

=> Ordenar libros: Permite elegir un criterio de ordenación y muestra el listado ordenado por ese criterio.

=> Editar libro: Busca un libro por título y permite modificar sus datos, da la opción de dejar en blanco para los campos título y autor, o ingresar un 0 para precio y año para dejar sin modificación ese campo (muestra el actual), por lo que mantiene los originales si no se ingresa uno nuevo.

=> (Extra) Filtrar por autor: Permite ingresar el nombre de un autor y lista todos los libros que coinciden con el nombre ingresado.

=> Salir: Finaliza la ejecución del programa


*Se quitó los acentos y la "ñ" de las salidas con readline-sync por problemas en su impresión.*

