const state = {
    taskList: []
}

const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");

// template for the cards on the screen
const htmlTaskContents = ({ url, title, type, description, id }) => {
    return `
    <div class="col-md-6 col-lg-4 mt-3" id=${id}>
        <div class="card shadow-sm task__card">
            <div class="card-header d-flex justify-content-end task__card__header">
                <button type="button" class="btn btn-outline-primary" style="margin-right:1rem" name=${id} onclick="editTask()">
                    <i class="fas fa-pencil-alt" name=${id}></i>
                </button>
                <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask()">
                    <i class="fas fa-trash-alt" name=${id}></i>
                </button>
            </div>

           <div class="card-body">
                ${url
            ? `<img width="100%" src=${url} alt="card image" class="card-img-top md-3 rounded-lg">`
            : `<img width="100%" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIwA3wMBIgACEQEDEQH/xAAaAAEBAAMBAQAAAAAAAAAAAAAABQQGBwED/8QAPBABAAECAwQGBQkJAQAAAAAAAAECBAMFEQYWUZMSITFBVWETFVRkshQiMjQ1cnN00SNCYoGCocHh8Af/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A7EAAAAAAAAAAAAAAAAAAAAAAAAAASEgAAAAAAAAAAAAAAAAAAAAAAAAAAEhIAAAAAAAAAMa8vrWxoorvLjCwaap0ia6tOsGSJe8WS+J23Mh5vHkviVtzIBVErePJfErbmQbx5L4lbcyAVRK3jyXxK25kG8eS+JW3MgFUSt48l8StuZD3eLJfE7bmQCoPja3ODd4MY1tiU4mFMzpXT2To+wAAAAAABISAAAAAAAAAgbUUU4l5ktFdNNVNV5ETExrE/NX0HaX6/kf52PhkFT1dY+x2/Kg9XWPsdvyoZQDF9XWPsdvyoPV1j7Hb8qGV1/8Af4AYvq6y1iIs7flQerrHsmzt/wCeHT+jWf8A0LObvL8O3tbOucL00VV14kds6d0J2wWe3+PmfyG5xq8bCromqJqnWaZjzBu/q6x9jt+VBOXWOn1O35UMp5PYCFsVERkVEREREY2J1R95eQti/sOn8bF+KV0AAAAAAAkJAAAAAAAAAQdpfr+R/nY+GV5B2l+v5H+dj4ZBeYGdZta5PZTc3U+VFEdtc+RnWbW2T2U3N1Vp3U0R21z5OSZ3m9znF7NxdVfdojrimOEAtWW2t/h5xVdXHz7euYivAp7KKe7TzdIsbvAv7Wi5tcSnEwq46qo7v9uHLezO0GNklzOnSxLSqr9ph6/3jzB03OcntM6t6cC8on5s6010dtL45Fs7YZJNVdrFdeLXGk14kxrpwhQsrvAv7ai5tcSMTCqjWmY7vKWm7abV+iivLsrxI6fZi41M/R/hp8/MG5W13b3XpIt8anE9HVNOJ0Z16NT7T2OL5Lm9zk978pta+36dMz1Vx5/q6zk+bW2cWcXFpOsRGldP71M+YMLYv7Dp/GxfildQti/sKn8XF+KV0AAAAAAAkJAAAAAAAAAaxttd02E5Xd4lPSowrnp6RPX9GWztd21ye6zmywMK09FFWHi9Krp1ad2gOb51m1znF7Nxc1fdop7KY4MBtG4mc+7c03Ezn3bmg1c1bRuJnPu3NNxM5925oI1hnF9l9vj4Fpj1UYeNT0ao4eccGB3697Z9xM542/Ne7iZz7tzQauoZLm1zk93GPbV9saVUVdlVPBY3Ezn3bmvNxM5925oNz2HrjE2dwcTsivFxJ0/qlfSdlsuxsrybBtLroxi0VVT83rjrnVWAAAAAAAJCQAAAAAAAAHj0A1niazxADWeJrPEANZ4ms8QA1niazxADh5AAAAAAAAEhIAAAAAAAAAAAAAAAAAAAAAAAAAABISAAAAAAAAAAAAAAAAAAAAAAAAAAASEg/9k=" alt="card image" class="img-fluid place__holder__image mb-3" alt="card image" class="card-img-top md-3 rounded-lg">`
        }
                <h4 class="card-title task__card__title">${title}</h4>
                <p class="description trim-3-lines text-muted">${description}</p>
                <div class="tags text-white d-flex flex-wrap">
                    <span class="badge bg-primary m-1">${type}</span>
                </div>
           </div>

           <div class="card-footer">
                <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showTask" onclick="openTask()" id=${id}>Open Task</button>
           </div>
            
        </div>
    </div>
