import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import CssBaseline from '@material-ui/core/CssBaseline';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {Provider} from 'react-redux';
import store from './redux/store';

const theme = createMuiTheme({
  shape:{
    borderRadius:4
  }
})



function base() {
 return (
  <React.StrictMode>
    <Provider store={store}>
    <CssBaseline/>
    <ThemeProvider theme={theme}>
    <App />

    </ThemeProvider>
    </Provider>
  </React.StrictMode>
 )
}

ReactDOM.render(
 base() ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
