import Table from '@mui/material/Table'
import { Component } from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

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

const colour = '#282c34'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colour,
    color: theme.palette.common.white,
    alignItems: 'center',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}))

class TierTable extends Component {
  render() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label={`QSAR ${this.props.tier} Table`} size='small'>
          <TableHead>
            <TableRow>
              {Object.values(propNames).map((n, i) => (
                <StyledTableCell key={`head_${i}`}>{n}</StyledTableCell>
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
                  style={{ height: '20px' }}
                >
                  {Object.keys(propNames).map((propName, j) =>
                    Object.keys(r).length === 0 ? (
                      <TableCell key={`blank_${i}_${j}`}></TableCell>
                    ) : (
                      <TableCell key={`${r.attributes[propName]}_${i}_${j}`}>
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
