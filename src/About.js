import { Grid, Typography, Tooltip, Avatar } from "@mui/material";
import { makeStyles } from 'tss-react/mui';
import data from '../data.json'
import simpleIcons from 'simple-icons'
import Image from 'next/image'
import { iconify } from "./util";
import Cancel from "@mui/icons-material/Cancel";
const { about } = data

const dpx = about.social.length*10 - 2

const socialDetails = about.social.map(({ alt, icon, link }) => {
    const ic = simpleIcons.get(iconify(icon)) || {
        hex: '424242',
        component: <Cancel color="white" fontSize={36}/>
    }
    return {
        alt,
        backgroundColor: '#' + ic.hex,
        icon: ic.component || <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" xmlnsXlink="http://www.w3.org/1999/xlink">
            <title>{icon}</title>
            <path d={ic.path} fill="white"/>
        </svg>,
        link
    }
})

let iobj = {}
socialDetails.forEach(({ alt, backgroundColor }) => {
    iobj[alt] = { backgroundColor }
})

const useStyles = makeStyles()((theme) => {
    return {
        cont: {
            minHeight: `60vh`
        },
        avatar: {
            height: theme.spacing(8),
            width: theme.spacing(8),
            padding: theme.spacing(2)
        },
        dp: {
            height: theme.spacing(Math.max(dpx, 28)),
            width: theme.spacing(Math.max(dpx, 28))
        },
        ...iobj
    }
});

export default function About() {
    const { classes } = useStyles()

    return(
        <Grid direction="row" container justifyContent="center" alignItems="center" className={classes.cont}>
            <Grid item xs={12} lg={8}>
                <Typography variant="h2" gutterBottom component="p">
                    About me
                </Typography>
                <Typography variant="h5" gutterBottom component="p">
                    {about.description}
                </Typography>                
            </Grid>
            <Grid container direction="column" item xs={12} lg={4} spacing={1} justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <Avatar variant="rounded" className={classes.dp}>
                        <Image
                            alt="Display Picture"
                            src={about.picture}
                            fill
                        />
                    </Avatar>
                </Grid>
                <Grid container item xs={12} spacing={2} justifyContent="center">
                {
                    socialDetails.map(({ alt, icon, link }, i) =>
                        <Grid item key={i}>
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                <Tooltip title={alt} placement="top">
                                    <Avatar variant="rounded" className={cx(classes.avatar, classes[alt])}>
                                        {icon}
                                    </Avatar>
                                </Tooltip>
                            </a> 
                        </Grid>
                    )
                }
                </Grid>                
            </Grid>
        </Grid>
    )
}