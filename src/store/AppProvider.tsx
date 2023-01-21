import React, { useEffect, useState } from 'react';
import AppActions from '../AppActions';
import IFinding from '../data/entities/IFinding';
import IIssueType from '../data/entities/IIssueType';
import IProject from '../data/entities/IProject';
import IProvider from '../data/entities/IProvider';
import ITicket from '../data/entities/ITicket';
import AppContext from './AppContext';

const AppProvider = ({ children }: any) => {
    const [findings, setFindings] = useState<IFinding[]>([]);
    const [providers, setProviders] = useState<IProvider[]>([])
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (showToast) {
            setTimeout(() => {
                setShowToast(false)
            }, 2000)
        }
    }, [showToast])

    const updateProvider = (provider: IProvider) => {
        const newProviders: IProvider[] = []
        providers.forEach((item: IProvider) => {
            if (item.id === provider.id) {
                newProviders.push(provider)
            } else {
                newProviders.push(item)
            }
        })
        setProviders([...newProviders])
    }

    const updateFinding = (finding: IFinding) => {
        const newFindings: IFinding[] = []
        findings.forEach((item: IFinding) => {
            if (item.id === finding.id) {
                newFindings.push(finding)
            } else {
                newFindings.push(item)
            }
        })
        setFindings([...newFindings])
    }

    return (
        <AppContext.Provider value={{
            findings,
            providers,
            showToast,
            getFindings: () => {
                AppActions.getFindings().then((findings?: IFinding[]) => {
                    if (findings) {
                        setFindings(findings)
                    }
                })
            },
            getProviders: () => {
                AppActions.getProviders().then((providers?: IProvider[]) => {
                    if (providers) {
                        setProviders(providers)
                    }
                })
            },
            getProviderProjects: (provider: IProvider) => {
                AppActions.getProjectsForProvider(provider).then((projects?: IProject[]) => {
                    if (projects) {
                        provider.projects = projects
                        updateProvider(provider)
                    }
                })
            },
            getProjectIssues: (provider: IProvider, project: IProject) => {
                AppActions.getIssueTypesForProject(project).then((types?: IIssueType[]) => {
                    if (types) {
                        project.issueTypes = types
                        updateProvider(provider)
                    }
                })
            },
            createTicket: (finding: IFinding, ticket: ITicket, providerName: string) => {
                AppActions.createTicketForFinding(finding.id, ticket).then((ticketId: number) => {
                    finding.ticket = `${providerName}-${ticketId}`
                    finding.title = ticket.title
                    finding.description = ticket.description
                    updateFinding(finding)
                    setShowToast(true)
                })
            }
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;