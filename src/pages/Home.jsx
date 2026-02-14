import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import "../styles/style.css";

export default function Home() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/projects`)
        .then(res => res.json())
        .then(data => setProjects(data));
    }, []);

    return (
        <>
            <header className="site-header">
                <h1>Augusto Santana</h1>
                <p>Desenvolvedor Fullstack</p>
            </header>

            <section className="section about">
                <h2>Sobre mim</h2>

                <p>
                    Sou estudante de Análise e Desenvolvimento de
                    Sistemas, focado em JavaScript  e no 
                    desenvolvimento de aplicações web completas, 
                    trabalhando tanto no front-end quanto no  back-end.
                </p>
            </section>

            <section className="section techs">
                <h2>Tecnologias</h2>

                <div className="tech-grid">
                    <span>HTML</span>
                    <span>CSS</span>
                    <span>JavaScript</span>
                    <span>React</span>
                    <span>Node.js</span>
                    <span>MongoDB</span>
                    <span>Git</span>
                    <span>GitHub</span>
                </div>
            </section>

            <section className="section projects">
                <h2>Meus Projetos</h2>

                <div className="grid">
                    {projects.map(p => (
                        <ProjectCard key={p._id} project={p} />
                    ))}
                </div>
            </section>

            <section className="section contact">
                <h2>Contato</h2>
                <p>Email: augusto.dev.silva@gmail.com</p>
                <p>GitHub: <a href="https://github.com/Augusto-s-silva" target="_blank" rel="noopener noreferrer">Augusto-s.silva</a></p>
            </section>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} - Augusto Santana</p>
            </footer> 
        </>
    );
}