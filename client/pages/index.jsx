// import buildClient from '../api/build-client';
import axios from "axios";
import Link from "next/link";

axios.defaults.baseURL = "http://localhost:4000";

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <div>
      <h1>You are signed in</h1>
      <Link href="/tickets" className="btn btn-primary my-2">
        My Tickets
      </Link>
    </div>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

LandingPage.getInitialProps = async (context) => {
  console.log("LANDING PAGE!");
  //   const client = buildClient(context);
  const { data } = await axios.get("/api/users/currentuser", {
    headers: context.req
      ? { cookie: context.req.headers.cookie || "" }
      : undefined,
    withCredentials: true,
  });
  return data;
};

export default LandingPage;
