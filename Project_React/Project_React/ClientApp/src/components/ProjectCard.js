function ProjectCard({
    id,
    titulo,
    date,
    descricao,
}) {
    return (
        <div>
            <h4>{titulo}</h4>
            <p>
                <span>Classificado:</span> {id}
            </p>
            <p>
                <span>Data:</span> {date}
            </p>
            <p>
                <span></span> {descricao}
            </p>
            <p>
                <span></span> {sobre}
            </p>
        </div>
    );
}

export default ProjectCard;
