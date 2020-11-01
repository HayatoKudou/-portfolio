import React from 'react';
import ReactDOM from 'react-dom';
// import styles from './style.scss'

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            info: {
                input_val: '',
                convert_val: '',
                binary_number: '',
                octal_number: '',
                hexadecimal: '',
                decimal_number: '',
            },
            class:{
                convert_10: 'col-md-6',
                convert_N: 'col-md-6 non_display',
                convert_val: 'form-control convert_val non_display',
            },
            message:{
                calculation_speed: 0,
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.convertChange = this.convertChange.bind(this);
        this.inputDelete = this.inputDelete.bind(this);
        this.conversion = this.conversion.bind(this);
        this.changeResultForm = this.changeResultForm.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = this.state.info.input_val + event.target.value;
        const { info, message } = this.state;
        this.setState({
            info: { ...info, [name]: value }
        });
    }

    convertChange(event){
        const name = event.target.name;
        const value = event.target.value;
        const { info, message } = this.state;
        this.setState({
            info: { ...info, convert_val: value }
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

    changeResultForm(event){
        const name = event.target.name;
        const { info, message } = this.state;
        if(name == 'convert_10'){
            const convert_10 = 'col-md-6';
            const convert_N = 'col-md-6 non_display';
            const convert_val = 'form-control convert_val non_display';
            this.setState({
                class: { ...info, convert_10: convert_10, convert_N: convert_N, convert_val: convert_val }
            });
        } else if(name == 'convert_N'){
            const convert_10 = 'col-md-6 non_display';
            const convert_N = 'col-md-6';
            const convert_val = 'form-control convert_val';
            this.setState({
                class: { ...info, convert_10: convert_10, convert_N: convert_N, convert_val: convert_val }
            });
        }
    }

    conversion(){
        const startTime = performance.now(); // 開始時間
        const num_value = Number(this.state.info.input_val);
        const str_value = String(this.state.info.input_val);
        var binary_number = num_value.toString(2); //10→N
        var octal_number = num_value.toString(8);
        var hexadecimal = num_value.toString(16);
        var decimal_number = parseInt(str_value, this.state.info.convert_val); //N→10
        const endTime = performance.now(); // 終了時間
        const calculation_speed = endTime - startTime;
        const { info, message } = this.state;
        this.setState({
            info: { ...info, binary_number: binary_number, octal_number: octal_number, hexadecimal: hexadecimal, decimal_number: decimal_number }
        });
        this.setState({
            message: { ...message, calculation_speed: calculation_speed}
        });
    }

    render(){
        return (
            <div className="calculator_container">
                <div className="col-md-9">
                    <div className="output">
                        <input className="form-control input_val" type="text" name="input_val" value={this.state.info.input_val} onChange={this.inputChange} />
                        <div className="responsive">
                            <input className={this.state.class.convert_val} type="text" name="input_val" value={this.state.info.convert_val} onChange={this.convertChange} placeholder="基数" />
                            <button className="btn btn-lg btn-primary" onClick={this.conversion}>変換する</button>
                        </div>
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
                            <button className="num_bth" onClick={this.changeResultForm} name="convert_10">10→N</button>
                        </div>
                        <div className="row">
                            <button className="num_bth" onClick={this.handleChange} value='3' name="input_val">3</button>
                            <button className="num_bth" onClick={this.handleChange} value='2' name="input_val">2</button>
                            <button className="num_bth" onClick={this.handleChange} value='1' name="input_val">1</button>
                            <button className="num_bth" onClick={this.changeResultForm} name="convert_N">N→10</button>
                        </div>
                        <div className="row">
                            <button className="num_bth" onClick={this.handleChange} value='00' name="input_val">00</button>
                            <button className="num_bth" onClick={this.handleChange} value='0' name="input_val">0</button>
                            <button className="num_bth" onClick={this.handleChange} value='.' name="input_val">.</button>
                        </div>
                    </div>
                </div>

                <div className={this.state.class.convert_10}>
                    <p className="calculation_speed">計算速度: {this.state.message.calculation_speed} ms</p>
                    <div className="convert_10">
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

                <div className={this.state.class.convert_N}>
                    <p className="calculation_speed">計算速度: {this.state.message.calculation_speed} ms</p>
                    <p>{this.state.info.convert_val}進数 → 10進数</p>
                    <div className="result_form">
                        <p>10進数</p>
                        <input className="form-control" type="text" name="binary_number" value={this.state.info.decimal_number} onChange={this.handleChange} />
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
