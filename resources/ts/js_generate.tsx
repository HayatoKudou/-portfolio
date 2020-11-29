import React from 'react';
import ReactDOM from 'react-dom';

declare namespace JSX {
    interface ElementClass {
        render: () => any;
      }
  }

// export const App: React.FC = () => {
export default class App extends React.Component{
    constructor(props: string){
        super(props);
    }
    render(){
        return
            <div>
                <input type="radio" name="language" />
            </div>;
    }
}

if (document.getElementById('js_generate')) {
    ReactDOM.render(<App />, document.getElementById('js_generate'));
}