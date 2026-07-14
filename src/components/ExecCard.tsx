interface CardProperties {
    name?: string;
    role: string;
    photo?: string;
}

export default function ExecCard({ name, role, photo }: CardProperties) {
    return (
        <article className="team-card">
            <div className="team-card__photo">
                {photo && <img src={photo} alt={name ?? role} />}
            </div>
            {name && <h4>{name}</h4>}
            <p>{role}</p>
        </article>
    );
}
