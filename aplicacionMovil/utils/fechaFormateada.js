
export default function obtenerFechaFormateada() {
    const now = new Date();

    const pad = (n) => n.toString().padStart(2, '0');

    const hora = pad(now.getHours());
    const minutos = pad(now.getMinutes());
    const dia = pad(now.getDate());
    const mes = pad(now.getMonth() + 1); 
    const anio = now.getFullYear();

    return `${dia}/${mes}/${anio} - ${hora}:${minutos}hs`;
}
