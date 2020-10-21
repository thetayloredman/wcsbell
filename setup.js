class Header extends React.Component {
    render() {
        return (
            <h1>WCSBell</h1>
        );
    }
}

class SetupPrompt extends React.Component {
    render() {
        return (
            <h2>Let's get you set up!</h2>
        );
    }
}

class EnmapLogo extends React.Component {
    render() {
        const styles = {
            'background-image': 'url("/enmap-logo.png")'
        }
        return (
            <div style={styles}>&nbsp;</div>
        );
    }
}

class EnmapPlug extends React.Component {
    render() {
        return (
            <div>
                <h1>Powered by <EnmapLogo /> by <i>Evie.Codes</i>.</h1>
                <h2>Check out Enmap <a href="">here</a>.</h2>
            </div>
        );
    }
}

class InitialHeader extends React.Component {
    
}