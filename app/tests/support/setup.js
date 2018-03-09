import '@fortawesome/fontawesome'
import '@fortawesome/fontawesome-free-solid'
import '@fortawesome/fontawesome-free-regular'
import * as enzyme from 'enzyme'
import EnzymeReactAdapter from 'enzyme-adapter-react-16'
import td from 'testdouble'
import tdJest from 'testdouble-jest'
import 'jest-enzyme'

enzyme.configure({ adapter: new EnzymeReactAdapter() })
tdJest(td, jest)
