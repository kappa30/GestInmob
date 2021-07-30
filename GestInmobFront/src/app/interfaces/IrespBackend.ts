import Iusuario from "./Iusuario";

export default interface IrepBackend{
    estado:string,
    mensaje:string,
    data:Iusuario[],
    token:string
}