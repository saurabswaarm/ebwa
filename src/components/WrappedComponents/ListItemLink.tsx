import React, {useMemo} from 'react';
import {Link as RouterLink, LinkProps} from 'react-router-dom';
import {ListItem, ListItemText} from '@material-ui/core';
import { LocationDescriptor, Location } from "history";

type To = LocationDescriptor<string>
| ((location: Location<string>) => LocationDescriptor<string>);

function ListItemLink(props: {
    primary: string;
    to: To;
    onClick?: React.MouseEventHandler<HTMLDivElement>
  }) {
    let { primary, to, onClick } = props;
    
    const CustomLink = useMemo(() => {
      return React.forwardRef<any, Omit<LinkProps, "to">>((props, ref) => {
        return <RouterLink ref={ref} to={to} {...props} />;
      });
    }, []);
    
  
    return (
      <ListItem component={CustomLink}>
        <ListItemText primary={primary} onClick={onClick}/> 
      </ListItem>
    );
  }

  export default ListItemLink;