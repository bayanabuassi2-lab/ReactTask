import { useState } from "react";

import Header from "./common/Header/Header";
import Sidebar from "./common/Sidebar/Sidebar";

import EventsPage from "./components/EventPage/EventsPage";
import FormPage from "./components/FormPage/FormPage";

function App() {
  const [page, setPage] = useState("list");
  const [editId, setEditId] = useState(null);

  function showList() {
    setPage("list");
    setEditId(null);
  }

  function showCreateForm() {
    setEditId(null);
    setPage("form");
  }

  function showEditForm(id) {
    setEditId(id);
    setPage("form");
  }

  let pageTitle = "";

  if (page === "list") {
    pageTitle = "Events";
  } else if (editId) {
    pageTitle = "Edit Event";
  } else {
    pageTitle = "Create Event";
  }

  return (
    <div className="container">
      <Sidebar
        page={page}
        onList={showList}
        onForm={showCreateForm}
      />

      <main>
        <Header
          title={pageTitle}
          onNew={showCreateForm}
          showNewButton={page === "list"}
        />

        {page === "list" ? (
          <EventsPage onEdit={showEditForm} />
        ) : (
          <FormPage
            editId={editId}
            onCancel={showList}
          />
        )}
      </main>
    </div>
  );
}

export default App;