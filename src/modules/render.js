import { RequestGet } from "./api";

const Init = () => {
    const container = document.querySelector("#table tbody");

    container.innerHTML = `<tr><td>Loading...</td></tr>`

    RequestGet("/users").then(data => {
        container.innerHTML = "";

        data.forEach((user, index) => {
            index += 1
            container.insertAdjacentHTML("beforeend", `
                <tr>
                    <th scope="row">${index}</th>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.body}</td>
                    <td>
                        <button class="btn btn-warning" data-user-patch-id="${user.id}">Patch</button>
                    </td>
                    <td>
                        <button class="btn btn-danger" data-user-delete-id="${user.id}">Delete</button>
                    </td>
                </tr>
            `);
        });
    })
}

export default Init;