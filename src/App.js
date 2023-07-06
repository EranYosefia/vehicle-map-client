import React from "react";
import "./App.css";
import { VehiclesProvider } from './Context/vehiclesContext'
import { QueryClient, QueryClientProvider } from 'react-query';
import MapComponent from "./components/Map/map";
import Sidebar from "./components/Sidebar/sidebar"

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <VehiclesProvider>
    <div className="App">
      <Sidebar/>
      <MapComponent/>
    </div>
    </VehiclesProvider>
    </QueryClientProvider>
  );
}

export default App;
