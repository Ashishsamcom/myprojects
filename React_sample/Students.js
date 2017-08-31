import React, { PropTypes } from 'react';
import { connect } from "react-redux";
import * as RightSidebarModalActions from "../../actions/rightSidebarModalActions";
import * as StudentAction from "../../actions/studentActions";
import { browserHistory } from 'react-router';
import Header from '../common/Header';
const minHeight = {
   minHeight: window.innerHeight - 150,
 };

class StudentsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			state: true,
			StudentsArr: [],
			showClass: false,
			groupInfo: []
		};
		this.getStudentGroup = this.getStudentGroup.bind(this);
	}

	componentWillMount() {
		this.props.getStudentGroupList();
		setTimeout(() => {
			this.setState({ showClass: this.props.showClass, groups: this.props.groups, StudentsArr: this.props.StudentsArr });
		}, 100);
	}

	componentWillReceiveProps(nextProps) {

		this.setState({ groups: nextProps.groups, show: nextProps.showtab, StudentsArr: nextProps.StudentsArr, showClass: nextProps.showClass });
	}

	componentDidMount() {
		$.fn.modal.prototype.constructor.Constructor.DEFAULTS.backdrop = 'static';
	}

	behaviorNameShow(name) {
		if (name == 'Positive') {
			this.setState({ show: true });
		} else {
			this.setState({ show: false });
		}
	}

	getStudentListFromGroups(students) {
		this.props.getStudentListFromGroups(students);
		this.setState({ show: false });
		setTimeout(() => {
			browserHistory.replace('/class-room');
		}, 100);
	}

	getStudentGroup() {
		$("#student-grp-list-cls").modal("hide");
		$("#add-grp-student").modal();
		$("#cancelBackAddGroup").attr("data-target", "#student-grp-cls");
	}

	newGroupClicked(group) {
		var grp = { students: [], groupName: '' }
		this.props.getGroupInfo(grp);
		$("#student-grp-list-cls").modal("hide");
		$("#add-grp-student").modal({
			backdrop: 'static',
			keyboard: false
		});
		$("#cancelBackAddGroup").attr("data-target", "#student-grp-cls");
	}

	openStudentInformationModal(student) {
		this.props.studentInfo(student)
		$("#demo-class-stud").modal();
	}

	openGroupInformationModal(group) {
		this.props.getGroupInfo(null);
		this.props.getGroupInfo(group);

		$("#student-grp-list-cls").modal({
			backdrop: 'static',
			keyboard: false
		});

	}


	render() {

		let periodId = this.props.periodInfo;
		let periodName = this.props.periodName;

		let studentsInClass = null;
		let students = this.state.StudentsArr;

		if (students && students.length > 0) {
			studentsInClass = students.map((student, index) => {
				return (
					<div className="col-md-3 col-lg-2 col-xs-6 col-sm-4" key={index}>
						<a data-toggle="modal"
               className="block-href"
               data-ga-track="true" data-ga-category="class-room" data-ga-modal="true" data-ga-location={"class-room/student/"} data-ga-action="student" data-ga-label="student-modal"
               onClick={(student.attendance != 'A')
							? this.openStudentInformationModal.bind(this, student)
							: ''} data-backdrop="static" data-keyboard="true" aria-label="Close">
							<div className={student.attendance == 'A'
								? "demo-class-student absent-student"
								: "demo-class-student"}>
								<div className="apple-icon-position">
									<img src={(student.icon !== null)
										? ((student.icon).indexOf('.png') !== -1
											? "images/" + student.icon
											: "images/" + (student.icon + '.png'))
										: ("images/apple-red.png")} alt="" />
								</div>
								<span className="demo-class-student-name">{student.first_name.substring(0, 1).toUpperCase() + student.first_name.substring(1, 8).toLowerCase() + " " + student.last_name.substring(0, 1).toUpperCase() + student.last_name.substring(1, 8).toLowerCase()}
								</span>
							</div>
							<div className="checkbox-input-cls hall-checkbox-input">
								<span>{index}</span>
							</div>
						</a>
					</div>
				);
			});
		}

		let groupData = null;
		let { periodInfo } = this.props;

		if (this.state.groups && this.state.groups.length > 0) {

			groupData = this.state.groups.map((group, index) => {
				if (group.period_id == periodInfo) {
					return (
						<div className="col-md-3 col-lg-2" key={index}>
							<a   className="block-href"
                data-ga-track="true" data-ga-category="class-room" data-ga-modal="true" data-ga-location={"class-room/group/"} data-ga-action="group" data-ga-label="group-modal"
                onClick={this.openGroupInformationModal.bind(this, group)} >
								<div className="grp-info-cls">
									<figure><img src="images/grp-img.png" alt="" /></figure>
									<h2>{group.name.substring(0, 10)}</h2>
									<p>{group.number_of_student} Students</p>
								</div>
							</a>
						</div>
					);
				}
			});

		}
		return (
			<div className={this.state.showClass
				? "content-wrapper cnt-side-wrap"
				: "content-wrapper"} style={minHeight}>
				<section className="content-header">
					<div className="heading-sub-dash-header">
						<h3 className="period-name">{periodName}</h3>

						<div className="toggle-grp-stu" id="reallycrappydiv">
							<ul className="list-inline">
								<li
                  data-ga-track="true" data-ga-category="class-room"  data-ga-location={"class-room/"} data-ga-action="student-tab" data-ga-label="Student"
                  className={this.state.show
									? 'ui-tabs-tab ui-corner-top ui-state-default ui-tab'
									: 'ui-tabs-tab ui-corner-top ui-state-default ui-tab ui-tabs-active ui-state-active'}>
									<a onClick={this.behaviorNameShow.bind(this, "Negtive")}>Students</a>
								</li>
								<li
                  data-ga-track="true" data-ga-category="class-room"  data-ga-location={"class-room/"} data-ga-action="group-tab" data-ga-label="Group"
                  className={this.state.show
									? 'ui-tabs-tab ui-corner-top ui-state-default ui-tab ui-tabs-active ui-state-active'
									: 'ui-tabs-tab ui-corner-top ui-state-default ui-tab'}>
									<a onClick={this.behaviorNameShow.bind(this, "Positive")}>Groups</a>
								</li>
							</ul>
						</div>

						<div className="nav-pull-out-right">
							<ul className="view-report-cls list-inline">
								<li>
									<a id="control-side-cls" data-toggle="control-sidebar" className="waves-effect waves-light" onClick={this.props.autoCollapse.bind(this)}><i className="fa fa-bars" /></a>
								</li>
							</ul>
						</div>
						<div className="clearfix" />
					</div>
				</section>

				{(!this.state.show)
					? (
						<section className="content" style={minHeight}>
							<div className="demo-class-student-list">
								{studentsInClass}
								{periodId
									? (
										<div className="col-md-3 col-lg-2 col-xs-6 col-sm-4">
											<a href="#" data-toggle="modal" data-target="#addstud" data-ga-track="true" data-ga-category="student" data-ga-action="student-modal" data-backdrop="static" data-keyboard="true" data-dismiss="modal" aria-label="Close">
												<div className="demo-class-student1 add-new">
													<div className="new-add-cls"><i className="fa fa-plus" /></div>
													<span>Add Student</span>
												</div>
											</a>
										</div>
									)
									: (<div />)}
								<div className="clearfix" />
							</div>
						</section>
					)
					: (
						<section className="content">
							{groupData}
							<div className="col-md-3 col-lg-2 col-xs-6 col-sm-4">
								<div className="create-cls-div">
									<a onClick={this.newGroupClicked.bind(this, {})} data-backdrop="static" data-keyboard="false">
										<button type="button" aria-label="Close" data-backdrop="static" data-keyboard="false">
											<div className="create-plus-cls"><i className="fa fa-plus" /></div>
											<h2>Create Group</h2>
										</button>
									</a>
								</div>
							</div>
						</section>
					)}
			</div>
		);
	}
}

StudentsList.propTypes = {
	studentInfo: PropTypes.func,
	classroomInfo: PropTypes.object,
	StudentsArr: PropTypes.array,
	groupInfo: PropTypes.func
};

const mapStateToProps = (state) => {
	return { groups: state.rightSidebarModel.groups };
};
const mapDispatchToProps = (dispatch) => {
	return {
		getStudentGroupList: (data) => dispatch(RightSidebarModalActions.getStudentGroupList()),
		getStudentListFromGroups: (data) => dispatch(StudentAction.getStudentListFromGroups(data)),
		getGroupProfile: (studentId) => dispatch(StudentAction.getGroupProfile(studentId)),
		getGroupInfo: (group) => dispatch(StudentAction.getGroupInfo(group))

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentsList);
