import { deleteCompletion, getCompletions, getPlumbers, getRequests } from "./dataAccess.js"

const convertCompletionToListElement = (comp) => {
    const requests = getRequests();
    const plumbers = getPlumbers();
    const compRequest = requests.find(request => request.id === comp.requestId);
    const compPlumber = plumbers.find(plumber => plumber.id === comp.plumberId);

    return `
    <li class="completionListItem">
        <div class="description">${compRequest.description}</div>
        <div class="reqOptions">
            <div class="plumbers comp__plumbers">${compPlumber.name}</div>
            <button class="completion__delete button" id="completion--${comp.id}">
                Revert
            </button>
        </div>
    </li>
`
}

export const Completions = () => {
    const completions = getCompletions();

    let html = `
        <ul id="completionList">
            ${
                completions.map(completion => convertCompletionToListElement(completion)).join("")
            }
        </ul>
    `

    return html;
}

const mainContainer = document.querySelector("#container")

// deletes request from completed list
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("completion--")) {
        const [,completionId] = click.target.id.split("--")
        deleteCompletion(parseInt(completionId))
    }
})