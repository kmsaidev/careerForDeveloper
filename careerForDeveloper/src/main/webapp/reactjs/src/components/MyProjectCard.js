import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import {Card, Chip, Typography} from "@mui/material";
import CardContent from "@material-ui/core/CardContent";
import React from "react";

function MyProjectCard(props) {
    const {category, project} = props;
    const colors = [
        'primary', 'secondary', 'error', 'info', 'success'
    ];

    return (
        <>
            <Grid item xs={12} sm={6} md={3}>
                <Link href={`/projects/${project.projectId}`} underline="none" color="inherit">
                    <Card sx={{ boxShadow: 2, borderRadius:'16px', position: 'relative' }}>
                        <CardContent sx={{p: 3}}>
                            <Typography gutterBottom variant="h6" component="div">
                                {project.title}
                            </Typography>
                            <Chip size="small" color={colors[project.categoryId]} label={category.find(v => v.value === project.categoryId).label}  sx={{mb:1}}/>
                        </CardContent>
                    </Card>
                </Link>
            </Grid>
        </>
    );
}

export default MyProjectCard