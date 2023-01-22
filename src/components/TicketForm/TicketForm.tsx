import React, { useContext, useEffect, useMemo, useState } from 'react';
import Form from "react-bootstrap/Form";
import { ReactComponent as MondayLogo } from '../../assets/logos/full/monday-full.svg';
import { ReactComponent as ServiceNowLogo } from '../../assets/logos/full/servicenow-full.svg';
import { ReactComponent as JiraLogo } from '../../assets/logos/full/jira-full.svg';
import { Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
import './TicketForm.css';
import AppContext from '../../store/AppContext';
import IProject from '../../data/entities/IProject';
import IIssueType from '../../data/entities/IIssueType';
import IProvider from '../../data/entities/IProvider';
import IFinding from '../../data/entities/IFinding';

export interface CreateTicketFormValues {
    title: string
    description: string
    provider: IProvider
    valid: boolean
    issueType: IIssueType
    project: IProject
}

export interface TicketFormProps {
    finding: IFinding
    onFormValuesChanged(values: CreateTicketFormValues): void
}

const TicketForm = (props: TicketFormProps) => {
    const {
        providers,
        getProviderProjects,
        getProjectIssues,
    } = useContext(AppContext);
    const [selectedProvider, setSelectedProvider] = useState<IProvider | undefined>();
    const [selectedProject, setSelectedProject] = useState<IProject | undefined>(undefined);
    const [selectedIssueType, setSelectedIssueType] = useState<IIssueType | undefined>(undefined);
    const [title, setTitle] = useState(props.finding.title);
    const [description, setDescription] = useState(props.finding.description);


    useEffect(() => {
        const valid =
            !!selectedProvider &&
            !!selectedProject &&
            !!selectedIssueType &&
            title.length > 0 &&
            description.length > 0

        if (selectedProvider && selectedProject && selectedIssueType) {
            props.onFormValuesChanged({
                title,
                description,
                provider: selectedProvider,
                project: selectedProject,
                issueType: selectedIssueType,
                valid
            })
        }
    }, [selectedProject, selectedIssueType, selectedProvider, description, title]);

    const showTitleAndDescription = useMemo(() => {
        return selectedProject && selectedIssueType
    }, [selectedProject, selectedIssueType])

    const resetInput = () => {
        setTitle(props.finding.title);
        setDescription(props.finding.description);
    }
    const handleProviderChange = (e: any) => {
        const providerId = e.target.value
        const provider = providers.find((item: IProvider) => item.id == providerId)
        if (provider) {
            if (provider.projects === undefined) {
                getProviderProjects(provider)
            }
            setSelectedProvider(provider)
            setSelectedProject(undefined);
            setSelectedIssueType(undefined);
            resetInput();
        }
    }

    const handleProjectChange = (projectId: any) => {
        const project = selectedProvider?.projects?.find((item: IProject) => item.id == projectId)
        if (selectedProvider && project) {
            if (project?.issueTypes === undefined) {
                getProjectIssues(selectedProvider, project)
            }
        }
        setSelectedProject(project);
        setSelectedIssueType(undefined);
        resetInput();
    }

    const handleIssueChange = (typeId: any) => {
        const type = selectedProject?.issueTypes.find((item: IIssueType) => item.id == typeId)
        if (type) {
            setSelectedIssueType(type);
            resetInput();
        }
    }

    const handleTitleChange = (e: any) =>
        setTitle(e.target.value);

    const handleDescriptionChange = (e: any) =>
        setDescription(e.target.value);

    const getProviderIcon = (provider: IProvider) => {
        switch (provider.id) {
            case 1: return <JiraLogo />
            case 2: return <ServiceNowLogo />
            case 3: return <MondayLogo />
            default: return null
        }
    }

    return (
        <>
            <Form.Group >
                {
                    providers.map((item: IProvider) => (
                        <Form.Check
                            key={`key-${item.id}`}
                            inline
                            type="radio"
                            name="providers"
                            id={`default-radio`}
                            label={getProviderIcon(item)}
                            onChange={handleProviderChange}
                            value={item.id}
                        />
                    ))
                }
            </Form.Group>
            {selectedProvider && (
                <Form.Group className="mb-3 main-form-section" controlId="main-form-section">
                    <Form.Group className="mb-3" controlId="form-project-and-issue">
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="form-dropdown-project">
                                    <Form.Label>Project</Form.Label>
                                    <DropdownButton
                                        id="dropdown-projects-button"
                                        title={selectedProject?.title ?? 'Select Project'}
                                        onSelect={handleProjectChange}
                                    >
                                        {selectedProvider?.projects?.map((project: any) => (
                                            <Dropdown.Item
                                                key={project.id}
                                                eventKey={project.id}
                                            >
                                                {project.title}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="form-dropdown-issue">
                                    <Form.Label>Issue Type</Form.Label>
                                    <DropdownButton
                                        id="dropdown-issue-button"
                                        title={selectedIssueType?.title ?? 'Select Issue Type'}
                                        onSelect={handleIssueChange}
                                    >
                                        {selectedProject?.issueTypes?.map((issueType: IIssueType) => (
                                            <Dropdown.Item
                                                key={issueType.id}
                                                eventKey={issueType.id}
                                            >
                                                {issueType.title}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form.Group>
                    {
                        showTitleAndDescription &&
                        <Form.Group className="mb-3" controlId="form-title-and-description">
                            <Form.Group className="mb-3" controlId="form-title">
                                <hr className="solid" />
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    placeholder="Write a title"
                                    aria-label="title"
                                    aria-describedby="title"
                                    defaultValue={title}
                                    onChange={handleTitleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="form-description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    placeholder="Describe the ticket"
                                    as="textarea"
                                    rows={3}
                                    defaultValue={description}
                                    onChange={handleDescriptionChange}
                                />
                            </Form.Group>
                        </Form.Group>
                    }
                </Form.Group>
            )}
        </>
    );
};

export default TicketForm;