`;
};

// modal body on click of open task
const htmlModalContents = ({ id, title, description, url }) => {
    const date = new Date(parseInt(id));
    return `
        <div id=${id}>
        ${url
            ? `<img width="100%" src=${url} alt="card image" class="card-img-top md-3 rounded-lg"`
            : `<img width="100%" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIwA3wMBIgACEQEDEQH/xAAaAAEBAAMBAQAAAAAAAAAAAAAABQQGBwED/8QAPBABAAECAwQGBQkJAQAAAAAAAAECBAMFEQYWUZMSITFBVWETFVRkshQiMjQ1cnN00SNCYoGCocHh8Af/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A7EAAAAAAAAAAAAAAAAAAAAAAAAAASEgAAAAAAAAAAAAAAAAAAAAAAAAAAEhIAAAAAAAAAMa8vrWxoorvLjCwaap0ia6tOsGSJe8WS+J23Mh5vHkviVtzIBVErePJfErbmQbx5L4lbcyAVRK3jyXxK25kG8eS+JW3MgFUSt48l8StuZD3eLJfE7bmQCoPja3ODd4MY1tiU4mFMzpXT2To+wAAAAAABISAAAAAAAAAgbUUU4l5ktFdNNVNV5ETExrE/NX0HaX6/kf52PhkFT1dY+x2/Kg9XWPsdvyoZQDF9XWPsdvyoPV1j7Hb8qGV1/8Af4AYvq6y1iIs7flQerrHsmzt/wCeHT+jWf8A0LObvL8O3tbOucL00VV14kds6d0J2wWe3+PmfyG5xq8bCromqJqnWaZjzBu/q6x9jt+VBOXWOn1O35UMp5PYCFsVERkVEREREY2J1R95eQti/sOn8bF+KV0AAAAAAAkJAAAAAAAAAQdpfr+R/nY+GV5B2l+v5H+dj4ZBeYGdZta5PZTc3U+VFEdtc+RnWbW2T2U3N1Vp3U0R21z5OSZ3m9znF7NxdVfdojrimOEAtWW2t/h5xVdXHz7euYivAp7KKe7TzdIsbvAv7Wi5tcSnEwq46qo7v9uHLezO0GNklzOnSxLSqr9ph6/3jzB03OcntM6t6cC8on5s6010dtL45Fs7YZJNVdrFdeLXGk14kxrpwhQsrvAv7ai5tcSMTCqjWmY7vKWm7abV+iivLsrxI6fZi41M/R/hp8/MG5W13b3XpIt8anE9HVNOJ0Z16NT7T2OL5Lm9zk978pta+36dMz1Vx5/q6zk+bW2cWcXFpOsRGldP71M+YMLYv7Dp/GxfildQti/sKn8XF+KV0AAAAAAAkJAAAAAAAAAaxttd02E5Xd4lPSowrnp6RPX9GWztd21ye6zmywMK09FFWHi9Krp1ad2gOb51m1znF7Nxc1fdop7KY4MBtG4mc+7c03Ezn3bmg1c1bRuJnPu3NNxM5925oI1hnF9l9vj4Fpj1UYeNT0ao4eccGB3697Z9xM542/Ne7iZz7tzQauoZLm1zk93GPbV9saVUVdlVPBY3Ezn3bmvNxM5925oNz2HrjE2dwcTsivFxJ0/qlfSdlsuxsrybBtLroxi0VVT83rjrnVWAAAAAAAJCQAAAAAAAAHj0A1niazxADWeJrPEANZ4ms8QA1niazxADh5AAAAAAAAEhIAAAAAAAAAAAAAAAAAAAAAAAAAABISAAAAAAAAAAAAAAAAAAAAAAAAAAASEg/9k=" alt="card image" class="img-fluid place__holder__image mb-3" alt="card image" class="card-img-top md-3 rounded-lg"`
        }
            <strong class="text-muted text-sm">Created On ${date.toDateString()}</strong>
            <h2 class="mb-3">${title}</h2>
            <p class="text-muted">${description}</p>
        </div>
    `;
};

const updateLocalStorage = () => {
    localStorage.setItem(
        "task",
        JSON.stringify({
            tasks: state.taskList
        })
    )
}

const loadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.task);

    if (localStorageCopy) state.taskList = localStorageCopy.tasks;

    state.taskList.map((cardDate) => {
        taskContents.insertAdjacentHTML("beforeend", htmlTaskContents(cardDate));
    });
}

const clearValues = () =>{
    let clr = document.getElementsByClassName("clear");
    for(i=0;i<clr.length;i++){
        clr[i].value = "";
    }
}

const handleSubmit = (event) => {
    const id = `${Date.now()}`;
    const input = {
        url: document.getElementById("imageUrl").value,
        title: document.getElementById("taskTitle").value,
        type: document.getElementById("tags").value,
        description: document.getElementById("taskDescription").value,
    }

    if (input.title === "" || input.type === "" || input.description === "")
        return alert("Please enter the required fields");

    taskContents.insertAdjacentHTML("beforeend", htmlTaskContents({ ...input, id }));
    state.taskList.push({ ...input, id });
    updateLocalStorage();
    clearValues();
}

const openTask = (e) => {
    if (!e) e = window.event;

    const getTask = state.taskList.find(({ id }) => id === e.target.id);
    taskModal.innerHTML = htmlModalContents(getTask);
}

const deleteTask = (e) => {
    if (!e) e = window.event;

    const targetId = e.target.getAttribute("name");
    const type = e.target.tagName;

    state.taskList = state.taskList.filter(({ id }) => id !== targetId);
    updateLocalStorage();

    if (type === "BUTTON") {
        return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode);
    }
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode.parentNode);
}

const editTask = (e) => {
    if (!e) e = window.event;

    const targetId = e.target.id;
    const type = e.target.tagName;

    let parentNode;
    let taskTitle;
    let taskDescription;
    let taskType;
    let submitButton;

    if (type === "BUTTON") {
        parentNode = e.target.parentNode.parentNode;
    }
    else {
        parentNode = e.target.parentNode.parentNode.parentNode;
    }

    taskTitle = parentNode.childNodes[3].childNodes[3];
    taskDescription = parentNode.childNodes[3].childNodes[5];
    taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
    submitButton = parentNode.childNodes[5].childNodes[1];

    taskTitle.setAttribute("contenteditable", "true");
    taskDescription.setAttribute("contenteditable", "true");
    taskType.setAttribute("contenteditable", "true");

    submitButton.setAttribute("onclick", "saveEdit()");
    submitButton.removeAttribute("data-bs-toggle");
    //submitButton.removeAttribute("data-bs-target");
    submitButton.innerText = "Save Changes";
}

const saveEdit = (e) => {
    if (!e) e = window.event;

    const targetId = e.target.id;
    const parentNode = e.target.parentNode.parentNode;

    const taskTitle = parentNode.childNodes[3].childNodes[3];
    const taskDescription = parentNode.childNodes[3].childNodes[5];
    const taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];

    const updateData = {
        taskTitle: taskTitle.innerText,
        taskDescription: taskDescription.innerText,
        taskType: taskType.innerText
    }
    // let copyState = state.taskList;

    state.taskList = state.taskList.map((task) => task.id == targetId ? {
        id: task.id,
        title: updateData.taskTitle,
        description: updateData.taskDescription,
        type: updateData.taskType,
        url: task.url
    }
        : task
    );
    updateLocalStorage();

    taskTitle.setAttribute("contenteditable", "false");
    taskDescription.setAttribute("contenteditable", "false");
    taskType.setAttribute("contenteditable", "false");

    e.target.setAttribute("onclick", "openTask()");
    e.target.setAttribute("data-bs-toggle", "modal");
    e.target.innerText = "Open Task";
}

const searchTask = (e) => {
    if (!e) e = window.event;

    while (taskContents.firstChild) {
        taskContents.removeChild(taskContents.firstChild);
    }
    const resultData = state.taskList.filter(({ title }) =>
        title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    resultData.map((cardData) => {
        taskContents.insertAdjacentHTML("beforeend", htmlTaskContents(cardData))
    });
}