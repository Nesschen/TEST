import React, { Component } from 'react';
import { Grid, Segment, Menu, Dropdown } from 'semantic-ui-react';
import LectureBodyContent from './LectureBodyContent';
import { LaMaSColours } from '../../utils/colourPalettes';
import '../pages/LecturePage.css';


class LecturePageStudentView extends Component {

    handleBookmarkSubject = (e) => {
        // TODO: add action to POST a request to bookmark this subject
        console.log('Not yet implemented!', e.target.value);
    };

    renderActionsDropdown = () => {
        const { t } = this.props;
        const bookmark = window.location.pathname.replace('/courses/', '');

        return (
            <Dropdown id="dropdown-lecture" button className="icon" floating labeled icon="student"
                      additionPosition="bottom" direction="left" text={ t('menu.actions') }>
                <Dropdown.Menu>
                    <Dropdown.Item value={ bookmark } onClick={ this.handleBookmarkSubject } disabled>
                        { t('menu.bookmarkSubject') }
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    };

    renderActionsComponent = () => {
        const { breadcrumbComponent } = this.props;

        return (
            <Segment>
                <Grid columns={ 2 }>
                    <Grid.Column floated='left' width={ 4 } verticalAlign={ 'middle' }>
                        { breadcrumbComponent() }
                    </Grid.Column>
                    <Grid.Column floated='right' width={ 3 }>
                        <Menu.Menu id="top-menu-lecture" position="right">
                            { this.renderActionsDropdown() }
                        </Menu.Menu>
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    };

    renderLecturesMenu = () => {
        const { t, subject, lectureId, handleLectureMenuClick } = this.props;
        const { lectures } = subject;

        return (
            <Menu fluid vertical tabular>
                { Object.keys(lectures).map((index, key) => {
                    const is_public = lectures[index].is_public;
                    return is_public ? (
                        <Menu.Item
                            color={ LaMaSColours['public-lecture-active-student'] }
                            className={ 'public-lecture-student' }
                            name={ t('baseLayout.lecture') + ( key + 1 ) }
                            id={ index }
                            key={ index }
                            active={ lectureId === index }
                            onClick={ handleLectureMenuClick }
                        />
                    ) : '';
                }) }
            </Menu>
        );
    };

    render() {
        const { t, subject, subject_id, lecture, lectureId, lectureTitle, nameOnStorage, videoUrl } = this.props;
        const { onSelectFileClick, onSelectVideoClick, showVideo } = this.props;

        return (
            <>
                { this.renderActionsComponent() }

                <Grid columns={ 3 }>
                    <Grid.Column width={ 3 }>
                        { this.renderLecturesMenu() }
                    </Grid.Column>

                    <Grid.Column width={ 10 }>
                        <LectureBodyContent
                            key={ subject_id + '-' + lectureId }
                            t={ t }
                            lectureId={ lectureId }
                            subject={ subject }
                            lecture={ lecture }
                            lectureTitle={ lectureTitle }
                            onSelectVideoClick={ onSelectVideoClick }
                            onSelectFileClick={ onSelectFileClick }
                            nameOnStorage={ nameOnStorage }
                            videoUrl={ videoUrl }
                            showVideo={ showVideo }
                        />
                    </Grid.Column>
                </Grid>
            </>
        );
    }
}

export default LecturePageStudentView;
