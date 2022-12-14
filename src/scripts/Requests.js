import { getRequests, deleteRequest, getPlumbers, getCompletions, saveCompletion } from "./dataAccess.js"

const convertRequestToListElement = (req) => {
    const plumbers = getPlumbers();
    const completions = getCompletions();
    const checkCompletion = completions.find(completion => completion.requestId === req.id);

    if (!checkCompletion) {
        return `
        <li class="requestListItem">
            <div class="description">${req.description}</div>
            <div class="reqOptions">
                <select class="plumbers select" id="plumbers">
                    <option value="">Choose</option>
                    ${
                        plumbers.map(
                            plumber => {
                                return `<option value="${req.id}--${plumber.id}">${plumber.name}</option>`
                            }
                        ).join("")
                    }
                </select>
                <button class="button request__delete" id="request--${req.id}">
                    Delete
                </button>
            </div>
        </li>
    `
    }
}

export const Requests = () => {
    const requests = getRequests();

    let html = `
        <ul id="requestList">
            ${
                requests.map(request => convertRequestToListElement(request)).join("")
            }
        </ul>
    `

    return html;
}

const mainContainer = document.querySelector("#container")

// deletes request from the json database when you click on the delete button
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})


mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_created: Date.now()
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion);
        }
    }
)