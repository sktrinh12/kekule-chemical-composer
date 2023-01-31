import ComposerAndViewer from './components/ComposerViewer'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import FilledInput from '@mui/material/FilledInput'
import InputLabel from '@mui/material/InputLabel'

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  maxWidth: 800,
  color: theme.palette.text.primary,
}))

const Header = styled('header')(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  marginBottom: theme.spacing,
  backgroundColor: '#282c34',
  justifyContent: 'center',
  fontSize: '2em',
  lineHeight: 2,
  color: '#D8F3FD',
}))

function App() {
  return (
    <>
      <Header>Kinnate Molecule Editor</Header>
      <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
        <StyledPaper
          sx={{
            my: 1,
            mx: 'auto',
            p: 2,
          }}
        >
          <Grid container wrap='nowrap' spacing={2}>
            <Grid item xs={12}>
              <ComposerAndViewer></ComposerAndViewer>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={12} variant='filled'>
                <InputLabel htmlFor='filled-adornment-amount'>
                  SMILES
                </InputLabel>
                <FilledInput id='filled-adornment-amount' />
              </FormControl>
            </Grid>
          </Grid>
        </StyledPaper>
      </Box>
    </>
  )
}

export default App
