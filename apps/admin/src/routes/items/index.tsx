import { useState, useEffect } from 'react'
import Fab from '@mui/material/Fab';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useCookies } from 'react-cookie';
import { fetchCollections } from '../../services';
import { ICollection } from '../../interfaces';
import AdminLayout from '../../layouts/AdminLayout';
import CollectionsTable from '../../components/CollectionsTable';
import NoDatFound from '../../components/NoDataFound';

export const Route = createFileRoute('/items/')({
  component: ItemDataList
})

function ItemDataList() {
    const navigate = useNavigate();
    const [cookies] = useCookies(["efficacy_token"]);
    const [collectionName, setCollectionName] = useState<string>('');
    const [collections, setCollections] = useState<ICollection[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
  
    useEffect(() => {
      fetchCollections(cookies.efficacy_token).then((data) => setCollections(data.result));
    }, [cookies.efficacy_token]);
  
    const handleListItemClick = (
      collectionId: string,
      index: number,
    ) => {
      setCollectionName(collectionId);
      setSelectedIndex(index);
    };
  
    const navigateTo = () => {
      const to = `/items/${collectionName}/create`;
      navigate({ from: '/items', to: to });
    };
  
    return (
      <AdminLayout>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box sx={{ width: "240px" }}>
            <List component="nav" aria-label="list of collections" sx={{ backgroundColor: "#151527", height: '94vh' }}>
              {collections.map((app: ICollection, index) => (
                <ListItemButton
                  key={app.collectionId}
                  selected={selectedIndex === index}
                  onClick={() => handleListItemClick(app.collectionId, index)}
                >
                  <ListItemText primary={app.displayName} />
                </ListItemButton>
              ))}
            </List>
          </Box>
          {collectionName.length > 0 ?
            (
              <Box sx={{ p: 1, width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                  <Fab color="primary" aria-label="add" sx={{ m: 1 }}>
                    <FilterListRoundedIcon />
                  </Fab>
                  <Fab color="primary" aria-label="add" sx={{ m: 1 }} onClick={navigateTo}>
                    <AddRoundedIcon />
                  </Fab>
                </Box>
                <CollectionsTable collectionName={collectionName} />
              </Box>
            ) : <NoDatFound message={"Please select a collection"} />}
        </Box>
      </AdminLayout >
    )
  }