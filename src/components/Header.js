function Header({ title, onNew, showNewButton }) {
  return (
    <header>
      <h2>{title}</h2>

      {showNewButton && <button onClick={onNew}>+ New</button>}
    </header>
  );
}

export default Header;
