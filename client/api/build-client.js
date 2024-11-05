import axios from "axios";

// export default ({ req }) => {
//     if (typeof window === "undefined") {
//         // We are on the server

//         return axios.create({
//             baseURL:
//                 "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
//             headers: req.headers,
//         });
//     } else {
//         // We must be on the browser
//         return axios.create({
//             baseUrl: "/",
//         });
//     }
// };

export default ({ req }) => {
    return axios.create({
        baseUrl: "http://localhost:4000",
        withCredentials: true,
    });
};
