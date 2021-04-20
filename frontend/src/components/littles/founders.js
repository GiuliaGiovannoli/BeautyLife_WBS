import React from 'react';

import './little-styles.css'
import Giulia from '../../img/giulia.png'
import Mustafa from '../../img/mustafa.png'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


export default function Founders() {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <>
    <h2 className="three"> Founders </h2>
    <div className="founders">

    <Card className={classes.root} style={{ marginTop: '3%', cursor: 'default', backgroundColor: '#f8f1f1', borderRadius: '5%', boxShadow: '0px 0px 0px 0px' }}>
      <CardHeader
        title="Ramy"
        subheader="Full stack Web Developer"
        style={{ color: '#2b4f60' }}
      />
      <CardMedia
        className={classes.media}
        image={`https://s.gravatar.com/avatar/4957d143c31b790662bd9bce967e58f9?s=300&r=pg&d=mm`}
        title=""
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Story: 
          Recently completed a web development bootcamp, specialized in JavaScript, React and Node 
          and have realized web applications projects. Also, applied Redux, Express and Database (SQL and MongoDB) across projects.
          Take a look at my work or get in touch!
          <br></br>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton target="blank" href="https://www.linkedin.com/in/ramy-obeid-005748204/">
          <LinkedInIcon />
        </IconButton>
        <IconButton target="blank" href="https://github.com/obeid-codec">
          <GitHubIcon />
        </IconButton>
      </CardActions>
    </Card>

    <Card className={classes.root} style={{ marginTop: '3%', cursor: 'default', backgroundColor: '#f8f1f1', borderRadius: '5%', boxShadow: '0px 0px 0px 0px' }}>
      <CardHeader
        title="Giulia"
        subheader="Full stack Web Developer"
        style={{ color: '#2b4f60' }}
      />
      <CardMedia
        className={classes.media}
        image={Giulia}
        title=""
        style={{ width: '300px', marginLeft: '5%' }}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Story: 
          <br></br>
          Recently completed a web development bootcamp, specialized in JavaScript, React and Node 
          and have realized web applications projects. Also, applied Redux, Express and Database (SQL and MongoDB) across projects.
          Take a look at my work or get in touch!
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton target="blank" href="https://www.linkedin.com/in/giulia-giovannoli">
          <LinkedInIcon />
        </IconButton>
        <IconButton target="blank" href="https://github.com/GiuliaGiovannoli">
          <GitHubIcon />
        </IconButton>
      </CardActions>
    </Card>

    <Card className={classes.root} style={{ marginTop: '3%', cursor: 'default', backgroundColor: '#f8f1f1', borderRadius: '5%', boxShadow: '0px 0px 0px 0px' }}>
      <CardHeader
        title="Mustafa"
        subheader="Full stack Web Developer"
        style={{ color: '#2b4f60' }}
      />
      <CardMedia
        className={classes.media}
        image={Mustafa}
        title=""
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Story:
          <br></br>
          Electronics brought me to programming and I wanted to deepen my knowledge,
          so I got hold of specialist literature and read it in.
          My step to the Web and App Development Bootcamp deepened my knowledge.
          HTML, CSS and Javascript as well as REACT, Node, SQL and Mongo are my new tools now.
          Coding is fun.
          Send me a message
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton target="blank" href="https://www.linkedin.com/in/mustafa-can1971">
          <LinkedInIcon />
        </IconButton>
        <IconButton target="blank" href="https://github.com/grandmalovesyou">
          <GitHubIcon />
        </IconButton>
      </CardActions>
    </Card>
    </div>
    </>
  );
}
