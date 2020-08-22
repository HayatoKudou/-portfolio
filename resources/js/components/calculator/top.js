import React from 'react';
import ReactDOM from 'react-dom';
// import styles from './style.scss'

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            info: {
                input_val: '',
                binary_number: '',
                octal_number: '',
                hexadecimal: '',
            },
            message:{
                calculation_speed: 0,
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.inputDelete = this.inputDelete.bind(this);
        this.conversion = this.conversion.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = this.state.info.input_val + event.target.value;
        const { info, message } = this.state;
        this.setState({
            info: { ...info, [name]: value }
        });
    }

    inputChange(event){
        const name = event.target.name;
        const value = event.target.value;
        const { info, message } = this.state;
        this.setState({
            info: { ...info, [name]: value }
        });
    }

    inputDelete(){
        const input_val = this.state.info.input_val;
        var after_input_val = input_val.slice( 0, -1 );
        const { info, message } = this.state;
        this.setState({
            info: { ...info, input_val: after_input_val }
        });
    }

    conversion(){
        const startTime = performance.now(); // 開始時間
        const value = Number(this.state.info.input_val);
        var binary_number = value.toString(2);
        var octal_number = value.toString(8);
        var hexadecimal = value.toString(16);
        const endTime = performance.now(); // 終了時間
        const calculation_speed = endTime - startTime;
        const { info, message } = this.state;
        this.setState({
            info: { ...info, binary_number: binary_number, octal_number: octal_number, hexadecimal: hexadecimal }
        });
        this.setState({
            message: { ...message, calculation_speed: calculation_speed}
        });
    }

    render(){
        return (
            <div className="container">
                <div className="col-md-6">
                    <div className="output">
                        <input className="form-control" type="text" name="input_val" value={this.state.info.input_val} onChange={this.inputChange} />
                        <button className="btn btn-lg btn-primary" onClick={this.conversion}>変換する</button>
                    </div>
                    <div className ="calculator_input">
                        <div className="row">
                            <button className="num_bth" onClick={this.handleChange} value="9" name="input_val">9</button>
                            <button className="num_bth" onClick={this.handleChange} value='8' name="input_val">8</button>
                            <button className="num_bth" onClick={this.handleChange} value='7' name="input_val">7</button>
                            <button className="num_bth" onClick={this.inputDelete} name="input_val">CE</button>
                        </div>
                        <div className="row">
                            <button className="num_bth" onClick={this.handleChange} value='6' name="input_val">6</button>
                            <button className="num_bth" onClick={this.handleChange} value='5' name="input_val">5</button>
                            <button className="num_bth" onClick={this.handleChange} value='4' name="input_val">4</button>
                        </div>
                        <div className="row">
                            <button className="num_bth" onClick={this.handleChange} value='3' name="input_val">3</button>
                            <button className="num_bth" onClick={this.handleChange} value='2' name="input_val">2</button>
                            <button className="num_bth" onClick={this.handleChange} value='1' name="input_val">1</button>
                        </div>
                        <div className="row">
                            <button className="num_bth" onClick={this.handleChange} value='00' name="input_val">00</button>
                            <button className="num_bth" onClick={this.handleChange} value='0' name="input_val">0</button>
                            <button className="num_bth" onClick={this.handleChange} value='.' name="input_val">.</button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <p className="calculation_speed">計算速度: {this.state.message.calculation_speed} ms</p>
                    <div className="result_form">
                        <p>2進数</p>
                        <input className="form-control" type="text" name="binary_number" value={this.state.info.binary_number} onChange={this.handleChange} />
                    </div>
                    <div className="result_form">
                        <p>8進数</p>
                        <input className="form-control" type="text" name="octal_number" value={this.state.info.octal_number} onChange={this.handleChange} />
                    </div>
                    <div className="result_form">
                        <p>16進数</p>
                        <input className="form-control" type="text" name="hexadecimal" value={this.state.info.hexadecimal} onChange={this.handleChange} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Calculator;


if (document.getElementById('calculator')) {
    ReactDOM.render(
        <Calculator />,
        document.getElementById('calculator')
    );
}
