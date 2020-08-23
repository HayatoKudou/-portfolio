import React from 'react';
import ReactDOM from 'react-dom';
// import Validation from './Validation';

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            info: {
                email: '',
                content: ''
            },
            message:{
                email: '',
                content: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const { info, message } = this.state;
        this.setState({
            info: { ...info, [name]: value }
        });
        this.setState({
            message: {...message,[name]: this.validator(name, value)}
        });
    }

    validator(name, value){
        switch (name) {
            case 'email':
            return this.emailValidation(value);
            case 'content':
            return this.contentValidation(value);
        }
    }

    emailValidation(value){
        if (!value) return '※メールアドレスを入力してください';
        const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!regex.test(value)) return '※正しい形式でメールアドレスを入力してください';
        return '';
    }

    contentValidation(value){
        if (!value) return '※内容を入力してください';
        if (value.length < 8) return '※内容は8文字以上で入力してください';
        return '';
    }

    canSubmit(){
        if(this.state.message.email == null){
            return "disabled";
        } else if(this.state.message.content == null){
            return "disabled"
        } else {
            return;;
        }
    }

    render(){
        const { info, content } = this.state;
        return (
            <div>
            <p>メールアドレス（必須）</p>
            <p className="error_message">{this.state.message.email}</p>
            <input className="form-control mail_form" type="text" name="email" value={this.state.info.email} onChange={this.handleChange} size="30" placeholder="/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" />
            <p>お問い合わせ内容（必須）</p>
            <p className="error_message">{this.state.message.content}</p>
            <textarea className="form-control mail_form" name="content" onChange={this.handleChange} defaultValue={this.state.info.content} cols="50" rows="5"></textarea>
            <input id="send_btn" className="form-control send_btn" type="submit" value="送信する"
            disabled={!this.state.info.email || !this.state.info.content || this.state.message.email || this.state.message.content } />
            </div>
        );
    }
}

export default Form;


if (document.getElementById('contact_form')) {
    ReactDOM.render(
        <Form />,
        document.getElementById('contact_form')
    );
}
