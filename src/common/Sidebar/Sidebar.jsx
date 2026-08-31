import "./sidebar.css";
function Sidebar({ page, onList, onForm }) {
  return (
    <aside>
      <button className={page === "list" ? "active" : ""} onClick={onList}>
        List
      </button>

      <button className={page === "form" ? "active" : ""} onClick={onForm}>
        Form
      </button>
    </aside>
  );
}

export default Sidebar;
