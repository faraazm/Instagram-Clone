import _ from 'lodash';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/auth';

import { withRouter } from 'react-router-dom';

import { Button, Form, Grid, Header, Image, Message, Transition } from 'semantic-ui-react'

import InputField from '../Forms/InputField';
import { signInFields } from '../Forms/formFields';

class SignIn extends Component {
    componentWillUnmount(){
        this.props.removeAlerts();
    }

    componentWillUpdate(nextProps){
        if(nextProps.authenticated){
            this.props.history.push('/landing');
        }
    }

    renderFields() {
        return _.map(signInFields, field =>
            <Field key={field.name} component={InputField}
                type="text"
                name={field.name}
                fields={field}
            />
        );
    }

    renderAlert() {
        if (this.props.alert) {
            return (
                <Transition visible={true} animation='fade'>
                    <Message color={this.props.alert.color}>{this.props.alert.message}</Message>
                </Transition>
            )
        }
    }

    render() {
        return (
            <div className='login-form'>
                <style>{`
              body > div,
              body > div > div,
              body > div > div > div.login-form {
                height: 90%;
              }
            `}</style>
                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h1' color='black' textAlign='center'>
                            <Image src={'https://seeklogo.com/images/I/instagram-new-2016-glyph-logo-84CB825424-seeklogo.com.png'} />
                            {' '} Clonegram
                        </Header>
                        <Form onSubmit={this.props.handleSubmit(this.props.signIn)} size='large'>
                            {this.renderFields()}
                            <Button color='black' fluid size='large'>Log in</Button>
                        </Form>
                        {this.renderAlert()}
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};
    _.each(signInFields, ({ name }) => {

        if (!values[name]) {
            errors[name] = `You must provide a value`;
        }
    })

    return errors;
}

function mapStateToProps(state) {
    return {
        alert: state.auth.alert,
        authenticated: state.auth.authenticated
    }
}

SignIn = connect(mapStateToProps, actions)(withRouter(SignIn));

export default reduxForm({
    validate,
    form: 'signInForm'
})(SignIn);