import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, CircularProgress, Dialog, DialogTitle, IconButton, ImageList, ImageListItem, LinearProgress, Tab, Tabs } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import uploadImg from '../../asset/upload_img.png';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { dataDialog } from './questionUI';
import Axios from 'axios';
import { handleExistingImage } from './functionSheet';

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

interface ImgDialogProps {
    dataDialog: dataDialog;
    setData: Dispatch<SetStateAction<dataDialog>>;
    photoUpload: any;

}
function ImgDialog({
    dataDialog: { open, questions, index, setQuestions },
    setData,
    photoUpload
}: ImgDialogProps) {
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
    const tabTitle: string[] = ['Télécharger', 'Photos'];
    const [progress, setProgress] = useState(0);
    const [buffer, setBuffer] = useState(0);
    const [hideUploadBtn, setHideUploadBtn] = useState(false);
    const [dataImg, setDataImg] = useState<{ img: string, title: string }[]>([]);

    const handleTabIndex = (index: number) => {
        setActiveTabIndex(index)
    }

    const initLoader = () => {
        setProgress(0);
        setBuffer(0);
    }

    if (activeTabIndex === 1 && open) {
        Axios.get(`${process.env.REACT_APP_URL_REMOTE_LINK}/employe/getExamImages`)
            .then((res) => {
                if (res.status === 200 && res.data) setDataImg(res.data);
            })
            .catch((err) => console.log(err));
    }
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
                loading='lazy'
                sx={{ maxWidth: 150 }}
            />
            <Button
                sx={{ display: !hideUploadBtn ? 'inherit' : 'none' }}
                component='label'
                variant='contained'
                disableElevation
                size='small'
                startIcon={<CloudUploadIcon />}
                onClick={initLoader}
            >
                Télécharger
                <VisuallyHiddenInput
                    type="file"
                    onChange={(e) =>
                        photoUpload(
                            index,
                            questions,
                            setQuestions,
                            e,
                            setProgress,
                            setBuffer,
                            setHideUploadBtn,
                            setData,
                        )
                    }
                />
            </Button>
            <Box sx={{
                width: '90%',
                display: hideUploadBtn ? 'block' : 'none',
            }}>
                <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
            </Box>
        </Box>,

        1: dataImg?.length > 0 ? <ImageList cols={5} sx={{ p: 2 }}>
            {dataImg.map((item) => (
                <ImageListItem
                    key={item.img}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleExistingImage(
                        index,
                        questions,
                        setQuestions,
                        setData,
                        item.img,
                    )}
                >
                    <img
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        alt={item.title}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
            : <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            }}
            >
                <CircularProgress size={30} />
            </Box>
    }


    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            sx={{ '.MuiDialog-paper': { height: '500px' } }}
        >
            <DialogTitle
                sx={{ m: 0, p: 2, fontSize: '1rem' }}>
                Inserer image
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => setData(
                    prevData => ({ ...prevData, open: false })
                )
                }
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