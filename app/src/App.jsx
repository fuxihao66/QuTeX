import React, {Component} from 'react'
import {render} from 'react-dom'
import {} from './styles/global.css'
import Logo from './components/Logo.jsx'
import { Link } from 'react-router-dom'

const logos = [
    require('./assets/electron.png'),
    require('./assets/react.png'),
    require('./assets/webpack.png')
]


export default class App extends Component {
    render() {
        const logosRender = logos.map( (logo, index) => {
            return <Logo key = {index} src = { logo } />
        })

        return (
            <div>
                {logosRender}

                <div className="hello">
                    <Link to='./components/editor'>Fuck you React!</Link>
                </div>

                <p>
                    If you are trying to build Electron apps using React, or you just
                    want to play around with them like me, feel free to use this
                    seed as a starting point.
                </p>

                <p>
                    Pay attention to how everything inside src/ are bundled
                    into build/, how global and scoped CSS work, how to compose
                    React components, or simply how Webpack changes relative
                    image paths to public paths after building.
                </p>

            </div>
        )
    }
}
