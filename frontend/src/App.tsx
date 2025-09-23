import { useState } from "react";
import "./App.css";
import StoreList from "./components/StoreList";
import StoreDetails from "./components/StoreDetails";

function App() {
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);

  const handleStoreSelect = (storeId: number) => {
    setSelectedStoreId(storeId);
  };

  const handleBackToList = () => {
    setSelectedStoreId(null);
  };

  return (
    <div className="App">
      {selectedStoreId ? (
        <StoreDetails 
          storeId={selectedStoreId} 
          onBack={handleBackToList} 
        />
      ) : (
        <StoreList onStoreSelect={handleStoreSelect} />
      )}
    </div>
  );
}

export default App;
