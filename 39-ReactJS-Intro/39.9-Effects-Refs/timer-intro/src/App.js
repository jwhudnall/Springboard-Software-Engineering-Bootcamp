// import logo from './logo.svg';
import "./App.css";
import Timer from "./Timer";
import ProfileViewer from "./ProfileViewer";

function App() {
  return (
    <div className='App'>
      {/* <Timer /> */}
      <ProfileViewer user='jwhudnall' color='green' />
      {/* <ProfileViewer user='colt' color='purple' /> */}
    </div>
  );
}

export default App;
