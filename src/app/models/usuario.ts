export class Usuario {
    constructor(
        public nombre: string,
        public usuario: string,
        public password: string,
        public email: string,
        public telefono: string,
        public activado: any
    ) {}
}