import {Button} from 'react-bootstrap'

export const Item = (props) =>{
    const {name,note,status} = props
    return(
        <tr>
            <td>{name}</td>
            <td>{note}</td>
            <td><Button>{status}</Button></td>
            <td><input type="checkbox" /></td>
        </tr>
    )
}