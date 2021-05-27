import React, {useMemo} from 'react';
import {Link as RouterLink, LinkProps} from 'react-router-dom';
import {Button} from '@material-ui/core';
import { LocationDescriptor, Location } from "history";

type To = LocationDescriptor<string>
| ((location: Location<string>) => LocationDescriptor<string>);


function ButtonLink(props: {
    children: string;
    to: To
    className?:string
  }) {
    let { children, to , className} = props;
  
    let customLink = useMemo(() => {
      return React.forwardRef<any, Omit<LinkProps, "to">>((props, ref) => {
        return <RouterLink ref={ref} to={to} {...props} />;
      });
    }, [to]);
  
    return (
      <Button className={className} component={customLink} variant="contained" color="primary">
        {children}
      </Button>
    );
  }

  export default ButtonLink;