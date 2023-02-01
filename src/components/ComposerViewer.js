import React from 'react'
import { Kekule } from 'kekule'
import 'kekule/theme'
import { KekuleReact, Components } from '../kekule/kekule.react'
import '../kekule/ComposerViewer.css'

let Composer = Components.Composer
const calcPropsURL =
  'https://pipelinepilot.kinnate.com:9923/protocols/anon/Web Services/Kinnate/STANDALONE_CALCULATED_PROPERTIES_TABLE?$streamdata=*&$format=text&smiles='

const fetchCalcProps = async (smilesString) => {
  const url = `${calcPropsURL}${smilesString}&$timeout=1000000`
  console.log(url)
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

class ComposerAndViewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      composerPredefinedSetting: 'compact',
      viewerPredefinedSetting: 'basic',
      chemObj: null,
      selectedObjs: undefined,
    }
    this.composer = React.createRef()

    this.onPredefineSettingChange = this.onPredefineSettingChange.bind(this)
    this.onComposerUserModificationDone =
      this.onComposerUserModificationDone.bind(this)
    this.onComposerSelectionChange = this.onComposerSelectionChange.bind(this)
    this.onComposerSMILESClick = this.onComposerSMILESClick.bind(this)
  }

  render() {
    let selectionInfoElem
    if (this.state.selectedObjs && this.state.selectedObjs.length) {
      let selDetails = this.getComposerSelectedAtomsAndBonds(
        this.state.selectedObjs
      )
      selectionInfoElem = (
        <span>
          You have selected {this.state.selectedObjs.length} object(s),
          including {selDetails.atoms.length} atom(s) and{' '}
          {selDetails.bonds.length} bond(s).
        </span>
      )
    } else
      selectionInfoElem = (
        <span>Please edit and select objects in the composer.</span>
      )

    return (
      <div className='ComposerAndViewerDemo'>
        <div className='InfoPanel'>
          <label>{selectionInfoElem}</label>
        </div>
        <div className='ComposerViewerPair'>
          <Composer
            className='SubWidget'
            ref={this.composer}
            predefinedSetting={this.state.composerPredefinedSetting}
            onUserModificationDone={this.onComposerUserModificationDone}
            onSelectionChange={this.onComposerSelectionChange}
          ></Composer>
        </div>
      </div>
    )
  }

  getComposerSelectedAtomsAndBonds(selection) {
    let result = { atoms: [], bonds: [] }
    ;(selection || []).forEach((obj) => {
      if (obj instanceof Kekule.Atom) result.atoms.push(obj)
      else if (obj instanceof Kekule.Bond) result.bonds.push(obj)
    })
    return result
  }

  onPredefineSettingChange(e) {
    this.setState({ composerPredefinedSetting: e.target.value })
  }

  onComposerUserModificationDone(e) {
    let composerWidget = this.composer.current.getWidget()
    this.setState({ chemObj: composerWidget.getChemObj() })
  }
  onComposerSelectionChange(e) {
    this.setState({
      selectedObjs: this.composer.current.getWidget().getSelection(),
    })
  }
  onComposerSMILESClick(e) {
    let composerWidget = this.composer.current.getWidget()
    let mol = composerWidget.exportObjs(Kekule.Molecule)
    // console.log(mol)
    let smilesString
    if (this.props.smilesString) {
      smilesString = this.props.smilesString
      console.log(smilesString)
    } else {
      smilesString = Kekule.IO.saveFormatData(mol[0], 'smi')
      console.log(smilesString)
    }
    const data = fetchCalcProps(smilesString)
    console.log(data)
  }
}

export default ComposerAndViewer
