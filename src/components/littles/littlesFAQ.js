import React from 'react';
import { Link } from "react-router-dom"

import './little-styles.css'
import questions from '../../questions.json'

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));


export default function FAQ() {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (

    <>
    <div id="questions">
    <h3>Frequently asked Questions and Help Section</h3>
    <br></br>
    <div className="subtitle">
    <div className="two">
    <Link to="/BeautyLife_WBS/beauty/life/company/help/contact/info/story/us/three/founders" id="linkStyle">
    <p>Check here our Story section </p>
    <p>Go</p>
    </Link>
    </div>
    <div className="two">
    <p>For any urgent problems please contact our customer service through our email: beautylife-help@beautylife.com</p>
    </div>
    </div>
    <br></br>

    { questions.map((one) => {
      return (
        <div className={classes.root}>
      <Accordion expanded={expanded === `panel${one.id}`} onChange={handleChange(`panel${one.id}`)} id="one">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>{one.id}.  {one.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {one.answer}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
      )
    })}
    </div>
    </>
    
  );
}
