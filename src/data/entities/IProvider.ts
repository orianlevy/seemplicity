import IProject from "./IProject";

export default interface IProvider {
  id: number
  name: string
  projects?: IProject[]
}