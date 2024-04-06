import { useState, useEffect } from 'react'
import Fab from '@mui/material/Fab';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Autocomplete, Box, Drawer, TextField } from '@mui/material';
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
  const [collectionName, setCollectionName] = useState<string | null>(null);
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [editOpen, setOpen] = useState(false);

  useEffect(() => {
    fetchCollections(cookies.efficacy_token).then((data) => setCollections(data.result));
  }, [cookies.efficacy_token]);

  const navigateTo = () => {
    const to = `/items/${collectionName}/create`;
    navigate({ from: '/items', to: to });
  };

  return (
    <AdminLayout>
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', p: 1 }}>
          <Autocomplete
            onChange={(event: any, newValue: any | null) => {
              setCollectionName(newValue.collectionId);
              console.log(newValue, collectionName);
            }}
            options={collections}
            sx={{ width: 300 }}
            getOptionLabel={(option) => option.displayName}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                {option.displayName}
              </Box>
            )}
            renderInput={(params) => <TextField {...params} label="Collection" />}
          />
          {
            collectionName &&
            <Box sx={{ flexGrow: '1', display: 'flex', justifyContent: 'flex-end' }}>
              <Fab color="primary" aria-label="add" variant="extended" sx={{ m: 1 }} onClick={() => setOpen(true)}>
                <i className="ti ti-adjustments menu-item-icon"></i>
                Filter
              </Fab>
              <Fab color="primary" aria-label="add" size="medium" sx={{ m: 1 }} onClick={navigateTo}>
                <i className="ti ti-plus menu-item-icon"></i>
              </Fab>
            </Box>
          }
        </Box>
        {
          collectionName ?
            <CollectionsTable collectionName={collectionName} />
            : <NoDatFound message={"Please select a collection"} />
        }
        <Drawer
          variant='persistent'
          anchor='right'
          open={editOpen}
          sx={{ backgroundColor: 'transparent' }}>
          <div className="base-drawer-container">
            <Fab size="small" color="primary" aria-label="add" sx={{ margin: 3 }} onClick={() => setOpen(false)}>
              <i className="ti ti-x menu-item-icon"></i>
            </Fab>
            <div className='base-drawer-filter-container'>

            </div>
          </div>
        </Drawer>
      </Box>
    </AdminLayout >
  )
}