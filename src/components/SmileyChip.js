import React from 'react';
import Chip from '@material-ui/core/Chip'
import CircularProgress from '@material-ui/core/CircularProgress';

const SmileyChip = (props) =>

{
    const {icon, loading, level, label, onClick} = props
    return (
        <>
            <Chip
            tabIndex={-1}
            icon={icon}
            label={loading
                ? <CircularProgress 
                    size={12}
                    thickness={8}
                    color={level > 5 ? (level > 10 ? "#000000" : "#000000") : "default"}
                    />
                : level}
            color={level > 5 ? (level > 10 ? "secondary" : "primary") : "default"}
            onClick={() => onClick(label)}
            />
        </>
    )
}

export default SmileyChip