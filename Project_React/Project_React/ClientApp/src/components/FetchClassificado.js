import React, { Component } from "react"
import { Container } from 'reactstrap';
import styles from './LinkButton.css';

export class FetchClassificado extends Component {
    static displayName = "Classificados";


    constructor() {
        super();
        this.state = { classificados: [], loading: true }
    }

    componentDidMount() {
        this.populaClassificadoData();
    }

    // route do edit
    static handleEdit(id) {
        window.location.href = "/classificado/edit/" + id;
    }

    // selecionar delete irá aparecer um alert para confirmar
    static handleDelete(id) {
        if (!window.confirm("Você deseja deletar o classificado : " + id)) {
            return;
        }
        else {
            // deletando no banco
            fetch('api/classificados/' + id, { method: 'delete' })
                .then(json => {
                    window.location.href = "fetch-classificado";
                    alert('Deletado com Sucesso!');
                })
        }
    }

    static formatarData(data) {
        // Função para formatar a data no padrão brasileiro
        const dateObj = new Date(data);
        const dia = String(dateObj.getDate()).padStart(2, "0");
        const mes = String(dateObj.getMonth() + 1).padStart(2, "0");
        const ano = dateObj.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }


    static renderClassificadosTabela(classificados) {
        return (
            <div className='styles.container'>
            <Container>
            <table className='table table-striped' aria-labelledby="tabelLabel" >
                <thead>
                    <tr>
                        <th>Classificado</th>
                        <th>Título</th>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                        {/* Fazer um map para listar todas informações que está dentro do banco */}
                <tbody>
                    {classificados.length > 0 ? (
                        classificados.map(clas => (
                            <tr key={clas.id}>
                                <td>{clas.id}</td>
                                <td>{clas.titulo}</td>
                                <td>{this.formatarData(clas.date)}</td>
                                <td>{clas.descricao}</td>
                                <td>
                                    <button className="btn btn_edit" onClick={() => this.handleEdit(clas.id)}>
                                        Edição
                                    </button>
                                    &nbsp;
                                    <button className="btn btn_delete" onClick={() => this.handleDelete(clas.id)}>
                                        Remover
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">Nenhum classificado encontrado.</td>
                        </tr>
                    )}
                </tbody>
                    </table> 
                </Container>
            </div>
        );

    }

    // redirecionando para o route add
    handleAdd(event) {
        event.preventDefault();
        window.location.href = "add-classificado";
    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando... </em> </p>
            : FetchClassificado.renderClassificadosTabela(this.state.classificados);

        // Cabeçalho
        return (
            <div className='styles.container'>
                <h1>Classificados</h1>
                <div className='styles.container_add'>
                    <button className="btn btn_add" onClick={this.handleAdd}>+ Novo classificado</button>
                </div>
                {contents}
            </div>
        );
    }


    async populaClassificadoData() {
        const response = await fetch('api/Classificados');
        const data = await response.json();
        this.setState({ classificados: data, loading: false });
    }

}