import React from 'react'
import ComposerAndViewer from './components/ComposerViewer'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
// import { SMILESProvider } from './SMILESContext'
import SMILESForm from './components/SMILESForm'
import Button from '@mui/material/Button'

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  maxWidth: 1000,
  color: theme.palette.text.primary,
}))

const Header = styled('header')(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  marginBottom: theme.spacing,
  backgroundColor: '#282c34',
  justifyContent: 'center',
  fontSize: '4em',
  lineHeight: 2,
  color: '#D8F3FD',
}))
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      smilesString: '',
    }
    this.composer = React.createRef()
    this.handleChangeSmiles = this.handleChangeSmiles.bind(this)
    this.handleSendSmiles = this.handleSendSmiles.bind(this)
    this.onComposerSMILESClick = this.onComposerSMILESClick.bind(this)
  }
  handleChangeSmiles = (event) => {
    this.setState({ smilesString: event.target.value })
  }
  handleSendSmiles = (event) => {
    console.log(this.state.smilesString)
  }

  onComposerSMILESClick = () => {
    this.composer.current.onComposerSMILESClick()
  }

  render() {
    return (
      <>
        {/*<SMILESProvider value={this.state.smilesString}>*/}
        <Header>Kinnate Molecule Editor</Header>
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
                ></ComposerAndViewer>
                {this.state.smilesString}
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
                <SMILESForm handleChangeSmiles={this.handleChangeSmiles} />
              </Grid>
              <Grid item xs={12}>
                <Button
                  size='large'
                  variant='contained'
                  onClick={this.onComposerSMILESClick}
                >
                  Fetch
                </Button>
              </Grid>
            </Grid>
          </StyledPaper>
        </Box>
        {/*</SMILESProvider>*/}
      </>
    )
  }
}

export default App
