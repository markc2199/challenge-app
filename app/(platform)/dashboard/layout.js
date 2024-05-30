import Nav from "../_components/nav";


export default function Layout({ children }) {
    return (
        <>
            <Nav />
            {children}
        </>
    );
}