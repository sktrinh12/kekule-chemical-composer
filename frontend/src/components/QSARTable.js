import React, { Component } from 'react'
import Grid from '@mui/material/Grid'
import TierTable from './TierTable.js'
import CalcTable from './CalcTable.js'

class QSARTable extends Component {
  render() {
    const tiers = [
      ...new Set(this.props.tierData.map((item) => item.attributes.Tier)),
    ]
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
      tierData[tier] = this.props.tierData.filter(
        (item) => item.attributes.Tier === tier
      )
    })
    // console.log(Object.keys(tierData).length)
    const maxNumRows = Math.max(
      ...Object.values(tierData).map((td) => td.length)
    )
    // console.log(maxNumRows)

    return (
      <Grid container spacing={2} justifyContent='center'>
        {Object.entries(tierData).map(([tier, data], i) => {
          return (
            <Grid item xs={6} key={`grid_${i}`}>
              <TierTable data={padRows(data, maxNumRows)} tier={tier} />
              {i === Object.keys(tierData).length - 1 && (
                <CalcTable data={this.props.calcData} />
              )}
            </Grid>
          )
        })}
      </Grid>
    )
  }
}

export default QSARTable
