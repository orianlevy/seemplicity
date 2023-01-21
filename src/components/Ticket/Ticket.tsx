import React, { useContext, useEffect, useState } from 'react';
import AppContext, { IAppContext } from "../../store/AppContext";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Ticket.css';
import TicketForm, { CreateTicketFormValues } from "../TicketForm/TicketForm";
import Form from "react-bootstrap/Form";
import IFinding from '../../data/entities/IFinding';

interface TicketProps {
    finding: IFinding
    close(): void
}

const Ticket = (props: TicketProps) => {
    const { getProviders, createTicket } = useContext<IAppContext>(AppContext);
    const [formValues, setFormValues] = useState<CreateTicketFormValues | undefined>()
    const [formError, setFormError] = useState<string | undefined>();

    useEffect(() => {
        getProviders()
    }, [])

    useEffect(() => {
        if (formValues?.valid && formError) {
            //Clean error if exists
            setFormError(undefined);
        }
    }, [formValues])

    const handleSubmit = () => {
        if (formValues?.valid) {
            createTicket(props.finding, {
                title: formValues.title,
                description: formValues.description,
                providerId: formValues.provider.id,
                issueTypeId: formValues.issueType.id,
                projectId: formValues.project.id
            }, formValues.provider.name)
        } else {
            setFormError("invalid form values");
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Modal show={true} onHide={props.close}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create a ticket</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TicketForm
                        finding={props.finding}
                        onFormValuesChanged={setFormValues}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <p>{formError}</p>
                    <Button variant="secondary" onClick={props.close} className="create-ticket-modal-buttons">
                        Cancel
                    </Button>
                    <Button variant="primary"
                            onClick={handleSubmit}
                            className="create-ticket-modal-buttons"
                            style={{backgroundColor: formError ? 'red' : '#800ff'}}
                    >
                        Create ticket
                    </Button>
                </Modal.Footer>
            </Modal>
        </Form>
    )
};

export default Ticket;