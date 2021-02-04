import React from 'react';
import './UserOutput.css';

const userOutput = (props) => {
    return (
    <div className="UserOutput">
       <p>{props.name}</p>
       <p>A characteristic</p>
    </div>
   );
};

export default userOutput;