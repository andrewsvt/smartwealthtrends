import { useState, FC, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: any;
}

const Portal: FC<PortalProps> = ({ children }) => {
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return ReactDOM.createPortal(children, container);
};

export default Portal;
