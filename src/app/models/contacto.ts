export class Contacto {
    constructor(
        public nombre: string,
        public email: string,
        public telefono: string,
        public estado: string,
        public categoria: string,
        public ubicacion: string,
        public lugarExac: string,
        public mensaje: string
    ) {}
}