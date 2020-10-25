import React from 'react';
import ReactDOM from 'react-dom';
// import styles from './style.scss'
import axios from 'axios';

class Anime extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            style_season_form: {display: "none"},
            search_form: {
                title: '',
                abbreviation: '',
                season_type: '',
                season_date_from: '',
                season_date_to: '',
            },
            result_data: ''
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

    handleSubmit() {
        const url = "https://kudohayatoblog.com/tools/anime_search";
        const parms = this.state.search_form;
        var result = '';
        axios.post(url, parms)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            // handle error
          console.log(error);
        })
        this.setState({
            ...this.state.result_data = result
        });
    }

    openSeasonForm(){
        let style_season_form_change = {
            display: "block",
        }
        this.setState({style_season_form: style_season_form_change});
    }

    closeSeasonForm(){
        let style_season_form_change = {
            display: "none",
        }
        this.setState({style_season_form: style_season_form_change});
    }

    render(){
        console.log(this.state);
        return (
            <div className="">
                    <input className="anime_input" name="title" type="text" value={this.state.search_form.title} onChange={this.handleChange} placeholder="タイトル名" />
                    <input className="anime_input" name="abbreviation" type="text" value={this.state.search_form.abbreviation} onChange={this.handleChange} placeholder="略称" />

                    <label className="anime_input">
                        <input type="radio" name="season_type" value="1" onChange={this.handleChange} onClick={()=> this.closeSeasonForm()} />
                        <span>全期間</span>
                    </label>
                    <label className="anime_input">
                        <input className="anime_input" type="radio" name="season_type" value="2" onChange={this.handleChange} onClick={()=> this.openSeasonForm()} />
                        <span>シーズンを指定</span>
                    </label>
                    <label className="anime_input">
                        <input type="radio" name="season_type" value="3" onChange={this.handleChange} onClick={()=> this.closeSeasonForm()} />
                        <span>今期</span>
                    </label>
                    <input type="button" onClick={this.handleSubmit} value="検索"/>

                    <div style={this.state.style_season_form}>
                        <input name="season_date_from" type="date" value={this.state.search_form.season_date_from} onChange={this.handleChange} />
                        <span>~</span>
                        <input name="season_date_to" type="date" value={this.state.search_form.season_date_to} onChange={this.handleChange} />
                    </div>
            </div>
        );
    }
}

export default Anime;


if (document.getElementById('anime')) {
    ReactDOM.render(
        <Anime />,
        document.getElementById('anime')
    );
}
