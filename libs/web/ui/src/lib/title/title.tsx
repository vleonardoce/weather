import Typography from '@material-ui/core/Typography';
import './title.scss';

export interface TitleProps {
  text: string;
}

export function Title(props: TitleProps) {
  return (
    <Typography component="h2" variant="h4" color="primary" gutterBottom>
      {props.text}
    </Typography>
  );
}

export default Title;
