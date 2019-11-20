import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CloseIcon from '@material-ui/icons/Close';
import Paper from "@material-ui/core/Paper";

const MainControlPanel = (props) => {
    const [openedPanel, setOpenedPanel] = useState('initClosedPanel');


    const handleOpeningPanel = (event) => {
        event.stopPropagation();
        if (!openedPanel || openedPanel === 'closedMainControlPanel' || openedPanel==='initClosedPanel') {
            setOpenedPanel('openedMainControlPanel');
        }
    };

    const handleClosePanel = (event) => {
        event.stopPropagation();
        setOpenedPanel('closedMainControlPanel');
    };


    return (
        <div className={`mainControlPanel ${openedPanel}`}>
            {openedPanel === 'openedMainControlPanel' && <div className={"mainControlButtonDefault"}>
                <IconButton>
                    <CloseIcon/>
                </IconButton>
            </div>}
            {openedPanel !== 'openedMainControlPanel' &&
            <div className={"mainControlButtonSwitch"} onClick={handleOpeningPanel}>
                <IconButton>
                    <ChevronRightIcon/>
                </IconButton>
            </div>
            }
            {openedPanel === 'openedMainControlPanel' &&
            <div className={"mainControlButtonSwitch"} onClick={handleClosePanel}>
                <IconButton>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>}
            {
                <div>
                    <Paper>
                        <h1>text</h1>
                    </Paper>
                </div>
                }
        </div>
    )
};

export default MainControlPanel;
