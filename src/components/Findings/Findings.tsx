import React, { useContext, useEffect, useRef, useState } from 'react';
import './Findings.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import AppContext from "../../store/AppContext";
import TicketButtonRenderer from "../TicketButtonRenderer/TicketButtonRenderer";
import Ticket from "../Ticket/Ticket";
import { Toast, ToastContainer } from "react-bootstrap";
import IFinding from '../../data/entities/IFinding';

const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
}

const Findings = () => {
    const { findings,
        showToast,
        getFindings,
    } = useContext(AppContext);

    const [selectedFinding, setSelectedFinding] = useState<IFinding | undefined>()

    const columnDefs = useRef([
        { field: 'title', flex: 1 },
        { field: 'description', flex: 3 },
        {
            field: 'ticket', flex: 1, cellRenderer: (props: any) =>
                <TicketButtonRenderer
                    {...props}
                    createTicket={(data: IFinding) => {
                        setSelectedFinding(data)
                    }}
                />
        }
    ]).current;

    useEffect(() => {
        getFindings()
    }, []);

    useEffect(() => {
        if (selectedFinding && showToast) {
            //This condition represent ticket has submitted
            setSelectedFinding(undefined)
        }
    }, [showToast, selectedFinding])

    return (
        <div className="findings-container">
            {
                showToast && <ToastContainer className="p-3" position='top-center'>
                    <Toast>
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">Ticket was created!</strong>
                            <small>1 sec ago</small>
                        </Toast.Header>
                        <Toast.Body>The ticket was created successfully</Toast.Body>
                    </Toast>
                </ToastContainer>
            }
            <span className="findings-title">Findings</span>
            <div className='ag-theme-alpine findings-table' style={{ height: "70%", width: "95%" }}>
                <AgGridReact
                    rowData={findings}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                />
            </div>
            {
                selectedFinding && (
                    <Ticket
                        finding={selectedFinding}
                        close={() => setSelectedFinding(undefined)}
                    />
                )
            }
        </div>
    );
};

export default Findings;