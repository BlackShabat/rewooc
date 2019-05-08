import './App.scss';
import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter, Route} from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../Home/Home';
import Archive from '../Archive/Archive';
import {ajaxEndpoint} from '../../../../shared/utilities';

export const {Provider, Consumer} = React.createContext();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appData: null
        };
    }

    componentDidMount() {
        axios.get('http://rewooc.loc/server/wp', {
            headers: {
                'Authorization': 'Basic ' + Buffer.from('admin:admin').toString('base64')
            }
        }).then(({data}) => {
            this.setState({
                appData: data
            });
        })
    }

    onAddToCart(e, id) {
        e.preventDefault();

        let params = new FormData();
        params.set('productId', id);

        axios.get(ajaxEndpoint('rewooc_add_to_cart')).then(response => {
            console.log(response.data);
        });
    }

    render() {
        return this.state.appData ? (
            <Provider value={this.state.appData}>
                <Layout>
                    <BrowserRouter>
                        <Route path="/new/public/" exact render={() => <Home onAddToCart={this.onAddToCart}/>}/>
                        <Route path="/new/public/shop" component={Archive}/>
                    </BrowserRouter>
                </Layout>
            </Provider>
        ) : (
            <div>Loading...</div>
        )
    }
}

export default App;