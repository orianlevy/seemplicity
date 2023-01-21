import { createContext } from "react"
import IFinding from "../data/entities/IFinding"
import IProject from "../data/entities/IProject"
import IProvider from "../data/entities/IProvider"
import ITicket from "../data/entities/ITicket"

export interface IAppContext {
  findings: IFinding[]
  providers: IProvider[]
  showToast: boolean
  getFindings(): void
  getProviders(): void
  getProviderProjects(provider: IProvider): void
  getProjectIssues(provider: IProvider, project: IProject): void
  createTicket(finding: IFinding, ticket: ITicket, providerName: string): void
}

const AppContext = createContext<IAppContext>({
  findings: [],
  providers: [],
  showToast: false,
  getFindings: () => { },
  getProviders: () => { },
  getProviderProjects: () => { },
  getProjectIssues: () => { },
  createTicket: () => { },
});

export default AppContext