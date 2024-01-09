'use client';
import React, { useState } from 'react';

// Custom hook to fetch data
function useCustomFetch(dataDependency) {
  const fetchData = async () => {
    // Fetch logic here
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Fetched data: " + dataDependency);
      }, 1000);
    });
  };

  return fetchData();
}

function MyComponent() {
  const [dependency, setDependency] = useState(0);

  // Update this value to trigger re-fetch
  const updateDependency = () => {
    setDependency(dependency + 1);
  };

  // Fetch data with custom hook, re-fetch if dependency changes
  const data = React.useMemo(() => useCustomFetch(dependency), [dependency]);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <div>
        Data: {data}
        <button onClick={updateDependency}>Update Dependency</button>
      </div>
    </React.Suspense>
  );
}

export default MyComponent;
