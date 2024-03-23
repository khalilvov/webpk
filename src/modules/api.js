
const APIURL = `http://localhost:9000`;

const RequestGet = async (path = "") => {
    path = APIURL + path;
    return await fetch(path)
        .then(response => response.json());
}

const RequestPost = async (
    path = "", data = {}
) => {
    path = APIURL + path;

    return await fetch(path, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    }).then(response => response.json());
}

const RequestPut = async (path = "", data) => {
    path = APIURL + path;

    return await fetch(path, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    }).then(response => response.json());
}

const RequestDelete = async (path = "") => {
    path = APIURL + path;

    return await fetch(path, {
        method: "DELETE",
    }).then(response => response.json());
}

export {
    RequestDelete,
    RequestGet,
    RequestPut, RequestPost, APIURL
}