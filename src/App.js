import GoogleMap from "./components/GoogleMap";
import LeafletMap from "./components/LeafletMap";


const App = () => {
  return (
    <div>
      <LeafletMap />
      <br />
      <GoogleMap />
    </div>
  )
}

export default App;