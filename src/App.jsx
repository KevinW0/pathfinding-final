import Grid from './Grid';
import Header from './Header';
import Footer from './Footer';
import { useState } from 'react';

function App() {
    const [speed, setSpeed] = useState(0);
    const [controlDisabled, setControlDisabled] = useState(false);
    const [algorithms, setAlgorithms] = useState(null);

    return (
        <>
            <Header controlsDisabled={controlDisabled} setSpeed={setSpeed} algorithms={algorithms}></Header>
            <Grid speed={speed} disableControls={setControlDisabled} setAlgorithms={setAlgorithms}></Grid>
            <Footer></Footer>
        </>
    );
}

export default App;
