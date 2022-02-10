export class Propiedad {
    constructor(
        public codigo: number,
        public nombre: string,
        public direccion: string,
        public descripcion: string,
        public moneda: string,
        public precio: number,
        public habitaciones: number,
        public banos: number,
        public area: string,
        public medida: string,
        public estadoOrden: number,
        public estado: string,
        public categoria: string,
        public ubicacion: string,
        public destacado: any,
        public vendido: any,
        public alquilado: any,
        public slider: any,
        public imagen: string,
        public principal: any
    ) {}
}