import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import IProject from "./data/entities/IProject";
import IProvider from "./data/entities/IProvider";
import ITicket from "./data/entities/ITicket";

class AppActions {

    private mockProjectIssueTypes() {
        const mock = new MockAdapter(axios);

        mock.onGet("/issueTypesForProject", { params: { project: 1 } }).reply(200, {
            issueTypes: [
                { id: 1, title: "Bug" },
                { id: 2, title: "Story" },
                { id: 3, title: "Task" },
            ],
        });

        mock.onGet("/issueTypesForProject", { params: { project: 2 } }).reply(200, {
            issueTypes: [
                { id: 1, title: "Bug" },
            ],
        });

        mock.onGet("/issueTypesForProject", { params: { project: 3 } }).reply(200, {
            issueTypes: [
                { id: 2, title: "Story" },
            ],
        });

        mock.onGet("/issueTypesForProject", { params: { project: 6 } }).reply(200, {
            issueTypes: [
                { id: 3, title: "Task" },
            ],
        });

        mock.onGet("/issueTypesForProject", { params: { project: 7 } }).reply(200, {
            issueTypes: [
                { id: 1, title: "Bug" },
                { id: 3, title: "Task" },
            ],
        });

        mock.onGet("/issueTypesForProject", { params: { project: 8 } }).reply(200, {
            issueTypes: [
                { id: 2, title: "Story" },
                { id: 1, title: "Bug" },
            ],
        });

        mock.onGet("/issueTypesForProject", { params: { project: 11 } }).reply(200, {
            issueTypes: [
                { id: 3, title: "Bug" },
            ],
        });

        mock.onGet("/issueTypesForProject", { params: { project: 12 } }).reply(200, {
            issueTypes: [
                { id: 3, title: "Task" },
            ],
        });

        mock.onGet("/issueTypesForProject", { params: { project: 13 } }).reply(200, {
            issueTypes: [
                { id: 2, title: "Story" },
                { id: 1, title: "Bug" },
            ],
        });

    }

    private mockProjectsProvidersData() {
        const mock = new MockAdapter(axios);

        mock.onGet("/projectsForProvider", { params: { provider: "Jira" } }).reply(200, {
            projects: [
                { id: 1, title: "Jira 1" },
                { id: 2, title: "Jira 2" },
                { id: 3, title: "Jira 3" },
                { id: 4, title: "Jira 4" },
                { id: 5, title: "Jira 5" },
            ],
        });

        mock.onGet("/projectsForProvider", { params: { provider: "ServiceNow" } }).reply(200, {
            projects: [
                { id: 6, title: "Servicenow 1" },
                { id: 7, title: "Servicenow 2" },
                { id: 8, title: "Servicenow 3" },
                { id: 9, title: "Servicenow 4" },
                { id: 10, title: "Servicenow 5" },
            ],
        });

        mock.onGet("/projectsForProvider", { params: { provider: "Monday" } }).reply(200, {
            projects: [
                { id: 11, title: "Monday 1" },
                { id: 12, title: "Monday 2" },
                { id: 13, title: "Monday 3" },
                { id: 14, title: "Monday 4" },
                { id: 15, title: "Monday 5" },
            ],
        });
    }

    private mockFinding() {
        const mock = new MockAdapter(axios);

        mock.onGet("/findings").reply(200, {
            findings: [
                { id: 1, title: "Ticket 1", description: "Test 1", ticket: null },
                { id: 2, title: "Ticket 2", description: "Test 2", ticket: "Monday-1" },
                { id: 3, title: "Ticket 3", description: "Test 3", ticket: "Monday-2" },
                { id: 4, title: "Ticket 4", description: "Test 4", ticket: "Jira-1" },
                { id: 5, title: "Ticket 5", description: "Test 5", ticket: "Jira-2" },
                { id: 6, title: "Ticket 6", description: "Test 6", ticket: "ServiceNow-1" },
                { id: 7, title: "Ticket 7", description: "Test 7", ticket: null },
            ],
        });
    }

    private mockProviders() {
        const mock = new MockAdapter(axios)
        const providers: IProvider[] = [
            {
                id: 1,
                name: 'Jira',
            },
            {
                id: 2,
                name: 'ServiceNow',
            },
            {
                id: 3,
                name: 'Monday',
            },
        ]

        mock.onGet("/providers").reply(200, {
            providers: providers
        })
    }

    async getProviders() {
        this.mockProviders()
        const response = await axios.get("/providers")
        return response.data.providers
    }

    async getFindings() {
        this.mockFinding()
        const response = await axios.get("/findings")
        return response.data?.findings
    }

    async getProjectsForProvider(provider: IProvider) {
        this.mockProjectsProvidersData()
        const response = await axios.get("/projectsForProvider", { params: { provider: provider.name } })
        return response.data.projects
    }

    async getIssueTypesForProject(project: IProject) {
        this.mockProjectIssueTypes()
        const response = await axios.get("/issueTypesForProject", { params: { project: project.id } })
        return response.data.issueTypes
    }

    async createTicketForFinding(findingId: number, ticket: ITicket) {
        const mock = new MockAdapter(axios)
        const url = `/findings/${findingId}`

        mock.onPost(url, ticket).reply(200, {
            id: Math.floor(Math.random() * (100)) + 1 //Created ticket id
        });

        const response = await axios.post(url, ticket)
        return response.data.id
    }
}


export default new AppActions();