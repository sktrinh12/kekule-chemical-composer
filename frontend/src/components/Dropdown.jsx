import * as React from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import { ThemeProvider } from '@mui/material/styles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

class DropDown extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ButtonGroup
          variant='contained'
          ref={this.props.anchorRef}
          aria-label='split button'
        >
          <ThemeProvider theme={this.props.themeColour}>
            <Button
              size='large'
              aria-controls={this.props.open ? 'split-button-menu' : undefined}
              aria-expanded={this.props.open ? 'true' : undefined}
              aria-label='select merge strategy'
              aria-haspopup='menu'
              onClick={this.props.handleDropDownToggle}
              color='blue'
            >
              {Object.keys(this.props.options)[this.props.selectedIndex]}
              <KeyboardArrowDownIcon />
            </Button>
          </ThemeProvider>
        </ButtonGroup>
        <Popper
          sx={{
            zIndex: 1,
          }}
          open={this.props.open}
          anchorEl={this.props.anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.props.handleDropDownClose}>
                  <MenuList id='split-button-menu' autoFocusItem>
                    {Object.keys(this.props.options).map((option, index) => (
                      <MenuItem
                        key={option}
                        disabled={index === 2}
                        selected={index === this.props.selectedIndex}
                        onClick={(event) =>
                          this.props.handleDropDownClick(event, index)
                        }
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </React.Fragment>
    )
  }
}

export default DropDown
