import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';

const Channel = ({ name, onClick, btncn, tglcn, onRemove, onRename }) => {
  return (
    <Dropdown as={ButtonGroup} className="d-flex w-100">
    <Button variant="" className={btncn} onClick={onClick}>
      <span className="me-1">#</span>{name}
    </Button>

    <Dropdown.Toggle split id="dropdown-split-basic" variant="" className={tglcn}>
      <span className="visually-hidden">Управление каналом</span>
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item href="#/action-1" onClick={onRemove}>Удалить</Dropdown.Item>
      <Dropdown.Item href="#/action-2" onClick={onRename}>Переименовать</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  )
};

export default Channel;