import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchClassificado } from './components/FetchClassificado';
import { AddClassificado } from './components/AddClassificado';
import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={FetchClassificado} />
                <Route path='/fetch-classificado' component={FetchClassificado} />
                <Route path='/add-classificado' component={AddClassificado} />
                <Route path='/classificado/edit/:id' component={AddClassificado} />
            </Layout>
        );
    }
}
