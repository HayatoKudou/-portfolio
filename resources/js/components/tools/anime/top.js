import React from 'react';
import ReactDOM from 'react-dom';
import Anime from './anime';
import { makeStyles, withStyles } from '@material-ui/core/styles';

if (document.getElementById('anime')) {
    ReactDOM.render(
        <Anime />,
        document.getElementById('anime')
    );
}
