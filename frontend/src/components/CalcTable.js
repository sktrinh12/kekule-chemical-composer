import Table from '@mui/material/Table'
import { Component } from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { colour } from '../Colour'

const columnNames = {
  PROPERTY_NAME: ['Property Name', '20px'],
  NUMERIC_VALUE: ['Numeric Value', '18px'],
  PROPERTY_SOURCE: ['Property Source', '15px'],
}

const propNames = [
  'ALogP',
  'ROF5_Violations',
  'Num_H_Acceptors_Lipinski',
  'Num_H_Donors_Lipinski',
  'logD_7.4',
  'pKa Apparent1',
  'Sol_7.4',
]

const titleNames = [
  'LogP',
  'ROF5 Vio',
  'HBA',
  'HBD',
  'logD 7.4',
  'pKa',
  'Sol 7.4',
]

class CalcTable extends Component {
  render() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label='Property table' size='small'>
          <TableHead>
            <TableRow>
              {Object.keys(columnNames).map((k, i) => {
                return (
                  <TableCell
                    key={`header_${i}`}
                    sx={{
                      lineHeight: '20px',
                      backgroundColor: colour,
                      color: 'white',
                    }}
                  >
                    {columnNames[k][0]}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map((r, i) => {
              if (propNames.includes(r.attributes.PROPERTY_NAME)) {
                return (
                  <TableRow
                    hover
                    key={`row_${i}`}
                    sx={{
                      height: '14px',
                      fontSize: '11px',
                    }}
                  >
                    <TableCell
                      sx={{
                        maxWidth: columnNames.PROPERTY_NAME[1],
                      }}
                      key={`cell_prop_name_${i}`}
                    >
                      {
                        titleNames[
                          propNames.indexOf(r.attributes.PROPERTY_NAME)
                        ]
                      }
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: columnNames.NUMERIC_VALUE[1],
                      }}
                      key={`cell_num_val_${i}`}
                    >
                      {r.attributes.NUMERIC_VALUE}
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: columnNames.PROPERTY_SOURCE[1],
                      }}
                      key={`cell_prop_src_${i}`}
                    >
                      {r.attributes.PROPERTY_SOURCE}
                    </TableCell>
                  </TableRow>
                )
              }
              return null
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}
export default CalcTable
