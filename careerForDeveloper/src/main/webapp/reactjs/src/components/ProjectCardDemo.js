import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import Typography from "@mui/material/Typography";
import {CardHeader, Chip} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import {styled} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 320,
        borderRadius: 20,
    },
    content: {
        padding: 15,
    },
}));

export const ProjectCardDemo = React.memo(function ProjectCard(props) {
    
    const shadowStyles = useLightTopShadowStyles();
    const cardStyles = useStyles();
    const { project, category } = props;
    const colors = [
        'primary', 'secondary', 'error', 'info', 'success'
    ];
    return (
        <Grid item xs={12} sm={6} md={3}>
            <Link href={`/projects/${project.projectId}`} underline="none" color="inherit">

            <Card className={cx(cardStyles.root, shadowStyles.root)} sx={{ position: 'relative' }}>
            <CardHeader
                avatar={
                    <Avatar image={"http://localhost:8080/image/" + project.profileImageLoc}>
                    </Avatar>
                }
                title={project.nickname}
                subheader={project.createdAt.substring(0,10)}
            />
            <CardContent sx={{pt: 4}}>
                <Chip size="small" color={colors[project.categoryId]}
                      label={category.find(v => v.value === project.categoryId).label}  sx={{mb:1}}/>
                    <Typography gutterBottom variant="h5" component="div">
                    {project.title}
                </Typography>

            <Typography variant="body2" color="text.secondary">
                    {project.contents}
                </Typography>
                <Box display="flex" justifyContent="flex-end">
                    <Chip label = {"인원 " + project.partMember + "/" + project.limitedMember}
                          variant="outlined">
                    </Chip>
                </Box>

            </CardContent>
        </Card>
            </Link>
        </Grid>
    );
});

export default ProjectCardDemo