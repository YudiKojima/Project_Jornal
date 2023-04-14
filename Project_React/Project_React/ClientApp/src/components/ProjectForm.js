function ProjectForm({ id, titulo, date, descricao }) {
    return (
        <div>
            <h4>{titulo}</h4>
            <p>
                <span>Classificado:</span> {id}
            </p>
            <p>
                <span></span> {date}
            </p>
            <p>
                <span></span> {descricao}
            </p>
        </div>
    );
}

export default ProjectForm;