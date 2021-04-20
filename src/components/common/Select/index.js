import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({

}));

const SelectBox = ({
  label,
  id,
  list,
  isDisable,
}) => {
  const classes = useStyles();
  const [age, setBox] = React.useState('');

  const handleChange = (event) => {
    setBox(event.target.value);
  };

  return (
    <div>
      <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id={id}
          value={age}
          onChange={handleChange}
          label="Box"
          disabled = {isDisable}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {list.map((item, i) => (
            <MenuItem key={i} value={item.value}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectBox;