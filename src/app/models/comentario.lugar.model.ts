import { ImageneslugarComentario } from "./imagen.comentario.lugar.model";

 
export class ComentarioLugar {
    constructor(
      public idlugar? : Number,
      public uid? : String,
      public idusuario? : Number,
      public userName?:String,
      public imageUrl?: String,
      public idcomentario?: Number,
      public comentario?: String,
      public rating?: Number,
      public nombre?: String,
      public fecha?: String,
      public imagenes?: ImageneslugarComentario[],
      public eliminado?: Number,
    ) {}
  }
  