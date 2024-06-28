export default function Badge(props) {
    return (
        <div className={`badge ${props.className}`}>{props.children}</div>
    );
}