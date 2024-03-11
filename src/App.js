import logo from './logo.svg';
import './App.css';
import Nav from './components/nav';
import Body from './components/Body';

function App() {
  return (
    <div className="App">
      <Nav 
        //greeting="Page Name"
        //location="/home"
        />
        <Body />
    </div>
  );
}

export default App;
