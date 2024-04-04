import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from "@mui/material/AccordionDetails";
import { fetchCollection } from "../services";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from '@mui/icons-material/Info';
import Button from "@mui/material/Button";

function CollectionMetadata({ collectionId }) {

    const [metadata, setCollectionMetadata] = useState();

    useEffect(() => {
        fetchCollection(collectionId).then((data) => setCollectionMetadata(data));
    }, [collectionId]);

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="collection-metadata-content"
                id="collection-metadata">
                Collection Metadata
            </AccordionSummary>
            <AccordionDetails>
                {
                    metadata ? (
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <ListItem>
                                    <ListItemText primary="Collection Id" secondary={metadata.collectionId} />
                                </ListItem>
                            </Grid>
                            <Grid item xs={3}>
                                <ListItem>
                                    <ListItemText primary="Name" secondary={metadata.displayName} />
                                </ListItem>
                            </Grid>
                            <Grid item xs={3}>
                                <ListItem secondaryAction={
                                    <Tooltip title="Database Schema Name">
                                        <IconButton edge="end" aria-label="delete">
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                }>
                                    <ListItemText primary="Schema Name" secondary={metadata.schemaName} />
                                </ListItem>
                            </Grid>
                            <Grid item xs={3}>
                                <ListItem secondaryAction={
                                    <Tooltip title="Database Table Name">
                                        <IconButton edge="end" aria-label="delete">
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                }>
                                    <ListItemText primary="Table Name" secondary={metadata.tableName} />
                                </ListItem>
                            </Grid>
                            <Grid item xs={3}>
                                <ListItem secondaryAction={
                                    <Tooltip title="Roles that have read access apart from Admin">
                                        <IconButton edge="end" aria-label="delete">
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                }>
                                    <ListItemText primary="Read Access" secondary={metadata.readAccessType} />
                                </ListItem>
                            </Grid>
                            <Grid item xs={3}>
                                <ListItem secondaryAction={
                                    <Tooltip title="Roles that have create access apart from Admin">
                                        <IconButton edge="end" aria-label="delete">
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                }>
                                    <ListItemText primary="Create Access" secondary={metadata.createAccessType} />
                                </ListItem>
                            </Grid>
                            <Grid item xs={3}>
                                <ListItem secondaryAction={
                                    <Tooltip title="Roles that have update access apart from Admin">
                                        <IconButton edge="end" aria-label="delete">
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                }>
                                    <ListItemText primary="Update Access" secondary={metadata.updateAccessType} />
                                </ListItem>
                            </Grid>
                            <Grid item xs={3}>
                                <ListItem secondaryAction={
                                    <Tooltip title="Roles that have delete access apart from Admin">
                                        <IconButton edge="end" aria-label="delete">
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                }>
                                    <ListItemText primary="Delete Access" secondary={metadata.deleteAccessType} />
                                </ListItem>
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="outlined" fullWidth color="secondary">
                                    Edit
                                </Button>
                            </Grid>
                        </Grid>) :
                        <p>Loading</p>
                }
            </AccordionDetails>
        </Accordion>
    );
}

export default CollectionMetadata