import React from "react";
import "./Sidebar.css";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const SideBar = props => {
    const sidebarClass = props.isOpen ? "sidebar open" : "sidebar";
    return (
        <div className={sidebarClass}>
            <SettingsIcon className="large-icon" fontSize="10px" />
            <DownloadIcon className="large-icon" fontSize="10px" />
            <ContentCopyIcon className="large-icon" fontSize="10px" />
            <ShareIcon className="large-icon" fontSize="10px" />
            <PlayArrowIcon className="large-icon" fontSize="10px" />
            <div className="sidebar-toggle">
                <div id="hamburger" onClick={props.toggleSidebar}>
                    <div className={`container ${props.isOpen ? "change" : ""}`}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SideBar;
