import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faRotateLeft,
  faFlag,
} from "@fortawesome/free-solid-svg-icons"; //Utilice la libreria fontawesome para incluir los iconos de los botones
import ListaVueltas from "./ListaVueltas"; //Importamos el componente ListaVueltas, componente el cual realiza un mapeo del array "vueltas" cada vez que damos click al boton "Vuelta"

const Croonometro = () => {
  const [marcador, setMarcador] = useState(0.0); // Tiempo actual
  const [corriendo, setCorriendo] = useState(false); // Estado del cronómetro, el state lo inicializamos en "false", el mismo cambia a "true" al dar click en el boton Iniciar
  const [vueltas, setVueltas] = useState([]); // Inicializamos el state vueltas con un array vacio, en este se irán guardando los tiempos intermedios a medidas que demos click al boton "Vuelta"
  const intervalos = useRef(null); // Referencia para el intervalo

  //! Boton de doble funcionalidad (Iniciar/ Detener)
  const btnIniciarParar = () => {
    if (corriendo) {
      clearInterval(intervalos.current); // Detener
      setCorriendo(false);
    } else {
      setCorriendo(true);
      intervalos.current = setInterval(() => {
        setMarcador((prev) => parseFloat((prev + 0.1).toFixed(1)));
      }, 100); // Actualizar cada 100 ms
    }
  };

  //! Restablecer
  const restablecerCronometro = () => {
    clearInterval(intervalos.current); // Asegurarse de detener cualquier intervalo
    setCorriendo(false); // Detener el estado
    setMarcador(0.0); // Reiniciar tiempo
    setVueltas([]); // Vaciar las vueltas
  };

  //! Guardar vuelta
  const guardarVuelta = () => {
    if (corriendo) {
      setVueltas((prevvueltas) => [...prevvueltas, marcador]);
    }
  };

  //! Formatear tiempo - se encarga de formatear el tiempo en minutos:segundos.decimas (utilizamos Math.floor para devolver la parte entera)
  const formatearTiempo = (tiempo) => {
    const minutos = Math.floor(
      tiempo / 60
    ); /* Dividimos el tiempo total en 60 par obtener los minutos */
    const segundos = Math.floor(
      tiempo % 60
    ); /* Sacamos el resto del anterior calculo para obtener los segundos  */
    const decimas = Math.floor((tiempo * 10) % 10);
    return `${minutos.toString().padStart(2, "0")}:${segundos
      .toString()
      .padStart(
        2,
        "0"
      )}.${decimas}`; /* retornamos el valor numerico de minutos a un string, obligando con padStart que si o si tenga 2 digitos al inicio, en caso de no tenerlo lo obligamos a ponerle un 0 adelante  */
  };

  return (
    <article className="border-3 rounded-3 bg-body-secondary p-4">
      {" "}
      {/* Utilice la libreria de react-boostrap para dar estilos al maquetado por eso el "className" */}
      {/* En el maquetado aqui va el tiempo indicador del tiempo se inicializa en 00:00.00 */}
      <div className="px-3 py-3 d-flex justify-content-center border-bottom display-4 text-secondary-emphasis">
        {formatearTiempo(marcador)}
      </div>
      {/* En este bloque estan los 3 botones "Iniciar/Parar", "Restablecer", "Vuelta" */}
      <div className="px-3 py-3 d-flex justify-content-center gap-3">
        {/* 1. Boton inicar/parar el cual mediante un ternario pregunta si el state de corriendo esta en true o en false, dependiendo de ello cambia a Iniciar o Parar */}
        <button
          className={`btn ${
            corriendo ? "btn-outline-danger" : "btn-outline-primary"
          }`}
          onClick={btnIniciarParar}
        >
          <FontAwesomeIcon icon={corriendo ? faPause : faPlay} />{" "}
          {corriendo ? "Detener" : "Iniciar"}
        </button>

        {/* 2. Boton de restablecer el cual esta asociado a la funcion que tiene la lógica de reestablecer el marcador a 0 */}
        <button
          className="btn btn-outline-success"
          onClick={restablecerCronometro}
        >
          <FontAwesomeIcon icon={faRotateLeft} /> Restablecer
        </button>

        {/* 3. Boton de vuelta el cual esta asociado a la funcion de guardarVuelta que utiliza el Spread para almacenar el tiempo. */}
        <button
          className="btn btn-outline-warning"
          onClick={guardarVuelta}
          disabled={
            !corriendo
          } /* Se desabilita el boton si el cronometro no esta corriendo */
        >
          <FontAwesomeIcon icon={faFlag} /> Vuelta
        </button>
      </div>
      {/* En este bloque mostramos al componente ListaVueltas solo si se almacenado al menos 1 elemento en el array del state "vueltas"*/}
      <div>
        {vueltas.length > 0 && (
          <ListaVueltas
            vueltas={vueltas}
            formatearTiempo={
              formatearTiempo
            } /* Mandamos por props el arreglo vueltas y la propia funcion que se encarga de dar formato al tiempo*/
          />
        )}
      </div>
    </article>
  );
};

export default Croonometro;
