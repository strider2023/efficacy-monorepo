import { camelCaseToHumanReadable } from "@efficacy/ui-utilities";
import { List, ListItem, ListItemText, Grid, Box, Fab } from "@mui/material";
import { useState } from "react";

interface AppData {
    data: unknown
}

function AppDataView({ data }: AppData) {

    const [hideNull, setHideNull] = useState<boolean>(false);

    const renderData = (data: any) => {
        if (!data) {
            if (hideNull) {
                return <></>
            }
            return <p>No data found</p>
        }
        return Object.keys(data).map((key) => {
            if (data[key] === null) {
                if (hideNull) {
                    return <></>
                }
                return (
                    <Grid item xs={12} sm={6} key={key}>
                        <ListItem key={key}>
                            <ListItemText primary={'Null'} secondary={camelCaseToHumanReadable(key)} />
                        </ListItem>
                    </Grid>
                );
            } else if (Array.isArray(data[key])) {
                return (
                    <div key={key}>
                        {camelCaseToHumanReadable(key)}:
                        <List>
                            {
                                data[key].map((item: any, i: number) => (
                                    <ListItem key={i}>
                                        {
                                            typeof item === 'object' ?
                                                <>{renderData(item)}</> :
                                                <ListItemText primary={item} />
                                        }
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div>
                );
            } else if (typeof data[key] === 'object') {
                return (
                    <ListItem key={key}>
                        {renderData(data[key])}
                    </ListItem>
                );
            } else if (typeof data[key] === 'boolean') {
                return (
                    <Grid item xs={12} sm={6} key={key}>
                        <ListItem key={key}>
                            <ListItemText
                                primary={
                                    data[key] ?
                                        <i className="ti ti-square-check menu-item-icon"></i> :
                                        <i className="ti ti-square menu-item-icon"></i>
                                }
                                secondary={camelCaseToHumanReadable(key)} />
                        </ListItem>
                    </Grid>
                );
            } else {
                return (
                    <Grid item xs={12} sm={6} key={key}>
                        <ListItem key={key}>
                            <ListItemText primary={data[key]} secondary={camelCaseToHumanReadable(key)} />
                        </ListItem>
                    </Grid>
                );
            }
        });
    };

    return (
        <Box maxWidth="lg">
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Fab
                    color="primary"
                    aria-label="add"
                    variant="extended"
                    sx={{ m: 1 }}
                    onClick={() => setHideNull(!hideNull)}>
                    {
                        hideNull ?
                            <>
                                <i className="ti ti-mist menu-item-icon"></i>
                                Show Null
                            </>
                            :
                            <>
                                <i className="ti ti-mist-off menu-item-icon"></i>
                                Hide Null
                            </>
                    }
                </Fab>
            </Box>
            <Grid container spacing={2}>
                {renderData(data)}
            </Grid>
        </Box>
    );
}

export default AppDataView