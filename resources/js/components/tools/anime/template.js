import React from 'react';
import ReactDOM from 'react-dom';

export default class Template extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            style_season_form: {display: "none"},
            style_search_button: {
                display: "inline",
                cursor: "pointer",
            },
            style_season_season_sort: {display: "none"},
            style_search_season_sort: {display: "inline"},
        }
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
        window.open(url);
    }

}
