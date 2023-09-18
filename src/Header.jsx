import React from 'react';
import SpeedSlider from './SpeedSlider';
import { Button, ButtonGroup } from '@mui/material';

const Header = () => {
    return (
        <div className='grid grid-rows-2 grid-cols-12 mb-10'>
            <h1 className='font-mono text-teal-600 text-center col-span-12 text-3xl pt-5'>Pathfinding Visualizer</h1>
            <div className='text-center justify-center col-start-2 col-span-5'>
                <SpeedSlider></SpeedSlider>
            </div>
            <ButtonGroup className='col-start-8 col-span-4 justify-center'>
                <Button color='success' variant='contained'>
                    Run Dijkstra's Pathfinding Algorithm
                </Button>
                <Button disabled>More algorithms to come!</Button>
                <Button color='error' variant='contained'>
                    Reset
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default Header;
