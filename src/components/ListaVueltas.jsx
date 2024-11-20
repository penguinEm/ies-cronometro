const ListaVueltas = ({ vueltas, formatearTiempo }) => {
  return (
    <div className="mt-4">
      <h5>Vueltas:</h5>

      {/* Aqui el mapeo "vueltas.map" itera sobre el elemento "tiempo" y la segundo elemento es la posicion o indice "i"  */}
      <ul className="list-group">
        {vueltas.map((tiempo, i) => (
            /* Por cada elemento iterado se genera un "li" al cual. Ademas es necesario para darle la key y evitar elementos hijos iguales o clones. Y a al i le damos un +1 para mostrar el numero vueltas desde 1. "...." */
          <li key={i} className="list-group-item">
            {i + 1}. {formatearTiempo(tiempo)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaVueltas;
