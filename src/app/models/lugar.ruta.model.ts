export class LugarRuta {
    constructor(
        public idlugar: Number,
        public idruta: Number,
        public nombre: String,
        public direccion: String,
        public latitud: Number,
        public longitud: Number,
        public descripcion?: String,
        public historia?: String,
        public resena?: String,
        public love?: Number,
        public comentario?: Number,
        public rating?: Number,
        public primeraimagen?: String,
        public idclasificacion?: Number,
        public nombreclasificacion?: String,
        public imagenes?: String,
        public actividades?: String, 
        public principal?: Number, 
        public numero?: Number 
    ) {}
  }
  