import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//pages
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

//  component

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <h2>App.js</h2>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/new" element={<New />} />
                    <Route path="/edit" element={<Edit />} />
                    <Route path="/diary" element={<Diary />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
