import { Outlet, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Link to={`/`}
        className="Table-link"
      >
        Put Login Page Here
      </Link>
    </div>
  );
}

export default App;
