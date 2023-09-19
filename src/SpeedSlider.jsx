import { Slider } from '@mui/material';

const marks = [
    {
        value: 0,
        label: 'Fast',
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
const SpeedSlider = ({ setSpeed, speedControlDisabled }) => (
    <>
        <h1> Speed Control (ms)</h1>
        <Slider
            defaultValue={0}
            min={0}
            step={1}
            max={500}
            marks={marks}
            valueLabelDisplay='auto'
            size='small'
            onChange={(event, value) => {
                setSpeed(value);
            }}
            disabled = {speedControlDisabled}
        />
    </>
);

export default SpeedSlider;
