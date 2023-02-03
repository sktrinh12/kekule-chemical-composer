import FormControl from '@mui/material/FormControl'
import FilledInput from '@mui/material/FilledInput'
import InputLabel from '@mui/material/InputLabel'

const SMILESForm = ({ handleChangeSmiles, smilesString }) => {
  return (
    <>
      <FormControl fullWidth variant='filled'>
        <InputLabel htmlFor='filled-adornment-amount'>SMILES</InputLabel>
        <FilledInput
          id='filled-adornment-amount'
          onChange={handleChangeSmiles}
          value={smilesString}
        />
      </FormControl>
    </>
  )
}

export default SMILESForm
