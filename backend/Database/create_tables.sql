CREATE TABLE Tareas (
	Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    Titulo VARCHAR(200) NOT NULL,
    Descripcion VARCHAR(1000),
    Completada BOOLEAN DEFAULT FALSE,
	FechaInicio DATE,
	FechaFin DATE 
);