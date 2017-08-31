import React, {PropTypes} from 'react';
import * as StudentAction from "../../../actions/studentActions";
import {connect} from "react-redux";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {browserHistory} from 'react-router';
import $ from 'jquery';
import '../../../js/code-help-jquery.js';
const categoriesSelect = [
  {
    label: 'ESE',
    value: 'ESE'
  }, {
    label: 'ELL',
    value: 'ELL'
  }, {
    label: 'SLD',
    value: 'SLD'
  }, {
    label: 'EBD',
    value: 'EBD'
  }, {
    label: 'FRL',
    value: 'FRL'
  }, {
    label: 'Speech',
    value: 'Speech'
  }, {
    label: 'Hearing',
    value: 'Hearing'
  }
];
const accomodationSelect = [
  {
    label: 'Modified Task',
    value: 'Modified Task'
  }, {
    label: 'Extended Time',
    value: 'Extended Time'
  }, {
    label: 'Peer assistance',
    value: 'Peer assistance'
  }, {
    label: 'Used microphone',
    value: 'Used microphone'
  }, {
    label: 'Use of dictionary',
    value: 'Use of dictionary'
  }, {
    label: 'Use of calculator',
    value: 'Use of calculator'
  }, {
    label: 'Peer assistance',
    value: 'Peer assistance'
  }, {
    label: 'Clarified/Repeated Directions',
    value: 'Clarified/Repeated Directions'
  }, {
    label: 'Small group learning',
    value: 'Small group learning'
  }, {
    label: 'Use of graphic organizer',
    value: 'Use of graphic organizer'
  }, {
    label: 'Enrichment opportunities',
    value: 'Enrichment opportunities'
  }, {
    label: 'Receive copies of notes',
    value: 'Receive copies of notes'
  }, {
    label: 'One-on-one learning',
    value: 'One-on-one learning'
  }, {
    label: 'Answer test questions orally',
    value: 'Answer test questions orally'
  }, {
    label: 'Test questions read orally',
    value: 'Test questions read orally'
  }, {
    label: 'Modified testing conditions',
    value: 'Modified testing conditions'
  }
];
const studentImage = [
  {
    src: "apple-green.png",
    alt: "apple-green"
  }, {
    src: "apple-mix.png",
    alt: "apple-mix"
  }, {
    src: "apple-red.png",
    alt: "apple-red"
  }, {
    src: "apple-yellow.png",
    alt: "apple-yellow"
  }, {
    src: "apple_new1.png",
    alt: "apple_new1"
  }
];
/************ get the teacher id **************/
import localforage from 'localforage';
class AddStudent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      category: '',
      parentName: '',
      parentNumber: '',
      stuStateScore: '',
      lexile: '',
      firstNameErrMsg: '',
      lastNameErrMsg: '',
      categoryErrMsg: '',
      parentNameErrorMsg: '',
      parentNumberErrorMsg: '',
      stuStateScoreErrorMsg: '',
      lexileErrorMsg: '',
      allfieldErrMsg: '',
      valid: false,
      image: 'apple-green.png',
      csverrorMessage: '',
      disabled: false,
      crazy: false,
      optionsCat: categoriesSelect,
      valueCategory: [],
      optionsAcco: accomodationSelect,
      valueAccomodation: [],
      iconStatus: false,
      students: [],
      showProgress: false,
      parent_email: '',
      parentEmailErrorMsg: '',
      uploadedStudents: 0
    };
    this.validateFirstName = this.validateFirstName.bind(this);
    this.validateLastName = this.validateLastName.bind(this);
    this.validatecategoreyName = this.validatecategoreyName.bind(this);
    this.validateParentName = this.validateParentName.bind(this);
    this.validateParentNumber = this.validateParentNumber.bind(this);
    this.validatestuStateScore = this.validatestuStateScore.bind(this);
    this.validateParentName = this.validateParentName.bind(this);
    this.validatelexile = this.validatelexile.bind(this);
    this.submitStudentInfo = this.submitStudentInfo.bind(this);
    this.checkInfo = this.checkInfo.bind(this);
    ///this.handleImageChange = this.handleImageChange.bind(this);
    this.restrictKey = this.restrictKey.bind(this);
    this.clearState = this.clearState.bind(this);
    this.validateParentEmail = this.validateParentEmail.bind(this);

  }

  /***use for multi select  categories and accomodation******/
  handleSelectCategoriesChange(valueCategory) {

    this.setState({valueCategory});
  }

  handleSelectAccomodationChange(valueAccomodation) {

    this.setState({valueAccomodation});
  }

  /********onChange firstName  ***********/
  validateFirstName(e) {
    e.preventDefault();
    let firstName = e.target.value;
    if (firstName == '' || firstName == null) {
      this.setState({firstName: e.target.value, firstNameErrMsg: 'First Name is required', valid: false});
      return false;
    } else {
      this.setState({firstName: e.target.value, firstNameErrMsg: '', allfieldErrMsg: '', csverrorMessage: ''});
    }
    this.checkInfo();
  }

  /********onChage lastname  ***********/
  validateLastName(e) {
    e.preventDefault();
    let lastname = e.target.value;
    if (lastname == '' || lastname == null) {
      this.setState({lastName: e.target.value, lastNameErrMsg: 'Last Name is required', valid: false});
      return false;
    } else {
      this.setState({lastName: e.target.value, lastNameErrMsg: '', allfieldErrMsg: '', csverrorMessage: ''});
    }
    this.checkInfo();
  }

  /********onChage Parent Name ***********/
  validateParentEmail(e) {
    e.preventDefault();
    let email = e.target.value;
    let atpos = email.indexOf("@");
    let dotpos = email.lastIndexOf(".");
    if ((email.length > 2) && (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length)) {
      this.setState({parentEmailErrorMsg: 'Email is not valid', parent_email: e.target.value, valid: false});
      return false;
    } else {
      this.setState({parent_email: e.target.value, parentEmailErrorMsg: null});
    }
  }

  /********onChage category  ***********/
  validatecategoreyName(e) {
    e.preventDefault();
    let category = e.target.value;
    if (category == '' || category == null) {
      this.setState({category: e.target.value, categoryErrMsg: 'Category is required', valid: false});
      return false;
    } else {
      this.setState({category: e.target.value, categoryErrMsg: '', allfieldErrMsg: '', csverrorMessage: ''});
    }
    this.checkInfo();
  }

  /********onChage Parent Name ***********/
  validateParentName(e) {
    e.preventDefault();
    let parentName = e.target.value;
    if (parentName == '' || parentName == null) {
      this.setState({parentName: e.target.value, parentNameErrorMsg: 'Parent Name is required', valid: false});
      return false;
    } else {
      this.setState({parentName: e.target.value, parentNameErrorMsg: '', allfieldErrMsg: '', csverrorMessage: ''});
    }
    this.checkInfo();
  }

  /********onChage Parent Number ***********/
  restrictKey(e) {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

  validateParentNumber(e) {
    let parentNumber = e.target.value;
    if (parentNumber == '' || parentNumber == null) {
      this.setState({parentNumber: ' ', parentNumberErrorMsg: 'Parent Number is required', valid: false});
      return false;
    } else if (parentNumber.length <= 10) {
      this.setState({parentNumber: e.target.value, parentNumberErrorMsg: 'Number should be 10 digit', valid: false});
      return false;
    } else {
      this.setState({parentNumber: e.target.value, parentNumberErrorMsg: '', allfieldErrMsg: '', csverrorMessage: ''});
    }
    this.checkInfo();
  }

  /*****Onchange Student State Score  **********/
  validatestuStateScore(e) {
    e.preventDefault();
    let stuStateScore = e.target.value;

    if (stuStateScore == '' || stuStateScore == null) {
      this.setState({stuStateScore: e.target.value, stuStateScoreErrorMsg: 'Student State Score  is required', valid: false});
      return false;
    } else {
      this.setState({stuStateScore: e.target.value, stuStateScoreErrorMsg: '', allfieldErrMsg: '', csverrorMessage: ''});
    }
    //sthis.checkInfo();
  }

  /*************** Onchange Lexile ************/
  validatelexile(e) {

    e.preventDefault();
    let lexile = e.target.value;

    if (lexile == '' || lexile == null) {
      this.setState({lexile: e.target.value, lexileErrorMsg: 'Lexile State Score  is required', valid: false});
      return false;
    } else {
      this.setState({lexile: e.target.value, lexileErrorMsg: '', allfieldErrMsg: '', csverrorMessage: ''});
    }
    this.checkInfo();
  }

  /********Submit student info ***********/
  checkInfo() {
    //if(this.state.parentName && this.state.parentNumber && this.state.stuStateScore  && this.state.lexile && this.state.firstName && this.state.lastName  != ''){
    if (this.state.firstName && this.state.lastName != '') {
      this.setState({valid: true});
    }
  }

  /********Import Student inforamation from csv ***************************/
  clickImportFile() {
    document.getElementById("csvFileInput").click();
  }

  handleFiles(e) {
    e.preventDefault();
    let file = e.target.files[0];
    // Check for the various File API support.
    if (window.FileReader) {
      if (file.size >= 1026 && file.type != "text/csv") {
        this.setState({csverrorMessage: 'Only CSV file is required'});
        return false;
      }
      // FileReader are supported.
      //let reader = new FileReader();
      this.getAsText(file);
    } else {
      alert('FileReader are not supported in this browser.');
    }
  }

  getAsText(fileToRead) {
    let reader = new FileReader();
    // Handle errors load
    reader.onload = this.loadHandler.bind(this);
    reader.onerror = this.errorHandler;
    // Read file into memory as UTF-8
    reader.readAsText(fileToRead);
  }

  loadHandler(event) {
    this.setState({showProgress: true});
    let csv = event.target.result;

    let lines = csv.split(/\r\n|\r|\n/);
    let result = [];
    let headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
      let obj = {};
      let currentline = lines[i].split(",");
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    if (result.length) {
      let periodId = this.props.periodInfo;
      let periodName = this.props.periodName;
      /******************add multiple student at a time *******************/
      setTimeout(() => {
        result.map((student, index) => {
          let data = {};
          data['period_id'] = periodId,
          data['icon'] = this.state.image
            ? this.state.image
            : '';
          localforage.getItem('token').then((value) => {
            data['teacher_id'] = value[1];
          }).catch(() => {});
          data['first_name'] = student.firstName;
          data['last_name'] = student.lastName;
          data['state_test_scores'] = student.stuStateScore;
          data['lexile'] = student.lexile
            ? student.lexile
            : '';
          data['parent_email'] = student.parentEmail
            ? student.parentEmail
            : '';
          data['category'] = student.category
            ? student.category
            : '';
          data['accommodations'] = student.accommodation
            ? student.accommodation
            : '';
          data['parent_name'] = student.parentName
            ? student.parentName
            : '';
          data['parent_number'] = student.parentNumber
            ? student.parentNumber
            : '';
          this.setState({
            uploadedStudents: this.state.uploadedStudents + 1
          });
          this.props.addStudent(data);
          if (result.length - 1 == index) {

            setTimeout(() => {
              let csvId = document.getElementById("csvFileInput");
              csvId.value = '';
              this.refs.csvfile.value = '';
              let modalId = document.getElementById('addstud');
              let modalClass = document.getElementsByClassName('modal-backdrop');
              modalId.style.display = "none";
              modalClass[0].parentNode.removeChild(modalClass[0]);
              this.props.getStudentListFromPeriods(periodId, periodName);
              this.forceUpdate();
              this.setState({showProgress: false, valid: true});
            }, 1000);
          }
        });
      }, 100);
      // student['firstName'] = result[0].firstName;
      // student['lastName'] = result[0].lastName;
      // student['stuStateScore'] = result[0].stuStateScore;
      // student['lexile'] = result[0].lexile;
      // student['category'] = result[0].category;
      // student['parentName'] = result[0].parentName;
      // student['parentNumber'] = result[0].parentNumber;
      // this.setState({...student});
    } else {
      toastr.error('No students found!');
      this.setState({showProgress: false, valid: true});
    }
    this.checkInfo();
  }

  errorHandler(evt) {
    if (evt.target.error.name == "NotReadableError") {
      alert("Canno't read file !");
    }
  }

  /********Import Student inforamation from csv end ***************************/

  submitStudentInfo() {
    if (this.state.valid) {
      let periodId = this.props.periodInfo;
      let periodName = this.props.periodName;
      let student = {};
      student['first_name'] = this.state.firstName;
      student['last_name'] = this.state.lastName;
      student['state_test_scores'] = this.state.stuStateScore;
      student['lexile'] = this.state.lexile;
      student['category'] = this.state.valueCategory;
      student['accommodations'] = this.state.valueAccomodation;
      student['parent_name'] = this.state.parentName;
      student['parent_number'] = this.state.parentNumber;
      student['parent_email'] = this.state.parent_email;
      student['period_id'] = periodId,
      localforage.getItem('token').then((value) => {
        student['teacher_id'] = value[1];
      }).catch(() => {});
      //student['src'] = "images/apple-yellow.png";
      student['icon'] = this.state.image
        ? this.state.image
        : '';
      this.props.addStudent(student);
      /******* get student list ***************/
      setTimeout(() => {
        this.props.getStudentListFromPeriods(periodId, periodName);
        this.forceUpdate();
      }, 200);

      // this.props.getClassStudentList(classObj);
      /****************** end student list ****************/
      this.clearState();
      browserHistory.replace('/class-room');

    } else {
      // if(this.state.parentName && this.state.parentNumber && this.state.stuStateScore  && this.state.lexile && this.state.firstName && this.state.lastName != ''){
      if (this.state.firstName && this.state.lastName != '') {

        //TODO: if all Field are empty
      } else {
        this.setState({allfieldErrMsg: 'All Fields Required (error)'});
      }
    }
  }

  clearState() {
    this.refs.firstName.value = '';
    this.refs.lastName.value = '';
    this.refs.lexile.value = '';
    this.refs.stuStateScore.value = '';
    this.refs.parentName.value = '';
    this.refs.parentNumber.value = '';
    this.setState({
      parentName: '',
      parentNumber: '',
      stuStateScore: '',
      lexile: '',
      firstName: '',
      lastName: '',
      category: '',
      valid: false,
      csverrorMessage: '',
      allfieldErrMsg: ''
    });
  }

  clickImage() {
    document.getElementById("my_file").click();
  }

  handleImageChange(value) {
    //let file = e.target.files[0];
    this.setState({image: value, iconStatus: false});

  }

  componentDidMount() {
    // $(document).ready( () => {
    //           $("#largeImage1, #click-upload1,.fileinput-new").click( () => {
    //                      this.setState({iconStatus: true ? true : false })
    //                     $("#thumbs1").toggleClass("active-thumb-cls");
    //           });
    //      })
  }

  clickIcon() {
    if (this.state.iconStatus == false) {
      this.setState({iconStatus: true});
    } else {
      this.setState({iconStatus: false});

    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({students: nextProps.students});
  }

  render() {

    let displayNone = {
      display: "none"
    };
    let imagesApple = studentImage.map((img, index) => {
      return <img key={index} src={"images/" + img.src} alt={img.src} onClick={this.handleImageChange.bind(this, img.src)}/>;
    });
    return (
      <div className="modal fade" id="addstud" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog modal-add-student" role="document">
          <div className="modal-content">
            <div className="modal-header addStudent">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <a onClick={this.clickImportFile.bind(this)} data-toggle="modal" data-target="#student-file-info" data-backdrop="static" data-keyboard="false">
                <i className="fa fa-file-text-o" aria-hidden="true"/>
                Import Student Information
              </a>
              <input type="file" id="csvFileInput" onChange={this.handleFiles.bind(this)} style={displayNone} accept=".csv" ref="csvfile"/>
              <h4 className="heading-info">Add Student</h4>
            </div>
            {/* show progress bar */}
            {this.state.showProgress
              ? (
                <div className="row">
                  <div className="col-md-3 col-sm-6 col-sm-offset-4">
                    <div className="progress blue">
                      <span className="progress-left">
                        <span className="progress-bar"></span>
                      </span>
                      <span className="progress-right">
                        <span className="progress-bar"></span>
                      </span>
                      <div className="progress-value">{this.state.uploadedStudents}</div>
                    </div>
                  </div>
                </div>
              )
              : (
                <div>
                <form name="studentform" id="studentform">
                  <div className="modal-body">
                    <div className="col-md-12">
                      {(this.state.allfieldErrMsg != '' || this.state.allfieldErrMsg == null)
                        ? <div className="alert alert-danger">{this.state.allfieldErrMsg}</div>
                        : <div/>}
                      {(this.state.csverrorMessage != '' || this.state.csverrorMessage)
                        ? <div className="alert alert-danger">{this.state.csverrorMessage}</div>
                        : <div/>}
                      <div className="stud-info">
                        {/*
                       <div className="col-md-2">
                       <div className="thumbnail " onClick={this.clickImage.bind(this)}>
                       <img data-src="" alt="..." src="images/apple-red.png" />
                       <div className="btn-default btn-file camera-btn"> <span className="fileinput-new"><i className="fa fa-camera" aria-hidden="true" /></span> </div>
                       <input type="file" id="my_file" style={displayNone} onChange={this.handleImageChange}/>
                       </div>

                       </div>*/}
                        <div className="col-md-2">
                          <div className="thumbnail">
                            <img id="largeImage1" data-src="" alt="..." src={"images/" + this.state.image}/>
                            <div className="btn-default btn-file camera-btn" id="click-upload1" onClick={this.clickIcon.bind(this)}>
                              <span className="fileinput-new"><i className="fa fa-caret-down" aria-hidden="true"/></span>
                            </div>
                          </div>
                          {this.state.iconStatus
                            ? (
                              <div id="thumbs1" className={this.state.iconStatus
                                ? "change-profile-cls active-thumb-cls"
                                : "change-profile-cls"}>
                                {imagesApple}
                              </div>
                            )
                            : (<div/>)
}

                        </div>
                        <div className="col-md-10">
                          <div className="form-group">
                            <div className="col-md-6">
                              <label htmlFor="first_name">First Name</label>
                              <input type="text" className="form-control" id="first_name" name="first_name" onChange={this.validateFirstName} value={this.state.firstName} ref="firstName" maxLength="10" minLength="3" required/>
                              <span className="error-add-student">{this.state.firstNameErrMsg}</span>
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="last_name">Last Name</label>
                              <input type="text" className="form-control" id="last_name" name="last_name" onChange={this.validateLastName} value={this.state.lastName} ref="lastName" maxLength="10" minLength="3"/>
                              <span className="error-add-student">{this.state.lastNameErrMsg}</span>
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="test-scores">State Test Scores</label>
                              <input type="text" className="form-control" id="test-scores" name="test-scores" onChange={this.validatestuStateScore} value={this.state.stuStateScore} ref="stuStateScore"/>
                              <span className="error-add-student">{this.state.stuStateScoreErrorMsg}</span>
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="lexile">Lexile</label>
                              <input type="text" className="form-control" id="lexile" name="lexile" onChange={this.validatelexile} value={this.state.lexile} ref="lexile"/>
                              <span className="error-add-student">{this.state.lexileErrorMsg}</span>
                            </div>
                            <div className="col-md-12">
                              <label htmlFor="categorey">Category</label>
                              <Select multi simpleValue value={this.state.valueCategory} placeholder="Select your category" options={this.state.optionsCat} onChange={this.handleSelectCategoriesChange.bind(this)}/> {/* <input type="text" className="form-control" id="categorey" name="categorey" onChange={this.validatecategoreyName} value={this.state.category} ref="category"/> */}
                              {/* <span className="error-add-student">{this.state.categoryErrMsg }</span> */}
                            </div>
                            <div className="col-md-12">
                              <label htmlFor="categorey">Accommodations</label>
                              <Select multi simpleValue value={this.state.valueAccomodation} placeholder="Select your accommodations" options={this.state.optionsAcco} onChange={this.handleSelectAccomodationChange.bind(this)}/> {/* <input type="text" className="form-control" id="categorey" name="categorey" onChange={this.validatecategoreyName} value={this.state.category} ref="category"/> */}
                              {/* <span className="error-add-student">{this.state.categoryErrMsg }</span> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="col-md-2">&nbsp;</div>
                      <div className="col-md-10">
                        <hr/>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="parent-info">
                        <div className="col-md-2"></div>
                        <div className="col-md-10">
                          <div className="col-md-6">
                            <label htmlFor="first_name">Parent Name</label>
                            <input type="text" className="form-control" id="parent_name" name="parent_name" onChange={this.validateParentName} ref="parentName" value={this.state.parentName}/>
                            <span className="error-add-student">{this.state.parentNameErrorMsg}</span>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="last_name">Parent Phone Number</label>
                            <input type="text" className="form-control" id="parent-number" name="parent-number" onChange={this.validateParentNumber} ref="parentNumber" minLength="11" maxLength="11" onKeyPress={(e) => this.restrictKey(e)} value={this.state.parentNumber}/>
                            <span className="error-add-student">{this.state.parentNumberErrorMsg}</span>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="parentEmail">Parent Email</label>
                            <input type="text" className="form-control" id="parent_email" name="parentEmail" onChange={this.validateParentEmail} ref="parentEmail" value={this.state.parent_email}/>
                            <span className="error-add-student">{this.state.parentEmailErrorMsg}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </form >

              </div>
            )}
            {/* end progress bar */}
                <div className="modal-footer">
                  <div className="col-md-12">

                  <div className="add-stud-btns">
                    <a href="#" data-toggle="modal" data-target="#stud-submit" data-backdrop="static" data-keyboard="false">
                      <button type="button" className="btn btn-submit btn-rounded" data-dismiss={this.state.valid
                        ? 'modal'
                        : ''} aria-label="Close" onClick={this.submitStudentInfo}>
                        <i className="fa fa-check"></i>
                      </button>
                    </a>
                    <button type="button" className="btn btn-cancel btn-rounded" onClick={this.clearState.bind(this)} data-dismiss="modal" aria-label="Close">
                      <i className="fa fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>

          </div>
        </div>
      </div>

          ); } }

          AddStudent.propTypes = {AddStudentArr : PropTypes.array,
          addStudent : PropTypes.func,
}; const mapStateToProps = (state) => {return {students: state.students.students.students, periodName: state.students.periodName};
}; const mapDispatchToProps = (dispatch) => {return {
            getClassStudentList: (data) => dispatch(StudentAction.getClassStudentList(data)),
            addStudent: (student) => dispatch(StudentAction.addStudent(student)),
            getStudentListFromPeriods: (periodId, periodName) => dispatch(StudentAction.getStudentListFromPeriods(periodId, periodName))
          };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddStudent);
