import React, { Component } from 'react';
import { withNameSpacesAndRouterAndRedux } from '../../utils';
import i18n from '../../i18n';
import { Grid } from 'semantic-ui-react';
import TopMenuUnauthenticated from '../ComponentMenu/TopMenuUnauthenticated';
import TopMenu from '../ComponentMenu/TopMenu';
import './BaseLayout.css';


class BaseLayout extends Component {

    changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    // TODO: improve base page UI (Sprint 2)
    render() {
        const { t, user, lectures } = this.props;
        const { pathname } = window.location;

        return (
            <React.Fragment>
                <header>
                    {/* TODO: fix this TopMenu */}
                    { user.isLoadingUser || !user.isAuthenticated ? (
                        <TopMenuUnauthenticated t={ t } changeLanguage={ this.changeLanguage } />
                    ) : (
                        <TopMenu t={ t } changeLanguage={ this.changeLanguage } />
                    )}
                </header>

                {/* TODO: fix matching TopMenu clicked items with Route content shown (below) */}
                <main id="page-content">
                    <Grid columns={ 3 }>
                        <Grid.Column width={ 3 }>
                            {/* TODO: add left aside menu (listing lectures of a specific subject) */}
                            { user.isLoadingUser || !user.isAuthenticated || pathname === '/home' || pathname === '/' ? (
                                ''
                            ) : (
                                <>
                                    { Object.keys(lectures)
                                            .map((index) => (
                                                <p className="list-group-item" key={ index }>
                                                    { lectures[index].name }
                                                </p>
                                            ))
                                    }
                                </>
                            ) }
                        </Grid.Column>
                        <Grid.Column width={ 10 }>
                            { this.props.children }
                        </Grid.Column>
                    </Grid>
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    lectures: state.subject.currentSubject.lectures,
});

const mapDispatchToProps = {};

export { BaseLayout };
export default withNameSpacesAndRouterAndRedux(mapStateToProps, mapDispatchToProps, BaseLayout);
