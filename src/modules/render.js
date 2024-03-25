import { RequestDelete, RequestGet, RequestPost } from './api';

const Init = () => {
  const container = document.querySelector('#table tbody');

  const buttonPost = document.querySelector('#post');
  const buttonPatch = document.querySelector('#patch');
  const buttonDelete = document.querySelector('#delete');

  const user = {
    username: null,
    body: null,
    email: undefined,
  };

  const inputUsername = document.querySelector('#user-name');
  const inputEmail = document.querySelector('#user-email');
  const inputComment = document.querySelector('#user-comment');
  const inputUserId = document.querySelector('#user-id');

  inputUsername.addEventListener('input', () => {
    user.username = inputUsername.value;
  });
  inputEmail.addEventListener('input', () => {
    user.email = inputEmail.value;
  });
  inputComment.addEventListener('input', () => {
    user.body = inputComment.value;
  });

  buttonPost.addEventListener('input', () => {
    user.body = inputComment.value;
  });

  container.innerHTML = `<tr><td>Loading...</td></tr>`;

  RequestGet('/users').then((data) => {
    container.innerHTML = '';

    data.forEach((user, index) => {
      index += 1;
      container.insertAdjacentHTML(
        'beforeend',
        `
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
            `
      );
    });

    const patchButtons = document.querySelectorAll('[data-user-patch-id]');
    const deleteButtons = document.querySelectorAll('[data-user-delete-id]');

    if (
      (patchButtons && patchButtons?.lenght) ||
      (deleteButtons && deleteButtons?.lenght)
    ) {
      patchButtons.forEach((patchButton) => {
        const currentButton = patchButton;

        currentButton.addEventListener('click', (e) => {
          const id = e.target.dataset.userPatchId;

          console.log(id);

          if (
            inputEmail.value == '' ||
            inputComment.value == '' ||
            inputUsername.value == ''
          ) {
            RequestGet(`/users/${id}`).then((data) => {
              inputComment.value = data.body;
              inputEmail.value = data.email;
              inputUsername.value = data.username;

              inputUserId.value = data.id;
            });
          }else{
            RequestPut(`/users/${id}`,user).then(() => {
                alert("Updated")
            }).catch(error => {
                alert(`Xatolik: ${error.message}`);
                console.error(error);
            })
          }
        });
      });
    }
  });

  buttonPost.addEventListener('click', () => {
    RequestPost('/users', user)
      .then(() => {
        alert('POSTED');
      })
      .catch((error) => {
        alert(`sizning Xatoingiz: ${error.message} `);
        console.error(error);
      });
  });

  buttonPatch.addEventListener('click', () => {
    if (
      inputUsername.value == '' ||
      inputEmail.value == '' ||
      inputComment.value == ''
    ) {
      RequestGet(`/users/${inputUserId.value}`).then((data) => {
        inputUsername.value = data.username;
        inputEmail.value = data.email;
        inputComment.value = data.body;
      });
    } else {
      RequestPut(`/users/${InputUserId.value}`, user)
        .then(() => {
          alert('PATCHED');
        })
        .catch((error) => {
          alert(`sizning Xatoingiz: ${error.message} `);
          console.error(error);
        });
    }
  });

  buttonDelete.addEventListener('click', () => {
    RequestDelete(`/users/${inputUserId.value}`)
      .then(() => {
        alert('DELETED');
      })
      .catch((error) => {
        alert(`Xatolik: ${error.message}`);
        console.error(error);
      });
  });
};

export default Init;
