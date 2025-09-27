import loadingAnimation from "../assets/loading/loading_animation.gif";
import '../styles/loading.css';

const Loading = ({visible, message = "Cargando..."}) => {
  return (
    <div className={`loading-container ${visible ? 'visible' : ''}`}>
      <img src={loadingAnimation} alt="Cargando..." className="loading-animation" />
      <p className="loading-message">{message}</p>
    </div>
  );
};
export default Loading;