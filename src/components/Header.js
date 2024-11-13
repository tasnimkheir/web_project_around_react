import favIcon from "../images/favicon.svg"

export default function Header() {
    return (
    <header className="header">
        <img
        src={favIcon}
        alt="logo around the us"
        className="header__logo"
        />
    </header>
    );
}