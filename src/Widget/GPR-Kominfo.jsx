import React, { useEffect } from 'react';

const KominfoWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widget.kominfo.go.id/gpr-widget-kominfo.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="gpr-kominfo-widget-container" className="p-4 bg-white shadow rounded-lg"></div>
  );
};

export default KominfoWidget;
