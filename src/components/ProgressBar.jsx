import { useEffect } from "react";
import { useState } from "react";
import '../styles/progressBar.css';

const ProgressBar = ({ title, steps, currentStep}) => {

  const [widthProgressBar, setWidthProgressBar] = useState(0);

  useEffect(() => {
    const width = currentStep / steps * 100;
    const roundedWidth = Math.round(width);
    setWidthProgressBar(roundedWidth);
  }, [currentStep]);

  return (
    <div className="progress-bar">
      <div className="progress-title">{title}</div>
      <div className="container-dinamic-progress">
        <label className="progress-percentage">{widthProgressBar}%</label>
        <div className="dinamic-progress" style={{width: `${widthProgressBar}%`}}></div>
      </div>
    </div>
  );
};
export default ProgressBar;