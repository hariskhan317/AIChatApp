import { Link } from "react-router-dom";

type Props = {
    pathName: string,
    name:string
}

// props is the incoming value and Props is the data type
export default function NavigationLink(props: Props) {
  return (
    <>
     <Link to={props.pathName} style={{
        color: 'white',
       fontSize:'18px',
          fontWeight: '600',
          textDecoration: 'none'
        }} >{props.name}</Link>  
    </>
  )
}
