import * as React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';

import TextField from '@material-ui/core/TextField';

const Main: React.FC = () => {
    return(
        <div>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </div>
    )
}

if (document.getElementById('regularExpression')) {
    ReactDOM.render(<Main />, document.getElementById('regularExpression'));
}