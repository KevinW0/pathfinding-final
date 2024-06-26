import { useState } from 'react';
import { Dialog, DialogTitle } from '@mui/material';
import { PiMouseLeftClickFill, PiMouseRightClickFill } from 'react-icons/pi';
import { HiCursorClick } from 'react-icons/hi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export const HelpDialog = () => {
    const [helpDialog, setHelpDialog] = useState(true);
    return (
        <Dialog open={helpDialog} onClose={() => setHelpDialog(false)}>
            <DialogTitle style={{ textAlign: 'center' }}>Tutorial</DialogTitle>
            <div style={{ margin: '0px 10px 10px 10px' }}>
                <p><PiMouseLeftClickFill style={{ display: 'inline' }} />Left click to mark a starting node.</p>
                <p><PiMouseRightClickFill style={{ display: 'inline' }} />Right click to mark a target node.</p>
                <p><HiCursorClick style={{ display: 'inline' }} />Click the green button to begin the visualization!</p>
                <p><AiOutlineLoading3Quarters style={{ display: 'inline' }} /> When the grid loads, click outside the dialog to enter the main application!</p>
            </div>
        </Dialog>
    )
}