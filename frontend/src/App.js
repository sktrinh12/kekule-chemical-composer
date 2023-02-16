import React from 'react'
import ComposerAndViewer from './components/ComposerViewer'
import { createTheme, styled, ThemeProvider } from '@mui/material/styles'
// import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import SMILESForm from './components/SMILESForm'
// import DropDown from './components/Dropdown'
import Button from '@mui/material/Button'
import axios from 'axios'
import XMLParser from 'react-xml-parser'
import ReactLoading from 'react-loading'
import Modal from '@mui/material/Modal'
import QSARTable from './components/QSARTable.js'
import { colour } from './Colour.js'
import { xmlDataSTAND } from './mockdataCALCPROPS.js'
import { xmlDataQSAR } from './mockdataQSAR.js'

const calcPropsURL = 'http://localhost:5500'
const options = {
  'Standalone Calc Props': 'STANDALONE_CALCULATED_PROPERTIES_TABLE',
  'Standalone QSAR': 'STANDALONE_QSAR',
}

const themeColour = createTheme({
  palette: {
    blue: {
      main: colour,
      contrastText: '#fff',
    },
  },
})

const StyledModal = styled(Modal)({
  backgroundColor: 'transparent',
  top: '50%',
  left: '50%',
  width: '500px',
  height: 'auto',
  marginLeft: '-250px',
  marginTop: '-150px',
  p: 4,
})

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 1600,
  color: theme.palette.text.primary,
}))

// const Header = styled('header')(({ theme }) => ({
//   padding: theme.spacing(4),
//   display: 'flex',
//   marginBottom: theme.spacing(1),
//   backgroundColor: colour,
//   justifyContent: 'center',
//   fontSize: '4em',
//   lineHeight: 2,
//   color: '#D8F3FD',
//   fontFamily:
//     '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
// }))

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      smilesString: '',
      tierData: [],
      calcData: [],
      loading: false,
      showTable: false,
      open: false,
      selectedIndex: 0,
      // endpoint: '',
      insertSmiles: false,
      error: null,
    }

    this.source = axios.CancelToken.source()
    this.composer = React.createRef()
    this.anchorRef = React.createRef(null)
    this.handleChangeSmiles = this.handleChangeSmiles.bind(this)
    this.handleClearSMILES = this.handleClearSMILES.bind(this)
    this.onComposerSMILESClick = this.onComposerSMILESClick.bind(this)
  }
  componentWillUnmount = () => {
    console.log('Component unmounted')
    this.source.cancel('Request canceled by cleanup')
  }
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search)
    this.setState({
      smilesString: urlParams.get('smiles') ?? '',
      // endpoint: urlParams.get('endpoint') ?? options['Standalone Calc Props'],
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.smilesString &&
      this.state.smilesString !== prevState.smilesString //&&
      // this.state.endpoint &&
      // this.state.endpoint !== prevState.endpoint
    ) {
      console.log(this.state.smilesString)
      this.fetchCalcProps()
      this.onComposerSMILESClick()
    }
  }

  handleChangeSmiles = (event) => {
    this.setState({ smilesString: event.target.value, insertSmiles: true })
  }

  onComposerSMILESClick = () => {
    this.composer.current.onComposerSMILESClick()
  }
  handleClearSMILES = () => {
    this.setState({ smilesString: '' })
    this.composer.current.onComposerClearChemObj()
  }
  handleUpdateSMILES = (smiles) => {
    // console.log(`calling from Update SMILES: ${smiles}`)
    this.setState({ smilesString: smiles })
  }
  fetchCalcProps = async () => {
    this.setState({ loading: true })
    try {
      // TIER
      const urlTier = `${calcPropsURL}?smiles=${encodeURIComponent(
        this.state.smilesString
      )}&endpoint=${options['Standalone QSAR']}`
      console.log(urlTier)
      // const tierResponse = await axios.get(urlTier, {
      //   method: 'GET',
      //   cancelToken: this.source.token,
      // })
      let tData = xmlDataQSAR
      // let tData = await tierResponse.data
      tData = new XMLParser().parseFromString(tData)

      // CALC PROPS
      const urlCalc = `${calcPropsURL}?smiles=${encodeURIComponent(
        this.state.smilesString
      )}&endpoint=${options['Standalone Calc Props']}`
      console.log(urlCalc)
      // const calcResponse = await axios.get(urlCalc, {
      //   method: 'GET',
      //   cancelToken: this.source.token,
      // })
      // let cData = await calcResponse.data
      // cData = new XMLParser().parseFromString(cData)

      let cData = xmlDataSTAND
      cData = new XMLParser().parseFromString(cData)
      // console.log(tData.children)
      // console.log(cData.children)
      this.setState({
        tierData: tData.children,
        calcData: cData.children,
        loading: false,
        showTable: true,
      })
    } catch (error) {
      if (!axios.isCancel(error)) {
        this.setState({ error: error, loading: false })
        console.error(error)
      }
    }
  }

  // handleDropDownClick = (event, index) => {
  //   console.info(`You clicked ${Object.keys(options)[index]}`)
  //   this.setState({
  //     open: false,
  //     selectedIndex: index,
  //     endpoint: options[Object.keys(options)[index]],
  //   })
  // }

  // handleDropDownToggle = () => {
  //   this.setState({ open: !this.state.open })
  // }

  // handleDropDownClose = (event) => {
  //   if (
  //     this.anchorRef.current &&
  //     this.anchorRef.current.contains(event.target)
  //   ) {
  //     return
  //   }
  //   this.setState({ open: false })
  // }

  render() {
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>
    } else {
      return (
        <>
          {/*<Header>Kinnate Pipeline Pilot Chemical Property Analyser</Header>*/}
          <StyledPaper
            sx={{
              my: 1,
              mx: 'auto',
              p: 2,
            }}
          >
            <Grid container wrap='nowrap' spacing={1} justifyContent='center'>
              <Grid item xs={6}>
                <ComposerAndViewer
                  ref={this.composer}
                  smilesString={this.state.smilesString}
                  fetchCalcProps={this.fetchCalcProps}
                  handleUpdateSMILES={this.handleUpdateSMILES}
                  insertSmiles={this.state.insertSmiles}
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
              <Grid item xs={4}>
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
              {/*             <Grid item xs={6}>
               <Box
                  display='flex'
                  justifyContent='flex-end'
                  alignItems='flex-end'
                >
                  <DropDown
                      handleDropDownClick={this.handleDropDownClick}
                      handleDropDownClose={this.handleDropDownClose}
                      handleDropDownToggle={this.handleDropDownToggle}
                      open={this.state.open}
                      options={options}
                      anchorRef={this.anchorRef}
                      selectedIndex={this.state.selectedIndex}
                      themeColour={themeColour}
                  />
                </Box>

             </Grid>
  */}{' '}
            </Grid>
          </StyledPaper>
          {this.state.loading ? (
            <StyledModal open={true}>
              <>
                <ReactLoading
                  type='spin'
                  color={colour}
                  height={'auto'}
                  width={'100%'}
                />
              </>
            </StyledModal>
          ) : (
            this.state.showTable && (
              <>
                <StyledPaper
                  sx={{
                    my: 2,
                    mx: 'auto',
                    p: 2,
                  }}
                >
                  <Grid container>
                    <Grid item xs={12}>
                      <QSARTable
                        tierData={this.state.tierData}
                        calcData={this.state.calcData}
                      />
                    </Grid>
                  </Grid>
                </StyledPaper>
              </>
            )
          )}
        </>
      )
    }
  }
}

export default App
