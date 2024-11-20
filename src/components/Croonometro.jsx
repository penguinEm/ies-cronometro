import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";


//todo: debe contener el siguiente formato: minuto. segundos (00:00.0)
//todo: boton de iniciar se debe transformar en detener y  el de restablecer
//todo: opcional: debe tener un lab para guardar los tiempos
//todo: se debe explicar cada línea con comentarios
//todo: usar git y github, luego mandar un mail a sangenispablo@iesconcepcion.edu.ar ( con el nombre de cada integrante)


const Croonometro = () => {
  const [marcador, setMarcador] = useState(0.0);
  const [corriendo, setCorriendo] = useState(false);
  const intervalos = useRef(null);

  //! Start
  const iniciarCronometro = () => {
    if (!corriendo) {
      setCorriendo(true);
      intervalos.current = setInterval(() => {
        setMarcador((prev) => parseFloat((prev + 0.01).toFixed(2)));
      }, 10);
    }
  };

  //! Stop
  const pararCronometro = () => {
    setCorriendo(false);
    clearInterval(intervalos.current);
  };

  //! Reset
  const restablecerCronometro = () => {
    pararCronometro();
    setMarcador(0.0);
  };

  return (
    <article className=" border-3 rounded-3 bg-body-secondary">
      <div className="px-3 py-3 d-flex justify-content-center border-bottom display-4 text-secondary-emphasis">
        {marcador}
      </div>
      <div className="px-3 py-3">
        <button
          className="btn btn-outline-primary bi "
          onClick={iniciarCronometro}
        >
          <FontAwesomeIcon icon={faPlay} /> Iniciar
        </button>
        <button
          className="btn  btn-outline-danger mx-3"
          onClick={pararCronometro}
        >
          <FontAwesomeIcon icon={faPause} /> Parar
        </button>
        <button
          className="btn btn-outline-success"
          onClick={restablecerCronometro}
        >
          <FontAwesomeIcon icon={faRotateLeft} /> Restablecer
        </button>
      </div>
    </article>
  );
};

export default Croonometro;
