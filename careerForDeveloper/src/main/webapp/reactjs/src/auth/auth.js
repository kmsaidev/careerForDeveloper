import axios from "axios";

function auth() {

}

export function login({ id, password }) {
    axios.post("/users/login", {
        email: id,
        pwd: password,
    })
        .then((res) => {
            console.log(res);
            if (res.data.isSuccess) {
                console.log(res.data.result);
                return res.data.result;
            } else {
                alert(res.data.message);
                return undefined;
            }
        });
}

export default auth
