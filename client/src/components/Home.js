import React, { Component } from 'react';
import { Grid, Tab } from 'semantic-ui-react'

import SignUp from './Auth/SignUp';
import SignIn from './Auth/SignIn';

const panes = [
  { menuItem: 'Log In', render: () => <Tab.Pane attached='top'><SignIn/></Tab.Pane> },
  { menuItem: 'Sign Up', render: () => <Tab.Pane attached='top'><SignUp/></Tab.Pane> }
]

class Home extends Component {
    render(){
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
                {/* <Header as='h1' color='black' textAlign='center'>
                  <Image src={'https://seeklogo.com/images/I/instagram-new-2016-glyph-logo-84CB825424-seeklogo.com.png'} />
                  {' '} Login
                </Header> */}
                {/* <Form size='large'>
                  <Segment stacked>
                    <Form.Input
                      fluid
                      placeholder='Username'
                      autoComplete='user-name'
                    />
                    <Form.Input
                      fluid
                      placeholder='Password'
                      type='password'
                      autoComplete='off'
                    />
        
                    <Button color='black' fluid size='large'>Login</Button>
                  </Segment>
                </Form> */}
                <Tab menu={{ attached: 'bottom' }} panes={panes} />
              </Grid.Column>
            </Grid>
          </div>
        )
    }
}

export default Home;