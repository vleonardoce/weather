import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './header.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
}));

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Container>
          <Typography variant="h2" className={classes.title}>
            Weather
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
