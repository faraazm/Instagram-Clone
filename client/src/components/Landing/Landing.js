import React, { Component } from 'react';
import { Grid, Segment, Card, Icon, Image, Header, List } from 'semantic-ui-react';
import * as photoActions from '../../actions/photo';
import * as userActions from '../../actions/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Landing extends Component {
    componentWillMount() {
        this.props.userActions.fetchUser();
        this.props.photoActions.fetchPhotos();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    renderFeed() {
        if(this.props.photos && this.props.user){
            return this.props.photos.map(photo =>
                <Card key={photo._id} style={{ width: '100%' }}>
                    <Image style={{ width: '100%', height: '500px' }} src={photo.imageUrl} />
                    <Card.Content>
                        <Card.Header as='h2'>
                            <Image src='http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg' avatar />
                            <span>{this.props.user.username}</span>
                        </Card.Header>
                        <Card.Description>{photo.caption}</Card.Description>
                    </Card.Content>
                </Card>
        )
        } else {
            return <div>Loading...</div>
        }
    }

    render() {
        return (
            <Grid columns={2} container divided stackable>
                <Grid.Row>
                    <Grid.Column width={10}>
                        {this.renderFeed()}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Segment>
                            <div>
                                <Image src='http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg' avatar />
                                <span>Username</span>
                            </div>
                        </Segment>
                        <Segment>
                            <List animated verticalAlign='middle'>
                                <List.Item>
                                    <Image avatar src='http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg' />
                                    <List.Content>
                                        <List.Header>Helen</List.Header>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <Image avatar src='http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg' />
                                    <List.Content>
                                        <List.Header>Christian</List.Header>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <Image avatar src='http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg' />
                                    <List.Content>
                                        <List.Header>Daniel</List.Header>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user,
        photos: state.photos.photos
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        photoActions: bindActionCreators(photoActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);