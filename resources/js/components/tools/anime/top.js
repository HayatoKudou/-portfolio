import React from 'react';
import ReactDOM from 'react-dom';
import style from '../../style';
import axios from 'axios';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class Anime extends React.Component{
    constructor(props){
        super(props);
        var date=new Date();
        var year = date.getFullYear();
        this.state = {
            style_season_form: {display: "none"},
            style_search_button: {
                display: "inline",
                cursor: "pointer",
            },
            style_season_season_sort: {display: "none"},
            style_search_season_sort: {display: "inline"},
            search_form: {
                title: '',
                abbreviation: '',
                season_type: '3',
                season_year: year,
                season_month: 'spring',
                sort_season: 'new_sort',
            },
            result_data: '',
            result_flg: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirect = this.redirect.bind(this);
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

    openSeasonForm(){
        let style_season_form_change = {
            display: "block",
        }
        let style_search_button_change = {
            display: "none",
            cursor: "pointer",
        }
        this.setState({
            style_season_form: style_season_form_change,
            style_search_button: style_search_button_change,
        });
    }

    openSeasonSortForm(){
        let style_season_form_season_sort= {
            display: "inline",
        }
        let style_search_form_season_sort= {
            display: "inline",
        }
        this.setState({
            style_season_season_sort: style_season_form_season_sort,
            style_search_season_sort: style_search_form_season_sort,
        });
    }

    openSearchSortForm(){
        let style_season_form_season_sort= {
            display: "none",
        }
        let style_search_form_season_sort= {
            display: "inline",
        }
        this.setState({
            style_season_season_sort: style_season_form_season_sort,
            style_search_season_sort: style_search_form_season_sort,
        });
    }

    closeSeasonForm(){
        let style_season_form_change = {
            display: "none",
        }
        let style_search_button_change = {
            display: "inline",
            cursor: "pointer",
        }
        this.setState({
            style_season_form: style_season_form_change,
            style_search_button: style_search_button_change,
        });
    }

    closeSeasonSortForm(){
        let style_season_form_season_sort= {
            display: "none",
        }
        let style_search_form_season_sort= {
            display: "none",
        }
        this.setState({
            style_season_season_sort: style_season_form_season_sort,
            style_search_season_sort: style_search_form_season_sort,
        });
    }

    redirect(url){
        location.href=url;
    }


    render(){
        var _root = {width: 150, height: 250, margin: "13px"};
        var _media = {height: 120};
        var _items = {overflow: "hidden"};
        var _item = {float: "left"};
        var _title = {height: 80};
        var _title_content = {fontSize: "2vmin"};
        var _media_title = {
            height: 120,
            position: "relative",
        };
        var _no_image = {
            margin:  "auto",
            position: "absolute",
            padding: "20px",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width:  "150px",
            height: "80px",
        };
        var _search_button = {
            cursor: "pointer",
        }

        var year = [];
        for(let i=this.state.search_form.season_year; i>=2000; i--) {
          year.push(<option key={i}>{i}</option>);
        }

        var monsth = [];
        var season = {
            spring: '春',
            summer: '夏',
            autumn: '秋',
            winter: '冬'
        };
        const {classes} = this.props;

        return (
            <div className="">
                <div className="search_title">
                    {/*
                    <TextField name="title" className={"anime_input " + classes.TheInput} value={this.state.search_form.title}
                    onChange={this.handleChange} placeholder="タイトル名" id="outlined-basic" label="Outlined" variant="outlined"
                    />
                    */}
                    <input className="anime_input" name="title" type="text" value={this.state.search_form.title} onChange={this.handleChange} placeholder="タイトル名" />
                </div>

                <div className="search_season">
                    <label className="anime_season_input">
                        <input type="radio" name="season_type" value="3" onChange={this.handleChange} onClick={()=> {this.closeSeasonForm(), this.closeSeasonSortForm()}} checked={this.state.search_form.season_type === '3'} />
                        <span>今期</span>
                    </label>
                    <label className="anime_season_input">
                        <input type="radio" name="season_type" value="2" onChange={this.handleChange} onClick={()=> {this.openSeasonForm(), this.openSearchSortForm()}} />
                        <span>シーズンを指定</span>
                    </label>
                    <label className="anime_season_input">
                        <input type="radio" name="season_type" value="1" onChange={this.handleChange} onClick={()=> {this.closeSeasonForm(), this.openSeasonSortForm()}} />
                        <span>全期間</span>
                    </label>
                    <select className="anime_season_input" name="sort_season" type="select" value={this.state.search_form.sort_season}
                    onChange={this.handleChange} style={this.state.style_season_season_sort} >
                        <option value="new_sort">新しい順</option>
                        <option value="old_sort">古い順</option>
                    </select>
                </div>

                <Button variant="outlined" style={this.state.style_search_button} onClick={() => this.handleSubmit()} >検索</Button>

                <div style={this.state.style_season_form}>
                    <select name="season_year" className="season_year" onChange={this.handleChange} value={this.state.search_form.season_year}>
                        {year}
                    </select>
                    <select name="season_month" className="season_month" onChange={this.handleChange} value={this.state.search_form.season_month}>
                        {Object.entries(season).map(month => {
                            return(<option key={month[0]} value={month[0]}>{month[1]}</option>)
                        })}
                    </select>
                    <select className="anime_season_input" name="sort_season" type="select" value={this.state.search_form.sort_season}
                    onChange={this.handleChange} style={this.state.style_search_season_sort} >
                        <option value="new_sort">新しい順</option>
                        <option value="old_sort">古い順</option>
                    </select>
                    <Button variant="outlined" style={_search_button} onClick={() => this.handleSubmit()} >検索</Button>
                </div>

                <div style={_items}>
                    {(this.state.result_data.length == 0 && this.state.result_flg == true) &&
                        <div>NO RESULT</div>
                    }
                    {Object.keys(this.state.result_data).map(x => {
                        return(
                            <div key={x} style={_item}>
                                <Card style={_root}>
                                    <CardActionArea>
                                        {this.state.result_data[x].images.recommended_url ?
                                            <CardMedia style={_media} image={this.state.result_data[x].images.recommended_url} />
                                        :
                                        <div style={_media_title}>
                                            <p style={_no_image}>NO IMAGE</p>
                                        </div>
                                        }
                                        <CardContent style={_title}>
                                            <Typography gutterBottom variant="h5" component="h6" style={_title_content}>
                                                {this.state.result_data[x].title}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        {this.state.result_data[x].official_site_url &&
                                            <Button size="small" color="primary" onClick={() => this.redirect(this.state.result_data[x].official_site_url)}>
                                            公式HP
                                            </Button>
                                        }
                                    </CardActions>
                                </Card>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    TheInput: {
        fontSize: 20,
        lineHeight: 1
    }
});
Anime = withStyles(styles)(Anime);


if (document.getElementById('anime')) {
    ReactDOM.render(
        // <Anime />,
        <Anime />,
        document.getElementById('anime')
    );
}
