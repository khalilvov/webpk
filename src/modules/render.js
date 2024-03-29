import { RequestDelete, RequestGet, RequestPost, RequestPut } from "./api";

const LocalStorage = () => {
    const usersData = localStorage.getItem("users");
    const users = JSON.parse(usersData);

    if (!users){
        localStorage.setItem("users", JSON.stringify([]))
    } else {
        RequestGet("/users").then(data => {
            // const newUserData = users.concat(data)
            // console.log(newUserData);
    
            localStorage.setItem("users", JSON.stringify(data))
        })
    }
}

const Init = () => {
    const container = document.querySelector("#table tbody");

    const buttonPost = document.querySelector("#post");
    const buttonPatch = document.querySelector("#patch");
    const buttonDelete = document.querySelector("#delete");

    const user = {
        username: null,
        body: null,
        email: undefined,
    }

    const inputUsername = document.querySelector("#user-name");
    const inputEmail = document.querySelector("#user-email");
    const inputComment = document.querySelector("#user-comment");

    LocalStorage();

    const usersData = JSON.parse(localStorage.getItem("users"))

    inputUsername.addEventListener("input", () => {
        user.username = inputUsername.value;
    })

    inputEmail.addEventListener("input", () => {
        user.email = inputEmail.value;
    })

    inputComment.addEventListener("input", () => {
        user.body = inputComment.value;
    });

    container.innerHTML = `<tr><td>Loading...</td></tr>`

    if(usersData?.length) {
        container.innerHTML = "";
        LocalStorage();

        usersData.forEach((user, index) => {
            index += 1;
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
        })
    }

   


    buttonPost.addEventListener("click", () => {
        RequestPost("/users", user).then(() => {
            alert("POSTED")
            LocalStorage();
        }).catch(error => {
            alert(`Sizning xatoingiz: ${error.message}`);
            console.error(error)
        })
    })

    const inputUserId = document.querySelector("#user-id");

    buttonPatch.addEventListener("click", () => {
        if (
            inputUsername.value == "" ||
            inputEmail.value == "" ||
            inputComment.value == ""
        ) {
            RequestGet(`/users/${inputUserId.value}`).then(data => {
                inputUsername.value = data.username;
                inputEmail.value = data.email;
                inputComment.value = data.body;
            })
        } else {
            RequestPut(`/users/${inputUserId.value}, user`).then(() => {
                alert("PATCHED");
                LocalStorage();
            }).catch(error => {
                alert(`Sizning xatoingiz: ${error.message}`);
                console.error(error)
            })
        }
    })

    buttonDelete.addEventListener("click", () => {
        RequestDelete(`/users/${inputUserId.value}`).then(() => {
            alert("DELETED");
            LocalStorage();
        }).catch(error => {
            alert(`Xatolik: ${error.message}`);
            console.error(error);
        })
    })
}

export default Init;