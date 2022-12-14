const applicationState = {
    requests: []
}

const mainContainer = document.querySelector("#container")
const API = "http://localhost:8088"

// fetches requests from the json database and put it in applicationstate database
export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

// fetches plumbers
export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}

// fetches completions
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.completions = data
            }
        )
}

// send request to json database
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            // Runs custom event to re-render page
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

// send completed request to json database
export const saveCompletion = (completedRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedRequest)
    }

    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            // Runs custom event to re-render page
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

// delete requests from json database
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

// delete completions from json database
export const deleteCompletion = (id) => {
    return fetch(`${API}/completions/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

// get the requests from applicationstate database
export const getRequests = () => {
    return applicationState.requests.map(request => ({ ...request }));
}

export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({ ...plumber }));
}

export const getCompletions = () => {
    return applicationState.completions.map(completion => ({ ...completion }));
}