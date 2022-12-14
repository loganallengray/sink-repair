import { ServiceForm } from "./ServiceForm.js"
import { Requests } from "./Requests.js"
import { Completions } from "./Completions.js"

export const SinkRepair = () => {
    return `
        <h1>Maude and Merle's Sink Repair</h1>
        <section class="serviceForm">
            ${ServiceForm()}
        </section>

        <section class="serviceRequests">
            <h2>Service Requests</h2>
            <article class="requestContainer">
                <div class="exampleItems">
                    <div class="description">Description</div>
                    <div class="reqOptions">Completed by</div>
                </div>
                ${Requests()}
                ${Completions()}
            </article>
        </section>
    `
}