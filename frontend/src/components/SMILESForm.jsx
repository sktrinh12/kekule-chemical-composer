import { Component } from 'react'
import FormControl from '@mui/material/FormControl'
import FilledInput from '@mui/material/FilledInput'
import InputLabel from '@mui/material/InputLabel'

class SMILESForm extends Component {
  render() {
    return (
      <>
        <FormControl fullWidth variant='filled'>
          <InputLabel htmlFor='filled-adornment-amount'>SMILES</InputLabel>
          <FilledInput
            id='filled-adornment-amount'
            onChange={this.props.handleChangeSmiles}
            value={this.props.smilesString}
          />
        </FormControl>
      </>
    )
  }
}

export default SMILESForm
