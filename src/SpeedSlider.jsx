import React from 'react';
import { Slider } from '@mui/material';

const marks = [
    {
        value: 0,
        label: 'Instant',
    },
    {
        value: 250,
        label: 'Moderate',
    },
    {
        value: 500,
        label: 'Slow',
    },
];
const SpeedSlider = () => (
    <>
        <h1> Speed Control (ms)</h1>
        <Slider defaultValue={1} min={0} step={1} max={500} marks={marks} valueLabelDisplay='auto' size='small' />
    </>
);

export default SpeedSlider;
