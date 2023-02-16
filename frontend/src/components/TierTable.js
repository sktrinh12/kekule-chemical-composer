import Table from '@mui/material/Table'
import { Component } from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { colour } from '../Colour.js'

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
    fontSize: 16,
    whiteSpace: 'pre-wrap',
  },
})

const SplitSemiColonString = (text) => {
  return text.replace(/;/g, '\n').replace(/_/g, ' ')
}

const columnWidths = {
  Kinnate_Alias: '120px',
  Tier: '80px',
  QSAR_Model: '100px',
  MODEL_ASSESS: '90px',
  MODEL: '200px',
  ClosestNames: '200px',
  Tanimoto: '80px',
  BestSimilarity: ' 100px',
}

const propNames = {
  // 'REGNO',
  // 'SMILES',
  Kinnate_Alias: 'Kinnate Alias',
  Tier: 'Tier',
  QSAR_Model: 'QSAR Model',
  // 'Observed',
  // 'HOLD_OUT',
  MODEL_ASSESS: 'Model Assess',
  // 'Transform',
  MODEL: 'Model',
  // 'No_Prod_Sim',
  ClosestNames: 'Closest Names',
  // 'ClosestSMILES',
  Tanimoto: 'Tanimoto',
  BestSimilarity: 'Best Similarity',
  // 'PROJECT_NAME',
  // 'PEYN_COMMENT',
}

class TierTable extends Component {
  render() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label={`QSAR ${this.props.tier} Table`} size='small'>
          <TableHead>
            <TableRow>
              {Object.values(propNames).map((n, i) => (
                <TableCell
                  key={`head_${i}`}
                  sx={{
                    lineHeight: '14px',
                    backgroundColor: colour,
                    color: 'white',
                    maxWidth: columnWidths[n],
                  }}
                >
                  {n}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map((r, i) => {
              return (
                <TableRow
                  hover
                  key={`tier_${this.props.tier}_row_${i}`}
                  sx={{
                    '&:last-child td, &:last-child th': {
                      border: 0,
                    },
                  }}
                >
                  {Object.keys(propNames).map((propName, j) =>
                    Object.keys(r).length === 0 ? (
                      <TableCell
                        sx={{
                          height: '14px',
                          maxWidth: 'auto',
                        }}
                        key={`blank_${i}_${j}`}
                      ></TableCell>
                    ) : ['ClosestNames', 'MODEL', 'Kinnate_Alias'].includes(
                        propName
                      ) ? (
                      <CustomWidthTooltip
                        key={`tooltip_${i}_${j}`}
                        title={SplitSemiColonString(r.attributes[propName])}
                      >
                        <TableCell
                          sx={{
                            fontSize: '11px',
                            height: '14px',
                            maxWidth: columnWidths[propName],
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                          key={`${r.attributes[propName]}_${i}_${j}`}
                        >
                          {r.attributes[propName]}
                        </TableCell>
                      </CustomWidthTooltip>
                    ) : (
                      <TableCell
                        sx={{
                          fontSize: '11px',
                          height: '14px',
                          maxWidth: columnWidths[propName],
                        }}
                        key={`${r.attributes[propName]}_${i}_${j}`}
                      >
                        {r.attributes[propName]}
                      </TableCell>
                    )
                  )}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}
export default TierTable
