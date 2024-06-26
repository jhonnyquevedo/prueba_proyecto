SELECT p.id_publicacion AS publicacion_id, p.id_usuario AS usuario_id, p.precio AS precio, m.nombre AS marca, mo.nombre AS modelo, p.year AS año, p.kilometraje AS kilometraje, t.nombre AS transmision, c.nombre AS categoria, e.nombre AS estado, p.descripcion AS descripcion, p.imagen AS imagen FROM publicaciones p JOIN marcas m ON p.id_marca = m.id_marca JOIN modelos mo ON p.id_modelo = mo.id_modelo JOIN transmisiones t ON p.id_transmision = t.id_transmision JOIN  categorias c ON p.id_categoria = c.id_categoria JOIN estados e ON p.id_estado = e.id_estado;

SELECT p.id_publicacion AS publicacion_id, p.id_usuario AS usuario_id, p.precio AS precio, m.nombre AS marca, mo.nombre AS modelo, p.year AS año, p.kilometraje AS kilometraje, t.nombre AS transmision, c.nombre AS categoria, e.nombre AS estado, p.descripcion AS descripcion, p.imagen AS imagen FROM publicaciones p JOIN marcas m ON p.id_marca = m.id_marca JOIN modelos mo ON p.id_modelo = mo.id_modelo JOIN transmisiones t ON p.id_transmision = t.id_transmision JOIN  categorias c ON p.id_categoria = c.id_categoria JOIN estados e ON p.id_estado = e.id_estado

`SELECT p.id_publicacion AS publicacion_id, p.id_usuario AS usuario_id, p.precio AS precio, m.nombre AS marca, mo.nombre AS modelo, p.year AS año, p.kilometraje AS kilometraje, t.nombre AS transmision, c.nombre AS categoria, e.nombre AS estado, p.descripcion AS descripcion, p.imagen AS imagen FROM publicaciones p JOIN marcas m ON p.id_marca = m.id_marca JOIN modelos mo ON p.id_modelo = mo.id_modelo JOIN transmisiones t ON p.id_transmision = t.id_transmision JOIN categorias c ON p.id_categoria = c.id_categoria JOIN estados e ON p.id_estado = e.id_estado ${unionDeFiltros};`

{
  "nombre": "Jhonny",
  "apellido": "Quevedo",
  "email": "jquevedo@gmail.com",
  "password": 0000
}
token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJKaG9ubnkiLCJhcGVsbGlkbyI6IlF1ZXZlZG8iLCJlbWFpbCI6ImpxdWV2ZWRvQGdtYWlsLmNvbSIsImlkX3VzdWFyaW8iOjIzLCJpYXQiOjE3MTkxOTA5MTJ9.Ye_Bn7sJ9o38SeSkJ04zweAdI90rIAEIusmNm3bkZ1g


SELECT p.id_publicacion AS publicacion_id, p.id_usuario AS usuario_id, p.precio AS precio, m.nombre AS marca, mo.nombre AS modelo, p.year AS año, p.kilometraje AS kilometraje, t.nombre AS transmision, c.nombre AS categoria, e.nombre AS estado, p.descripcion AS descripcion, p.imagen AS imagen FROM publicaciones p JOIN marcas m ON p.id_marca = m.id_marca JOIN modelos mo ON p.id_modelo = mo.id_modelo JOIN transmisiones t ON p.id_transmision = t.id_transmision JOIN  categorias c ON p.id_categoria = c.id_categoria JOIN estados e ON p.id_estado = e.id_estado WHERE p.id_usuario = 23;

/*payoad para postearPub*/
{
    "id_usuario": 20,
    "precio": 999999, 
    "id_marca": 6, 
    "id_modelo": 40, 
    "year": 2021, 
    "kilometraje": 80000, 
    "id_transmision" :2, 
    "id_categoria": 5, 
    "id_estado": 2, 
    "descripcion": "esta es la descripcion", 
    "imagen": "esto es una imagen"
}

/* publicacion por actualizar*/
{
    "id_publicacion": 6,
    "id_usuario": 23,
    "titulo": null,
    "precio": 100,
    "marca": "BYD",
    "modelo": "X3",
    "año": 2020,
    "kilometraje": 0,
    "transmision": "Manual",
    "categoria": "Sedan",
    "estado": "Nuevo",
    "descripcion": "Esto es la primera prueba",
    "imagen": "imagenprueba"
  }