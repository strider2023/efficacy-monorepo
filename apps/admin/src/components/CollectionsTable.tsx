import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@mui/material"
import { ICollectionAttributes } from "../interfaces"
import NoDatFound from "./NoDataFound"
import { useEffect, useState } from "react";
import { fetchItemData } from "../services";
import { useNavigate } from "@tanstack/react-router";

function CollectionsTable({ collectionName }) {
    const navigate = useNavigate();
    const [items, setItems] = useState<unknown>({
        attributes: null,
        result: null
    });
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        if (collectionName.length > 0) {
            fetchItemData(collectionName, limit, offset).then((data) => setItems(data));
        }
    }, [collectionName, limit, offset])

    const handleChangePage = (
        newPage: number,
    ) => {
        setOffset(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setLimit(parseInt(event.target.value, 10));
        setOffset(0);
    };

    const navigateTo = (itemId: string) => {
        navigate({ from: '/items', to: `/items/${collectionName}/update/${itemId}` });
    };

    return (
        <>
            {items.attributes && items.result ?
                (
                    <>
                        <TableContainer>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        {items.attributes.map((collProp: ICollectionAttributes) => (
                                            <TableCell key={collProp.propertyName}>
                                                {collProp.displayName}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.result.map((item: unknown) => (
                                        <TableRow key={item.id} onClick={() => navigateTo(item.id)}>
                                            {items.attributes.map((collProp: ICollectionAttributes) => (
                                                <TableCell key={collProp.propertyName + item.id}>
                                                    {item[collProp.propertyName]}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer><TablePagination
                            component="div"
                            count={items.count[0].count}
                            page={offset}
                            onPageChange={handleChangePage}
                            rowsPerPage={limit}
                            onRowsPerPageChange={handleChangeRowsPerPage} />
                    </>
                ) : <NoDatFound message={"No Collections Data Found"} />}
        </>
    )
}

export default CollectionsTable