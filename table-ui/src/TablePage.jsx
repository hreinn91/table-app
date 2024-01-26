import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import Tableheader from './TableHeader';
import './TablePage.css';
import APIService from './service/BackendApiService';
import { getDateInUTC, mapApiNote } from './NoteUtils';

function AddRowToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleAddNewRow = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, noteText: 'Write some new note....', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'noteText' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleAddNewRow}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}

export default function TablePage() {
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        APIService.getNotes()
            .then(data => {
                setRows(data.map(mapApiNote));
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching notes:", error);
                setIsLoading(false);
            });
    }, []);

    const handleRowEditStop = async (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit, fieldToFocus: 'noteText' } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        const deltedRow = rows.find((row) => row.id === id);
        setRows((oldRows) => oldRows.filter((row) => row.id !== id));
        if(!deltedRow.isNew)
        APIService.deleteNote(id)
            .catch(error => {
                console.error("Error deleting note:", error);
            });
        
    };

    const handleCancelClick = (id) => () => {
        setRows(rows.filter((row) => (row.id != id)));
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const processRowUpdate = async (processedRow) => {
        if (processedRow.isNew) {
            setRows(rows.filter((row) => (row.id !== processedRow.id)));
            var savedRow = await APIService.saveNote(processedRow.noteText);
            savedRow = mapApiNote(savedRow);
            setRows((oldRows) => [...oldRows, savedRow]);
            return savedRow;
        } else {
            const updatedRow = { ...processedRow, isNew: false };
            setRows(rows.map((row) => (row.id === processedRow.id ? updatedRow : row)));
            try {
                var updatedNote = await APIService.updateNote(processedRow.id, processedRow.noteText);
                updatedNote = mapApiNote(updatedNote);
                setRows(rows.map((row) => (row.id === processedRow.id ? updatedNote : row)));
            } catch (error) {
                console.error("Error updating note:", error);
            }
            return updatedRow;
        }
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        {
            field: 'date',
            headerName: 'Date',
            type: 'string',
            width: 180,
            editable: false,
        },
        { field: 'noteText', headerName: 'note', width: 400, editable: true },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            align: 'right',
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <div>
            <Tableheader />
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <Box className="BoxContainer" sx={{ height: 500, width: '100%', /* ... */ }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        editMode="row"
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={handleRowModesModelChange}
                        onRowEditStop={handleRowEditStop}
                        processRowUpdate={processRowUpdate}
                        experimentalFeatures={{ newEditingApi: true }}
                        slots={{
                            toolbar: AddRowToolbar,
                        }}
                        slotProps={{
                            toolbar: { setRows, setRowModesModel },
                        }}
                    />
                </Box>
            )}
        </div>
    );
}

