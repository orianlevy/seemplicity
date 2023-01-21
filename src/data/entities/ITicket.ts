import IProvider from "./IProvider"

export default interface ITicket {
  title: string
  description: string
  providerId: number
  projectId: number
  issueTypeId: number
}