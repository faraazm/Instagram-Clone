import _ from 'lodash';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/auth';

import { Button, Form, Grid, Header, Image, Message, Segment, Transition } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import InputField from '../Forms/InputField';
import { signUpFields } from '../Forms/formFields';

class SignUp extends Component {
    componentWillUnmount(){
        this.props.removeAlerts();
    }

    renderFields() {
        return _.map(signUpFields, field =>
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
                            {' '} Sign Up
                        </Header>
                        <Form onSubmit={this.props.handleSubmit(this.props.signUp)} size='large'>
                            {this.renderFields()}
                            <Button color='black' fluid size='large'>Sign Up</Button>
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
    _.each(signUpFields, ({ name }) => {

        if (!values[name]) {
            errors[name] = `You must provide a value`;
        }
    })

    return errors;
}

function mapStateToProps(state) {
    return {
        alert: state.auth.alert
    }
}

SignUp = connect(mapStateToProps, actions)(SignUp);

export default reduxForm({
    validate,
    form: 'signUpForm'
})(SignUp);