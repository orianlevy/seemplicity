import React, { useMemo } from 'react';
import './TicketButtonRenderer.css';
import { ReactComponent as MondayLogo } from '../../assets/logos/small/monday-small.svg';
import { ReactComponent as ServiceNowLogo } from '../../assets/logos/small/servicenow-small.svg';
import { ReactComponent as JiraLogo } from '../../assets/logos/small/jira-small.svg';
import IFinding from '../../data/entities/IFinding';

interface TicketButtonRendererProps {
    data: IFinding
    createTicket(data: IFinding): void
}

const TicketButtonRenderer = (props: TicketButtonRendererProps) => {

    let logo = useMemo(() => {
        if (props.data.ticket) {
            const provider = props.data.ticket.substring(0, props.data.ticket.indexOf("-"));
            switch (provider) {
                case "Monday": return <MondayLogo />
                case "Jira": return <JiraLogo />
                case "ServiceNow": return <ServiceNowLogo />
                default: return null
            }
        }
    }, [props])

    const createTicket = () => {
        props.createTicket(props.data)
    }

    return (
        <div>
            {props.data.ticket ?
                <div className="ticket-logo-text">{logo}<span className="text">{props.data.ticket}</span></div> :
                <button className="create-ticket-button" onClick={() => createTicket()}>Create Ticket</button>
            }
        </div>
    );
};

export default TicketButtonRenderer;