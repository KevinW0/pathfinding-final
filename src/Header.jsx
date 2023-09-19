import SpeedSlider from './SpeedSlider';
import { Button, ButtonGroup } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectors } from './redux_store';

const Header = ({setSpeed, controlsDisabled, algorithms, resetAvailableOnly}) => {

    const isStartSelected = useSelector(selectors.selectStartBoolean);
    const isTargetSelected = useSelector(selectors.selectTargetBoolean);
   
    return (
        <div className='grid grid-rows-2 grid-cols-12 mb-10'>
            <h1 className='font-mono text-teal-600 text-center col-span-12 text-3xl pt-5'>Pathfinding Visualizer</h1>
            <div className='text-center justify-center col-start-2 col-span-5'>
                <SpeedSlider speedControlDisabled = {controlsDisabled} setSpeed = {setSpeed}></SpeedSlider>
            </div>
            <ButtonGroup className='col-start-8 col-span-4 justify-center'>
                <Button disabled = {controlsDisabled || resetAvailableOnly} color='success' variant='contained' onClick={!algorithms ? null : (() => algorithms.dijkstra(isStartSelected, isTargetSelected))}>
                    Run Dijkstra's Pathfinding Algorithm
                </Button>
                <Button disabled>More algorithms to come!</Button>
                <Button disabled = {controlsDisabled} color='error' variant='contained' onClick = {!algorithms ? null : (() => algorithms.reset())}>
                    Reset
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default Header;
