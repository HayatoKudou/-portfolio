import React from 'react';
import ReactDOM from 'react-dom';
import style from '../../style';
import axios from 'axios';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Template from './template';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Pagination from '@material-ui/lab/Pagination';

import { ActivityIndicator, WingBlank, WhiteSpace } from 'antd-mobile';

export default class Anime extends Template {
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
            result_prev_page: 0,
            result_next_page: 0,
            result_total_count: 0,
            page: 0,
            thisPage: 1,
            result_flg: false,
            detail_data: '',
            dialogOpen: false,
            loading: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.searchSubmit = this.searchSubmit.bind(this);
        this.showDetail = this.showDetail.bind(this);
        this.redirect = this.redirect.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickPagination = this.handleClickPagination.bind(this);
    }    

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            ...this.state.search_form[name] = value
        });
    }

    //ダイアログを閉じる
    handleClose(){
        this.setState({dialogOpen: false});
    };

    //検索
    searchSubmit(){
        this.setState({...this.state.loading = true });
        const url = "https://kudohayatoblog.com/tools/anime_search";
        const parms = {search_form: this.state.search_form, page: 1};
        axios.post(url, parms)
        .then((response) => {
            this.setState({
                ...this.state.result_data = response.data.works,
                ...this.state.result_prev_page = response.data.prev_page,
                ...this.state.result_next_page = response.data.next_page,
                ...this.state.result_total_count = response.data.total_count,
                ...this.state.page = Math.ceil(response.data.total_count / 20),
                ...this.state.result_flg = true,
                ...this.state.loading = false,
            });
        })
        .catch((error) => {
            console.log(error);
        })
    }

    //詳細画面ダイアログ
    showDetail(anime_id){
        this.setState({...this.state.loading = true });
        const url = "https://kudohayatoblog.com/tools/showDetail";
        const parms = {id: anime_id};
        axios.post(url, parms)
        .then((response) => {
            this.setState({
                ...this.state.detail_data = response.data,
                ...this.state.dialogOpen = true,
                ...this.state.loading = false,
            });
        })
        .catch((error) => {
            console.log(error);
        })
    };

    //2ページ移行のデータ取得
    handleClickPagination(page){
        this.setState({...this.state.loading = true });
        this.setState({...this.state.thisPage = page });
        const url = "https://kudohayatoblog.com/tools/anime_search";
        const parms = {search_form: this.state.search_form, page: page};
        axios.post(url, parms)
        .then((response) => {
            this.setState({
                ...this.state.result_data = response.data.works,
                ...this.state.result_prev_page = response.data.prev_page,
                ...this.state.result_next_page = response.data.next_page,
                ...this.state.result_total_count = response.data.total_count,
                ...this.state.page = Math.ceil(response.data.total_count / 20),
                ...this.state.result_flg = true,
                ...this.state.loading = false,
            });
            window.scrollTo(0, 0);
        })
        .catch((error) => {
            console.log(error);
        })
    }


    render(){
        var _root = {width: 150, height: 250, margin: "13px"};
        var _media = {height: 120};
        var _items = {overflow: "hidden"};
        var _item = {float: "left"};
        var _title = {height: 80};
        var _title_content = {fontSize: "15px"};
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
        var _loading = {marginTop: '400px'};
        
        var year = [];
        for(let i=this.state.search_form.season_year; i>=2000; i--) {
            year.push(<option key={i}>{i}</option>);
        }        
        var month = [];
        var season = {
            spring: '春',
            summer: '夏',
            autumn: '秋',
            winter: '冬'
        };
        
        //ローディング画面
        if (this.state.loading) {
          return (
            <div style={_loading}>
                <div className="loader"></div>
                <div className="shadow"></div>
                <div className="logo">
                    <a href="https://mariodesigns.co.uk/" target="_blank">
                    </a>
                </div>
            </div>
          );
        }

        return (
            <div className="">
                <div className="search_title">
                    <input className="anime_input" name="title" type="text" value={this.state.search_form.title} onChange={this.handleChange} placeholder="タイトル名" />
                </div>

                <div className="search_season">
                    <label className="anime_season_input">
                        <input type="radio" name="season_type" value="3" onChange={this.handleChange} onClick={()=> {this.closeSeasonForm(), this.closeSeasonSortForm()}} checked={this.state.search_form.season_type === '3'} />
                        <span>今期</span>
                    </label>
                    <label className="anime_season_input">
                        <input type="radio" name="season_type" value="2" onChange={this.handleChange} onClick={()=> {this.openSeasonForm(), this.openSearchSortForm()}} checked={this.state.search_form.season_type === '2'} />
                        <span>シーズンを指定</span>
                    </label>
                    <label className="anime_season_input">
                        <input type="radio" name="season_type" value="1" onChange={this.handleChange} onClick={()=> {this.closeSeasonForm(), this.openSeasonSortForm()}} checked={this.state.search_form.season_type === '1'} />
                        <span>全期間</span>
                    </label>
                    <select className="anime_season_input" name="sort_season" type="select" value={this.state.search_form.sort_season}
                    onChange={this.handleChange} style={this.state.style_season_season_sort} >
                        <option value="new_sort">新しい順</option>
                        <option value="old_sort">古い順</option>
                    </select>
                </div>

                <Button variant="outlined" style={this.state.style_search_button} onClick={() => this.searchSubmit()} >検索</Button>

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
                    <Button variant="outlined" style={_search_button} onClick={() => this.searchSubmit()} >検索</Button>
                </div>

                <div style={_items}>
                    {(this.state.result_data.length == 0 && this.state.result_flg == true) &&
                        <div>NO RESULT</div>
                    }
                    {Object.keys(this.state.result_data).map(x => {
                        return(
                            <div key={x} style={_item}>
                                <Card style={_root} onClick={() => this.showDetail(this.state.result_data[x].id)}>
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
                                                {this.state.result_data[x].title.length > 25 ? this.state.result_data[x].title.substr( 0, 25 ) + '...'
                                                : this.state.result_data[x].title}
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


                {(this.state.detail_data !== '' && this.state.detail_data.total_count != 0) ?
                    <div>
                        <Dialog
                        open={this.state.dialogOpen}
                        onClose={() => this.handleClose()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {this.state.detail_data.episodes[0].work.title}
                            </DialogTitle>
                            <DialogContent>
                                {"リリース時期: " + this.state.detail_data.episodes[0].work.season_name_text}<br/>
                                {"エピソード数: " + this.state.detail_data.episodes[0].work.episodes_count + "話構成"}<br/>
                                {this.state.detail_data.casts.length != 0 && 
                                    <details>
                                        <summary>--キャスト情報--</summary>
                                        {Object.keys(this.state.detail_data.casts).map(n => {
                                        return(
                                            <div key={n}>
                                                <details>
                                                    <summary>
                                                        {this.state.detail_data.casts[n].character.name} cv.
                                                        {this.state.detail_data.casts[n].name}
                                                    </summary>
                                                    <li>誕生日: {this.state.detail_data.casts[n].person.birthday ? this.state.detail_data.casts[n].person.birthday : 'No data'}</li>
                                                    <li>性別: {this.state.detail_data.casts[n].person.gender_text ? this.state.detail_data.casts[n].person.gender_text : 'No data'}</li>
                                                    <li>血液型: {this.state.detail_data.casts[n].person.blood_type ? this.state.detail_data.casts[n].person.blood_type : 'No data'}</li>
                                                    <li>身長: {this.state.detail_data.casts[n].person.height ? this.state.detail_data.casts[n].person.height : 'No data'}</li>
                                                    <li>{this.state.detail_data.casts[n].person.wikipedia_url ? <a href={this.state.detail_data.casts[n].person.wikipedia_url} target="_blank">wiki</a> : 'wiki: No data'}</li>
                                                </details>
                                            </div>
                                        )
                                        })}                                        
                                    </details>                              
                                }
                                {this.state.detail_data.staffs.length != 0 && 
                                    <details>
                                        <summary>--スタッフ情報--</summary>
                                        {Object.keys(this.state.detail_data.staffs).map(n => {
                                        return(
                                            <li key={n}>
                                                {this.state.detail_data.staffs[n].role_text}: {this.state.detail_data.staffs[n].name}
                                            </li>)
                                        })}                                        
                                    </details>                              
                                }
                                <a href={this.state.detail_data.episodes[0].work.official_site_url} target="_blank">公式HP</a><br/>
                            </DialogContent>
                        </Dialog>
                    </div>
                :
                    <Dialog
                    open={this.state.dialogOpen}
                    onClose={() => this.handleClose()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            データが見つかりませんでした
                        </DialogTitle>
                    </Dialog>
                }

                {/*ページベート*/}
                {this.state.page !== 0 && 
                    <Pagination page={this.state.thisPage} count={this.state.page} variant="outlined" onChange={(e, page) => this.handleClickPagination(page)} />
                }

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
