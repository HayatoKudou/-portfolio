import React from 'react';
import ReactDOM from 'react-dom';
// import styles from './style.scss'
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class CssGenerate extends React.Component{
    constructor(props){
        super(props);
        var date=new Date();
        var year = date.getFullYear();
        this.state = {
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            ...this.state.search_form[name] = value
        });
    }


    handleSubmit(){
            const url = "https://kudohayatoblog.com/tools/anime_search";
            const parms = this.state.search_form;
            var result = '';
            axios.post(url, parms)
            .then((response) => {
                this.setState({
                    ...this.state.result_data = response.data.works,
                    ...this.state.result_flg = true,
                });
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
    }

    render(){

        return (
            <div className="">
                test
            </div>
        );
    }
}

export default CssGenerate;


if (document.getElementById('css_generate')) {
    ReactDOM.render(
        <CssGenerate />,
        document.getElementById('css_generate')
    );
}
