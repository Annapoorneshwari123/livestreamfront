import React, { useState } from 'react';
import Host from './Broadcast';
import Viewer from './Viewers';

function App() {
  const [role, setRole] = useState(null);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Naming Ceremony 🎉</h1>
      {!role && (
        <>
          <button onClick={() => setRole('host')}>Start as Host</button>
          <button onClick={() => setRole('viewer')}>Join as Viewer</button>
        </>
      )}
      {role === 'host' && <Host />}
      {role === 'viewer' && <Viewer />}
    </div>
  );
}

export default App;
