import React from 'react';
import ReactDOM from 'react-dom';
// import Validation from './Validation';

class AimTraining extends React.Component{
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

    render(){
        const { info, content } = this.state;
        return (
            <div></div>
        );
    }
}

export default Form;


if (document.getElementById('aim_training')) {
    ReactDOM.render(
        <AimTraining />,
        document.getElementById('aim_training')
    );
}
