import React from 'react'
import ComposerAndViewer from './components/ComposerViewer'
import { createTheme, styled, ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import SMILESForm from './components/SMILESForm'
import Button from '@mui/material/Button'
import axios from 'axios'
import XMLParser from 'react-xml-parser'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import ReactLoading from 'react-loading'
import Modal from '@mui/material/Modal'

const calcPropsURL = 'http://localhost:5500'
const blueColour = '#3336FF'

const themeColour = createTheme({
  palette: {
    blue: {
      main: blueColour,
      contrastText: '#fff',
    },
  },
})

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  maxWidth: 1000,
  color: theme.palette.text.primary,
}))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: blueColour,
    color: theme.palette.common.white,
    alignItems: 'center',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const Header = styled('header')(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  marginBottom: theme.spacing(1),
  backgroundColor: '#282c34',
  justifyContent: 'center',
  fontSize: '4em',
  lineHeight: 2,
  color: '#D8F3FD',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
}))
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      smilesString: '',
      data: [],
      loading: false,
      showTable: false,
    }
    this.composer = React.createRef()
    this.handleChangeSmiles = this.handleChangeSmiles.bind(this)
    this.handleClearSMILES = this.handleClearSMILES.bind(this)
    this.onComposerSMILESClick = this.onComposerSMILESClick.bind(this)
  }
  handleChangeSmiles = (event) => {
    this.setState({ smilesString: event.target.value })
  }

  onComposerSMILESClick = () => {
    this.composer.current.onComposerSMILESClick()
  }
  handleClearSMILES = () => {
    this.setState({ smilesString: '' })
  }

  fetchCalcProps = async (smilesString) => {
    const url = `${calcPropsURL}?smiles=${smilesString}`
    this.setState({ loading: true })
    try {
      const response = await axios.get(url, {
        method: 'GET',
      })
      let data = await response.data
      data = new XMLParser().parseFromString(data)
      console.log(data.children)
      this.setState({ data: data.children, loading: false, showTable: true })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <>
        <Header>Kinnate Pipeline Pilot Chemical Property Analyser</Header>
        <Box sx={{ flexGrow: 1 }}>
          <StyledPaper
            sx={{
              my: 1,
              mx: 'auto',
              p: 2,
            }}
          >
            <Grid container wrap='nowrap' spacing={2}>
              <Grid item xs={12}>
                <ComposerAndViewer
                  ref={this.composer}
                  smilesString={this.state.smilesString}
                  fetchCalcProps={this.fetchCalcProps}
                ></ComposerAndViewer>
              </Grid>
            </Grid>
          </StyledPaper>
          <StyledPaper
            sx={{
              my: 1,
              mx: 'auto',
              p: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SMILESForm
                  smilesString={this.state.smilesString}
                  handleChangeSmiles={this.handleChangeSmiles}
                />
              </Grid>
              <Grid item xs={2}>
                <ThemeProvider theme={themeColour}>
                  <Button
                    color='blue'
                    size='large'
                    variant='contained'
                    onClick={this.onComposerSMILESClick}
                  >
                    Fetch
                  </Button>
                </ThemeProvider>
              </Grid>
              <Grid item xs={10}>
                <ThemeProvider theme={themeColour}>
                  <Button
                    color='blue'
                    size='large'
                    variant='outlined'
                    onClick={this.handleClearSMILES}
                  >
                    Clear
                  </Button>
                </ThemeProvider>
              </Grid>
            </Grid>
          </StyledPaper>
          {this.state.loading ? (
            <Modal
              open={true}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={modalStyle}>
                <ReactLoading
                  type='spin'
                  color={blueColour}
                  height={'auto'}
                  width={'100%'}
                />
              </Box>
            </Modal>
          ) : (
            this.state.showTable && (
              <>
                <StyledPaper
                  sx={{
                    my: 4,
                    mx: 'auto',
                    p: 2,
                  }}
                >
                  <Grid container>
                    <Grid item xs={12}>
                      <TableContainer component={Paper}>
                        <Table aria-label='Property table'>
                          <TableHead>
                            <TableRow key={'header_row0'}>
                              <StyledTableCell key={'header_smiles'}>
                                SMILES
                              </StyledTableCell>
                              <StyledTableCell key={'header_prop_name'}>
                                PROPERTY NAME
                              </StyledTableCell>
                              <StyledTableCell key={'header_numb_val'}>
                                NUMERIC VALUE
                              </StyledTableCell>
                              <StyledTableCell key={'header_prop_src'}>
                                PROPERTY SOURCE
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {this.state.data.map((r, i) => {
                              return (
                                <>
                                  <TableRow hover key={`row_${i}`}>
                                    <TableCell key={`cell_compound_id_${i}`}>
                                      {r.attributes.COMPOUND_ID}
                                    </TableCell>
                                    <TableCell key={`cell_prop_name_${i}`}>
                                      {r.attributes.PROPERTY_NAME}
                                    </TableCell>
                                    <TableCell key={`cell_num_val_${i}`}>
                                      {r.attributes.NUMERIC_VALUE}
                                    </TableCell>
                                    <TableCell key={`cell_prop_src_${i}`}>
                                      {r.attributes.PROPERTY_SOURCE}
                                    </TableCell>
                                  </TableRow>
                                </>
                              )
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </StyledPaper>
              </>
            )
          )}
        </Box>
      </>
    )
  }
}

export default App
