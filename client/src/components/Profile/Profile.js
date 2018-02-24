import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as photoActions from '../../actions/photo';
import * as userActions from '../../actions/user';
import { Container, Item, Image, Button, Icon, Label, Header, Grid, Segment, Card } from 'semantic-ui-react';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.submitImage = this.submitImage.bind(this);
    }

    componentWillMount() {
        this.props.userActions.fetchUser();
        this.props.photoActions.fetchPhotos();
    }

    submitImage(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', this.state.file);
        if (this.props.user) {
            this.props.photoActions.uploadPhoto(formData, this.props.user);
        }
    }

    renderPhotos() {
        if (this.props.photos && this.props.user) {
            return this.props.photos.map(photo =>
                <Grid.Column key={photo._id}>
                    <Card>
                        <Image style={{ height: '300px', width: '300px' }} src={photo.imageUrl} />
                        <Card.Content>
                            <Card.Header>
                                {this.props.user.username}
                            </Card.Header>
                            <Card.Description>
                                {photo.caption}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                                <Button>Edit</Button>
                                <Button onClick={() => this.props.photoActions.deletePhoto(photo.image_id)}>Delete</Button>
                            </div>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            )
        }
    }

    renderUserCard() {
        if (this.props.user) {
            return <Item>
                <Item.Image src={this.props.user.profilePic} />
                <Item.Content>
                    <Item.Header>
                        <Header as='h1'>{this.props.user.username}</Header>
                        <Button color='black'>
                            <Header as='h4' style={{ color: 'white' }}>Edit Profile</Header>
                        </Button>
                        <Button color='black'>
                            <Header as='h4' style={{ color: 'white' }}>Upload Avatar</Header>
                        </Button>
                        <form onSubmit={this.submitImage} encType="multipart/form-data">
                            <input type="file" name="profile" onChange={this.onChange}/>
                            <Button type="submit">Upload Picture</Button>
                        </form>
                    </Item.Header>
                    <Item.Meta>
                        <span as='h2'>{this.props.user.followers.length} Followers</span>
                        <span as='h2'>{this.props.user.following.length} Following</span>
                    </Item.Meta>
                    <Item.Description>
                        A description which may flow for several lines and give context to the content.
                </Item.Description>
                </Item.Content>
            </Item>
        }
    }

    onChange(e) {
        this.setState({ file: e.target.files[0] });
    }

    render() {
        return (
            <div>
                <Container>
                    <Item.Group divided>
                        {this.renderUserCard()}
                    </Item.Group>
                </Container>
                <Container>
                    <Grid columns={3} doubling stackable>
                        {this.renderPhotos()}
                    </Grid>
                </Container>
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);