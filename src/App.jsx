import Grid from './Grid';
import Header from './Header';
import Footer from './Footer';
import { useState } from 'react';

function App() {
    const [speed, setSpeed] = useState(0);
    const [controlDisabled, setControlDisabled] = useState(false);
    const [algorithms, setAlgorithms] = useState(null);
    const [resetAvailableOnly, setResetAvailableOnly] = useState(false);

    return (
        <>
            <Header controlsDisabled={controlDisabled} setSpeed={setSpeed} algorithms={algorithms} resetAvailableOnly={resetAvailableOnly}></Header>
            <Grid
                speed={speed}
                disableControls={setControlDisabled}
                setAlgorithms={setAlgorithms}
                setResetAvailableOnly={setResetAvailableOnly}
            ></Grid>
            <Footer></Footer>
        </>
    );
}

export default App;
