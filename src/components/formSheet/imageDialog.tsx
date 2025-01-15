import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, DialogTitle, IconButton, ImageList, ImageListItem, Tab, Tabs } from "@mui/material";
import { ReactNode, useState } from "react";
import uploadImg from '../../asset/upload_img.png';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

type TabComponent = Record<number, ReactNode>;
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
function ImgDialog() {
    const [open, setOpen] = useState<boolean>(true);
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
    const tabTitle: string[] = ['Télécharger', 'Photos'];
    const handleTabIndex = (index: number) => {
        setActiveTabIndex(index)
    }
    const itemData = [
        {
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
        },
        {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Burger',
        },
        {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Camera',
        },
        {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            title: 'Coffee',
        },
        {
            img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
            title: 'Hats',
        },
        {
            img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
            title: 'Honey',
        },
        {
            img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
            title: 'Basketball',
        },
        {
            img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
            title: 'Fern',
        },
        {
            img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
            title: 'Mushrooms',
        },
        {
            img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
            title: 'Tomato basil',
        },
        {
            img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
            title: 'Sea star',
        },
        {
            img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
            title: 'Bike',
        },
    ];

    const tabComponent: TabComponent = {
        0: <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            p: '16px 0'
        }}>
            <Box
                component='img'
                src={uploadImg}
                alt='upload image'
                sx={{ maxWidth: 150 }}
            />
            <Button
                component='label'
                variant='contained'
                disableElevation
                size='small'
                startIcon={<CloudUploadIcon />}
            >
                Télécharger
                <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => console.log(event.target.files)}
                />
            </Button>
        </Box>,
        1: <ImageList cols={5} sx={{ p: 2 }}>
            {itemData.map((item) => (
                <ImageListItem key={item.img}>
                    <img
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        alt={item.title}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    }
    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            onClose={() => setOpen(false)}
            sx={{ '.MuiDialog-paper': { height: '500px' } }}
        >
            <DialogTitle
                sx={{ m: 0, p: 2, fontSize: '1rem' }}>
                Inserer image
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => setOpen(false)}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon />
            </IconButton>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={activeTabIndex}
                    onChange={(_, tabIndex) => handleTabIndex(tabIndex)}
                    textColor='primary'
                    indicatorColor="primary"
                >
                    {
                        tabTitle.map((title, index) => (
                            <Tab
                                disableRipple
                                key={index}
                                label={title}
                                sx={{ fontSize: '0.75rem' }}
                            />
                        ))
                    }
                </Tabs>
            </Box>
            {tabComponent[activeTabIndex]}
        </Dialog>
    );

}

export default ImgDialog;