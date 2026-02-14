import { useState, useEffect } from "react";
import "../styles/admin.css"

export default function Admin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [projects, setProjects] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [link, setLink] = useState("");

    function loadProjects() {
        fetch(`${import.meta.env.VITE_API_URL}/projects`, {
            headers: { "Authorization": token }
        })
        .then(res => res.json())
        .then(data => setProjects(data));
    }

    useEffect(() => {
        if (token) loadProjects();
    }, [token]);

    function login() {
        if (!username || !password) return alert("Preencha tudo");

        fetch(`${import.meta.env.VITE_API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("token", data.token);
            setToken(data.token);
        });
    }

    function logout() {
        localStorage.removeItem("token");
        setToken("");
    }

    function saveProject() {
        if (!name || !description || !link) return alert("Preencha tudo!");

        const url = editingId ? `${import.meta.env.VITE_API_URL}/projects/${editingId}` : `${import.meta.env.VITE_API_URL}/projects`;

        const method = editingId ? "PUT" : "POST";

        fetch(url, {
            method,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({ name, description, link })
        }).then(() => {
            setName("");
            setDescription("");
            setLink("");
            setEditingId(null);
            loadProjects();
        });
    }

    function deleteProject(id) {
        if (!confirm("Deseja excluir este projeto?")) return;

        fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
            method: "DELETE",
            headers: { "Authorization": token },
        }).then(loadProjects);
    }

    function startEdit(project) {
        setName(project.name);
        setDescription(project.description);
        setLink(project.link)
        setEditingId(project._id);
    }

    if(!token) {
        return (
            <div className="login-page">
                <div className="login-box">
                    <h2>Admin Login</h2>

                    <input placeholder="Usuário" onChange={e => setUsername(e.target.value)} />

                    <input type="password" placeholder="Senha" onChange={e => setPassword(e.target.value)} />

                    <button onClick={login}>Entrar</button>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <header className="admin-header">
                <h2>Painel Admin</h2>
                <button onClick={logout}>Sair</button>
            </header>

            <main className="admin-main">
                <section className="admin-list">
                    <h3>Projetos</h3>

                    {projects.map(project => (
                        <div className="project-item" key={project._id}>
                            <div>
                                <strong>{project.name}</strong>

                                <p>{project.description}</p>
                            </div>

                            <div className="actions">
                                <button onClick={() => startEdit(project)}>Editar</button>
                                <button className="delete" onClick={() => deleteProject(project._id)}>Excluir</button>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="admin-form">
                    <h3>{editingId ? "Editar Projeto" : "Novo Projeto"}</h3>

                    <input 
                    placeholder="Nome" 
                    value={name} 
                    onChange={e => setName(e.target.value)} />

                    <textarea
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)} />

                    <input 
                    placeholder="Link do projeto" 
                    value={link}
                    onChange={e => setLink(e.target.value)} 
                    />

                    <button onClick={saveProject}>{editingId ? "Atualizar" : "Adicionar"}</button>
                </section>
            </main>
        </div>
    )

}