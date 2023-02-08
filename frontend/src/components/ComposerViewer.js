import React from "react";
import { Kekule } from "kekule";
import "kekule/theme";
import { KekuleReact, Components } from "../kekule/kekule.react";
import "../kekule/ComposerViewer.css";
const { Molecule } = require("openchemlib");

let Composer = Components.Composer;
Kekule.environment.setEnvVar(
  "openbabel.path",
  `${process.env.PUBLIC_URL}/kekule/`
); // need only to call this once
// Kekule.OpenBabel.enable((e) => {
//   console.log(e)
// })

class ComposerAndViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      composerPredefinedSetting: "compact",
      viewerPredefinedSetting: "basic",
      chemObj: null,
      selectedObjs: undefined,
      data: {},
    };
    this.composer = React.createRef();

    this.onPredefineSettingChange = this.onPredefineSettingChange.bind(this);
    this.onComposerUserModificationDone = this.onComposerUserModificationDone.bind(
      this
    );
    this.onComposerSelectionChange = this.onComposerSelectionChange.bind(this);
    this.onComposerSMILESClick = this.onComposerSMILESClick.bind(this);
  }

  render() {
    let selectionInfoElem;
    if (this.state.selectedObjs && this.state.selectedObjs.length) {
      let selDetails = this.getComposerSelectedAtomsAndBonds(
        this.state.selectedObjs
      );
      selectionInfoElem = (
        <span>
          You have selected {this.state.selectedObjs.length} object(s),
          including {selDetails.atoms.length} atom(s) and{" "}
          {selDetails.bonds.length} bond(s).
        </span>
      );
    } else
      selectionInfoElem = (
        <span>
          Please use the composer to load a chemical structure or draw one
          manually, another option is to input the SMILES string below
        </span>
      );

    return (
      <div className="ComposerAndViewerDemo">
        <div className="InfoPanel">
          <label>{selectionInfoElem}</label>
        </div>
        <div className="ComposerViewerPair">
          <Composer
            className="SubWidget"
            ref={this.composer}
            predefinedSetting={this.state.composerPredefinedSetting}
            onUserModificationDone={this.onComposerUserModificationDone}
            onSelectionChange={this.onComposerSelectionChange}
          ></Composer>
        </div>
      </div>
    );
  }

  getComposerSelectedAtomsAndBonds(selection) {
    let result = { atoms: [], bonds: [] };
    (selection || []).forEach((obj) => {
      if (obj instanceof Kekule.Atom) result.atoms.push(obj);
      else if (obj instanceof Kekule.Bond) result.bonds.push(obj);
    });
    return result;
  }

  onPredefineSettingChange(e) {
    this.setState({ composerPredefinedSetting: e.target.value });
  }

  onComposerUserModificationDone(e) {
    let composerWidget = this.composer.current.getWidget();
    this.setState({ chemObj: composerWidget.getChemObj() });
    let mol = composerWidget.exportObjs(Kekule.Molecule);
    if (mol.length) {
      let smilesString = Kekule.IO.saveFormatData(mol[0], "smi");
      this.props.handleUpdateSMILES(smilesString);
      console.log(smilesString);
    }
  }
  onComposerSelectionChange(e) {
    this.setState({
      selectedObjs: this.composer.current.getWidget().getSelection(),
    });
  }

  onComposerClearChemObj(e) {
    this.setState({ chemObj: null });
    this.composer.current.getWidget().newDoc();
    // console.log(this.composer.current.getWidget());
  }

  onComposerSMILESClick(e) {
    let mol;
    let smilesString;
    smilesString = this.props.smilesString;
    const molfile = Molecule.fromSmiles(smilesString).toMolfile();
    mol = Kekule.IO.loadFormatData(molfile, "mol");
    // console.log(this.props.insertSmiles)
    if (this.props.insertSmiles) {
      let generator = new Kekule.Calculator.ObStructure2DGenerator();
      generator.setSourceMol(mol);
      generator.execute((err) => {
        if (!err) {
          let newMol = generator.getGeneratedMol();
          this.composer.current.getWidget().setChemObj(newMol);
          // this.setState({ chemObj: newMol })
        } else {
          console.error(err);
        }
      });
    }
    console.log(smilesString);
    this.props.fetchCalcProps(smilesString);
  }
}

export default ComposerAndViewer;
