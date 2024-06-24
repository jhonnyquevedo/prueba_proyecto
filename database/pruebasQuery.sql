SELECT p.id_publicacion AS publicacion_id, p.id_usuario AS usuario_id, p.precio AS precio, m.nombre AS marca, mo.nombre AS modelo, p.año AS año, p.kilometraje AS kilometraje, t.nombre AS transmision, c.nombre AS categoria, e.nombre AS estado, p.descripcion AS descripcion, p.imagen AS imagen FROM publicaciones p JOIN marcas m ON p.id_marca = m.id_marca JOIN modelos mo ON p.id_modelo = mo.id_modelo JOIN transmisiones t ON p.id_transmision = t.id_transmision JOIN  categorias c ON p.id_categoria = c.id_categoria JOIN estados e ON p.id_estado = e.id_estado;


INSERT INTO usuarios (nombre, apellido, email, foto, telefono, contraseña) VALUES ('Hector', 'Garcia', 'garcia17h@gmail.com', 'esto es una imagen' , 999881047, '1111');
INSERT INTO usuarios (nombre, apellido, email, foto, telefono, contraseña) VALUES ('Heicy', 'Castro', 'heicyc1996@gmail.com', 'esto es una imagen' , 975631241, '2222');
INSERT INTO usuarios (nombre, apellido, email, foto, telefono, contraseña) VALUES ('Jose', 'Ibanez', 'jibanez@gmail.com', 'esto es una imagen' , 987987987, '2222');
INSERT INTO publicaciones (id_usuario, precio, id_marca, id_modelo, año, kilometraje, id_transmision, id_categoria, id_estado, descripcion, imagen) VALUES (23, 100, 6, 34, 2020, 0, 1, 1, 1, 'Esto es la primera prueba', 'imagenprueba');
INSERT INTO publicaciones (id_usuario, precio, id_marca, id_modelo, año, kilometraje, id_transmision, id_categoria, id_estado, descripcion, imagen) VALUES (3, 100, 1, 1, 2020, 0, 1, 1, 1, 'Esto es la primera prueba', 'imagenprueba');
INSERT INTO publicaciones (id_usuario, precio, id_marca, id_modelo, año, kilometraje, id_transmision, id_categoria, id_estado, descripcion, imagen) VALUES (3, 200, 2, 5, 2024, 1000, 2, 2, 2, 'Esto es la primera prueba', 'imagenprueba');

SELECT p.id_publicacion AS publicacion_id, p.id_usuario AS usuario_id, p.precio AS precio, m.nombre AS marca, mo.nombre AS modelo, p.año AS año, p.kilometraje AS kilometraje, t.nombre AS transmision, c.nombre AS categoria, e.nombre AS estado, p.descripcion AS descripcion, p.imagen AS imagen FROM publicaciones p JOIN marcas m ON p.id_marca = m.id_marca JOIN modelos mo ON p.id_modelo = mo.id_modelo JOIN transmisiones t ON p.id_transmision = t.id_transmision JOIN  categorias c ON p.id_categoria = c.id_categoria JOIN estados e ON p.id_estado = e.id_estado

`SELECT p.id_publicacion AS publicacion_id, p.id_usuario AS usuario_id, p.precio AS precio, m.nombre AS marca, mo.nombre AS modelo, p.a¤o AS año, p.kilometraje AS kilometraje, t.nombre AS transmision, c.nombre AS categoria, e.nombre AS estado, p.descripcion AS descripcion, p.imagen AS imagen FROM publicaciones p JOIN marcas m ON p.id_marca = m.id_marca JOIN modelos mo ON p.id_modelo = mo.id_modelo JOIN transmisiones t ON p.id_transmision = t.id_transmision JOIN categorias c ON p.id_categoria = c.id_categoria JOIN estados e ON p.id_estado = e.id_estado ${unionDeFiltros};`

{
  "nombre": "Jhonny",
  "apellido": "Quevedo",
  "email": "jquevedo@gmail.com",
  "password": 0000
}
token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJKaG9ubnkiLCJhcGVsbGlkbyI6IlF1ZXZlZG8iLCJlbWFpbCI6ImpxdWV2ZWRvQGdtYWlsLmNvbSIsImlkX3VzdWFyaW8iOjIzLCJpYXQiOjE3MTkxOTA5MTJ9.Ye_Bn7sJ9o38SeSkJ04zweAdI90rIAEIusmNm3bkZ1g


SELECT p.id_publicacion AS publicacion_id, p.id_usuario AS usuario_id, p.precio AS precio, m.nombre AS marca, mo.nombre AS modelo, p.a¤o AS año, p.kilometraje AS kilometraje, t.nombre AS transmision, c.nombre AS categoria, e.nombre AS estado, p.descripcion AS descripcion, p.imagen AS imagen FROM publicaciones p JOIN marcas m ON p.id_marca = m.id_marca JOIN modelos mo ON p.id_modelo = mo.id_modelo JOIN transmisiones t ON p.id_transmision = t.id_transmision JOIN  categorias c ON p.id_categoria = c.id_categoria JOIN estados e ON p.id_estado = e.id_estado WHERE p.id_publicacion = 23;