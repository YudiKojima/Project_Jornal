import React, { Component } from 'react';

import styles from './Forma.module.css'

// para zerar todos elementos da tabela antes de começar
export class Classificado {
    constructor() {
        this.id = 0;
        this.titulo = "";
        this.date = "";
        this.descricao = "";
    }
}

export class AddClassificado extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", classificado: new Classificado(), loading: true };
        this.inicialize();
        this.handleSalve = this.handleSalve.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    // inicializar a edição ou criação
    async inicialize() {

        var id = this.props.match.params["id"];
        if (id > 0) {
            const response = await fetch('api/Classificados/' + id);
            const data = await response.json();
            this.setState({ title: "Edit", classificado: data, loading: false });
        }
        else {

            this.state = { title: "Create", classificado: new Classificado(), loading: false };
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return (
            <div className={styles.form}>
                {/* Create - add-classificados */ }
                <h1>Criar novo classificado</h1>
                {contents}
            </div>
        );
    }
    

    handleSalve(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        if (this.state.classificado.id) {
            const response1 = fetch('api/Classificados/' + this.state.classificado.id, { method: 'PUT', body: data });
            // após fazer o PUT irá voltar para a página principal
            window.location.href = "fetch-classificado";
        }
        else {
            const response2 = fetch('api/Classificados/', { method: 'POST', body: data });
            // após fazer o POST irá voltar para a página principal
            window.location.href = "fetch-classificado";
        }
    }

    // Caso cancelar irá voltar para a página principal
    handleCancel(event) {
        event.preventDefault();
        window.location.href = "fetch-classificado";
    }

    // Formulário para preencher as informações
    renderCreateForm() {
        return (
            // id não será inserido, portanto oculto
            <form className={styles.form} onSubmit={this.handleSalve}>
                <div className="form-group row">
                    <input type="hidden" name="id" value={this.state.classificado.id} />
                </div>
                {/*  inserir titulo */}
                <div className="form-group row">
                    <div className="col-md-6">
                        <h4>Digite um Título: </h4>
                        <input className="form-control" type="text" name="titulo" placeholder='Insira um nome...' defaultValue={this.state.classificado.titulo} required />
                    </div>
                </div>
                {/*  inserir descrição */}
                <div className="form-group row">
                    <div className="col-md-6">
                        <h4>Digite uma Descrição: </h4>
                        <textarea className="form-control" type="text" name="descricao" placeholder='Insira uma descrição...' defaultValue={this.state.classificado.descricao} required />
                    </div>
                </div>
                {/*  Botão */}
                <div className="form-group">
                    <button type="submit" className="btn btn_edit" value={this.state.classificado.id}>Salvar</button> &nbsp;
                    <button className="btn btn_delete" onClick={this.handleCancel}>Cencelar</button>
                </div>
            </form>
        );
    }
}