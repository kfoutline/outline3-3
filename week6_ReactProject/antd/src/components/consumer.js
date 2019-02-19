import React from 'react';
import {ReactReduxContext} from 'react-redux';

const Consumer = Component=>{
    return(
        <ReactReduxContext.Consumer>
            
                    <Component/>
        </ReactReduxContext.Consumer>
    )
}

export default Consumer;