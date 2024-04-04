import { createFileRoute } from "@tanstack/react-router";
import AdminLayout from "../layouts/AdminLayout";
import { WidthProvider, Responsive } from "react-grid-layout";
import './index.scss'
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useCookies } from "react-cookie";
import { fetchCollectionProperties, fetchCollections } from "../services";
import { Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";

import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import TabletMacRoundedIcon from '@mui/icons-material/TabletMacRounded';
import LaptopWindowsRoundedIcon from '@mui/icons-material/LaptopWindowsRounded';
import DesktopWindowsRoundedIcon from '@mui/icons-material/DesktopWindowsRounded';
import AdminChildLayout from "../layouts/AdminChildLayout";

export const Route = createFileRoute('/edit/$collection/view')({
    component: EditCollectionView
})

function EditCollectionView() {
    const ResponsiveReactGridLayout = WidthProvider(Responsive);
    const [cookies] = useCookies(["efficacy_token"]);
    const { collection } = Route.useParams();
    const [collections, setCollections] = useState<unknown[]>([]);
    const [dragItem, setDragItem] = useState<unknown>(null);
    const [alignment, setAlignment] = useState<string>('sm');

    const [layouts, setLayouts] = useState([]);

    useEffect(() => {
        fetchCollectionProperties(cookies.efficacy_token, collection)
            .then((data) => setCollections(data));
    }, [collection, cookies.efficacy_token]);

    const handleLayoutChange = (layout) => {
        console.log(layout)
        // if (layout.length != layouts.length) {
        //     setLayouts(layout);
        // }
    }

    const onDragStart = (event: React.MouseEvent<HTMLElement>, propertyItem: unknown) => {
        event.dataTransfer.setData("text/plain", "");
        setDragItem(propertyItem);
    }

    const onDrop = (layout, layoutItem, _event) => {
        console.log(layout, dragItem, layouts);
        const updatedLayout = [...layouts];
        updatedLayout.push({
            i: dragItem.id,
            displayName: dragItem.displayName,
            type: dragItem.type,
            w: layoutItem.w,
            h: 3,
            x: layoutItem.x,
            y: layoutItem.y,
            minW: 1,
            maxW: 4,
            minH: 3,
            maxH: 3
        })
        setLayouts(updatedLayout);
        console.log(layouts);
        setDragItem(null);
    };

    const updateItemsList = () => {
        const updatedProperties = collections;
        const index = updatedProperties.findIndex((obj) => obj.id === dragItem.id);
        updatedProperties.splice(index, 1);
        setCollections(updatedProperties);
    }

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        setAlignment(newAlignment);
    };

    return (
        <AdminChildLayout pageGroup="Collections" pageName="Edit View Collection" showDelete={false}>
            <Box sx={{ display: 'flex', flexDirection: 'row', height: '87vh' }}>
                <div className="grid-parent-container">
                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment">
                        <ToggleButton value="xs" aria-label="phone">
                            <PhoneIphoneRoundedIcon />
                        </ToggleButton>
                        <ToggleButton value="sm" aria-label="tablet">
                            <TabletMacRoundedIcon />
                        </ToggleButton>
                        <ToggleButton value="md" aria-label="laptop">
                            <LaptopWindowsRoundedIcon />
                        </ToggleButton>
                        <ToggleButton value="lg" aria-label="desktop">
                            <DesktopWindowsRoundedIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <ResponsiveReactGridLayout
                        className="grid-container"
                        breakpoint={alignment}
                        breakpoints={{ lg: 1200, md: 900, sm: 600, xs: 0 }}
                        cols={{ lg: 12, md: 8, sm: 4, xs: 1 }}
                        rowHeight={30}
                        onDrop={onDrop}
                        isDroppable={true}
                        onLayoutChange={handleLayoutChange}
                    >
                        {
                            layouts.map((l) => (
                                <div key={l.i} data-grid={l} className="grid-container-item">
                                    <span className="text">
                                        <p>{l.displayName}</p>
                                        <p>{l.type}</p>
                                    </span>
                                </div>))
                        }
                    </ResponsiveReactGridLayout>
                </div>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {
                        collections.map((app) => (
                            <div
                                key={app.id}
                                className="droppable-element"
                                draggable={true}
                                unselectable="on"
                                // this is a hack for firefox
                                // Firefox requires some kind of initialization
                                // which we can do by adding this attribute
                                // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
                                onDragStart={(e) => onDragStart(e, app)}>
                                <p>{app.displayName}</p>
                                <p>{app.type}</p>
                            </div>))
                    }
                </Box>
            </Box>
        </AdminChildLayout>
    );
}