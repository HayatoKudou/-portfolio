import React from 'react';
import ReactDOM from 'react-dom';
// import styles from './style.scss'

class Garbled extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            input_data: '',
            output_data: '',
        };
    }

    render(){
        return (
            <div className="garbled_container">
                <div className="col-md-9">
                    <div className="garbled_input">
                        <input className="form-control input_val" type="text" name="input_val" value={this.state.info.input_val} onChange={this.inputChange} />
                    </div>

                    <div className ="garbled_output">
                        <div className="row">
                    </div>
                </div>
            </div>
        );
    }
}

export default Garbled;


if (document.getElementById('garbled')) {
    ReactDOM.render(
        <Garbled />,
        document.getElementById('garbled')
    );
}
