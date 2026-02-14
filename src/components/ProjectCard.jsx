export default function ProjectCard({ project }) {
    return (
        <div className="card">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <a href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-btn"
            >
                Ver Projeto
            </a>
        </div>
    );
}