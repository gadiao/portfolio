import { useState } from 'react';
import { Box, Card, CardActionArea, CardActions, CardContent, Chip, Dialog, DialogContent, Fade, Grid, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from 'tss-react/mui';
import { useTheme } from "@mui/material/styles";
import Image from 'next/image'
import data from '../data.json'
import { useRef } from "react";
import useAnimate from "./useAnimate";
const { projects } = data

const useStyles = makeStyles()((theme) => {
    return {
        cont: {
            minHeight: `100vh`,
        },
        card: {
            height: '100%'
        },
        cardHeader: {
            paddingTop: 0
        },
        cardActionArea: {
            height: '100%',
        },
        expObj: {
            marginBottom: theme.spacing(1)
        }
    }
});

export default function Projects() {
    const { classes } = useStyles();
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('lg'));
    const align = mdDown ? "center" : "flex-end";
    const textAlign = mdDown ? "center" : "right";

    const animRef = useRef(null);
    const animate = useAnimate(animRef)

    const [open, setOpen] = useState(false);
    const [stateSummary, setSummary] = useState('');
    const [statePics, setPics] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Grid direction="row-reverse" container justifyContent="center" alignItems="center" spacing={1} className={classes.cont}>
            <Grid container item xs={12} lg={4} direction="column" alignItems="center">
                <Typography variant="h2" align="center" ref={animRef}>
                    Projects
                </Typography>
                <Fade in={animate} style={{ transitionDelay: '250ms' }}>
                    <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                        <Image
                            alt="Projects"
                            src="/projects.svg"
                            width="400"
                            height="300"
                        />
                    </Box>
                </Fade>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth={true}
                    minWidth={'lg'}
                    closeAfterTransition
                    scroll={'paper'}
                >   
                    <DialogContent>
                        <Typography variant="h6" component="h2">
                            Summary
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            {stateSummary}
                        </Typography>
                        {
                            statePics.map((pic, i) =>
                                <Fade in={animate} style={{ transitionDelay: `${200 * i}ms` }}>
                                    <Image 
                                        src={pic}
                                        width={'400'}
                                        height={'600'}
                                        layout={"responsive"}
                                    />
                                </Fade>
                            )
                        }
                    </DialogContent>
                </Dialog>
            </Grid>
            <Grid container item xs={12} lg={8} direction="column" alignItems={align}>
                {
                    Object.getOwnPropertyNames(projects).map((title, id) =>
                        <Grid item key={id} className={classes.expObj}>
                            <Typography variant="h6" alignItems={textAlign} gutterBottom component="p">
                                {title}
                            </Typography>
                            <Grid container item direction="row" spacing={1} justifyContent="center">
                                {
                                    projects[title].map(({
                                        pname,
                                        info,
                                        summary,
                                        pics,
                                        languages
                                    }, i) =>
                                        <Grid item xs={12} sm key={i}>
                                            <Fade in={animate} style={{ transitionDelay: `${200 * i}ms` }}>
                                                <Card className={classes.card}>
                                                    <CardActionArea
                                                        className={classes.cardActionArea}
                                                        onClick={() => {
                                                            setSummary(summary);
                                                            setPics(pics);
                                                            handleOpen();
                                                        }}
                                                    >
                                                        <CardContent>
                                                            <Typography sx={{ mb: 1.5 }}>
                                                                {pname}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {info}
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions>
                                                            <Grid container direction="row" spacing={0.5}>
                                                                {
                                                                    languages.map((lang, i) =>
                                                                        <Grid item key={i}>
                                                                            <Chip
                                                                                key={i}
                                                                                label={lang}
                                                                                size="small"
                                                                            />
                                                                        </Grid>
                                                                    )
                                                                }
                                                            </Grid>
                                                        </CardActions>
                                                    </CardActionArea>
                                                </Card>
                                            </Fade>
                                        </Grid>
                                    )
                                }
                            </Grid>
                        </Grid>
                    )
                }
            </Grid>
            <div ref={animRef}></div>
        </Grid>
    )
}