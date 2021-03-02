import React from 'react';
import Header from './Header';
import { Route, Switch, Redirect } from 'react-router-dom';
import BasicCal from './basicCal/component/App';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ConfirmEmail from './ConfirmEmail';
import ConfirmPassword from './ConfirmPassword';
import Randomizer from './randomizer/App';
import UrlService from "./services/UrlService";
import axios from 'axios';
import InformationRandomizer from './randomizer/InformationRandomizer';
import ScientificCalculator from './ScientificCalculator';
import UnitConverter from './UnitConverter';

export default class Main extends React.Component {
    state = { ready: false };

    componentDidMount = () => {
        axios.get(UrlService.currentUserProfileUrl()).then(
            res => {
                this.setUser(res.data)
            }
        ).catch(
            err => {
                console.log(err)
            }
        ).finally(() => {
            this.setState({ ready: true })
        })
    }

    setUser = user => {
        this.setState({
            user: user
        })
    }

    render() {
        return (
            <div>
                <Header user={this.state.user} setUser={this.setUser} />
                <Switch>
                    <Redirect exact from="/CAL_SMAi-TMEi" to="/BasicCalculator" />
                    <Route path={'/BasicCalculator'} component={BasicCal} />
                    {this.state.ready && <Route path={'/signin'} component={() => <SignIn setUser={this.setUser} />} />}
                    <Route path={'/signup'} component={() => <SignUp setUser={this.setUser} />} />
                    <Route path={'/password/forgot'} component={ConfirmEmail} />
                    <Route path={'/password/reset/:token'} component={ConfirmPassword} />
                    <Route path={'/randomizer/information'} component={InformationRandomizer} />
                    {this.state.ready && <Route path={'/randomizer'} component={() => <Randomizer user={this.state.user} setUser={this.setUser} />} />}
                    <Route path='/ScientificCalculator' component={ScientificCalculator} />
                    <Route path='/UnitConverter' component={UnitConverter} />
                </Switch>
            </div>
        );
    }
};

