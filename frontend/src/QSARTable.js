import React, { Component } from 'react'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import { xmlDataQSAR } from './mockdataQSAR'
import XMLParser from 'react-xml-parser'
import TierTable from './TierTable'

const xmldata = new XMLParser().parseFromString(xmlDataQSAR)
const data = xmldata.children
// console.log(data)

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  maxWidth: 1500,
  color: theme.palette.text.primary,
}))

class QSARTable extends Component {
  render() {
    const tiers = [...new Set(data.map((item) => item.attributes.Tier))]
    // console.log(tiers)
    const padRows = (data, maxNumRows) => {
      const rowsToAdd = maxNumRows - data.length
      const paddedData = [...data]
      for (let i = 0; i < rowsToAdd; i++) {
        paddedData.push({})
      }
      return paddedData
    }
    const tierData = {}
    tiers.forEach((tier) => {
      tierData[tier] = data.filter((item) => item.attributes.Tier === tier)
    })
    const maxNumRows = Math.max(
      ...Object.values(tierData).map((td) => td.length)
    )
    // console.log(maxNumRows)

    return (
      <StyledPaper
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
      >
        <Grid container spacing={2} justifyContent='center'>
          {Object.entries(tierData).map(([tier, data], i) => {
            return (
              <Grid item xs={6} key={`grid_${i}`}>
                <TierTable data={padRows(data, maxNumRows)} tier={tier} />
              </Grid>
            )
          })}
        </Grid>
      </StyledPaper>
    )
  }
}

export default QSARTable
