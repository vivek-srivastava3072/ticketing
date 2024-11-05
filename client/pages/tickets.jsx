import { useState } from "react";
import axios from "axios";
import useRequest from "../hooks/use-request";

const TicketsPage = ({ initialTickets }) => {
  const [tickets, setTickets] = useState(initialTickets || []);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { doRequest, errors } = useRequest({
    url: "http://localhost:4001/api/tickets",
    method: "post",
    body: {
      title,
      description,
    },
    onSuccess: (ticket) => {
      setTickets([...tickets, ticket]); 
      setTitle(""); 
      setDescription(""); 
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <div className="container mx-auto d-flex flex-column my-2">
      <form onSubmit={onSubmit} className="shadow shadow-md rounded p-3 mb-4">
        <h2>Create Ticket</h2>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            required
          />
        </div>
        {errors}
        <button className="btn btn-primary mt-3">Create Ticket</button>
      </form>
      <ul className="p-0">
        <h4>My Tickets</h4>

        {tickets.map((ticket, idx) => (
          <li
            key={ticket.id}
            className="list-group-item m-0 p-2 bg-info-subtle rounded my-1"
          >
            {idx + 1}. {ticket.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

TicketsPage.getInitialProps = async (context) => {
  const { data } = await axios.get("http://localhost:4001/api/tickets", {
    headers: context.req
      ? { cookie: context.req.headers.cookie || "" }
      : undefined,
    withCredentials: true,
  });
  return { initialTickets: data };
};

export default TicketsPage;
