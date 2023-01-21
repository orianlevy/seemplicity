import IIssueType from "./IIssueType"

export default interface IProject {
  id: number
  title: string
  issueTypes: IIssueType[]
}